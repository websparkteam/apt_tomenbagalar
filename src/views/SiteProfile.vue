<template>
  <div class="flex-centered">
    <div class="container">
        <div class="path">
            <router-link class="pathlink" to="/">Главная</router-link>
            <span class="pathlink">Профиль</span>
        </div>

        <div class="page-switch">
            <div :class="{'item': true, 'active': mode=='myorders'}" @click="mode='myorders'">История заказов</div>
            <div :class="{'item': true, 'active': mode=='profile'}" @click="mode='profile'">Профиль</div>
        </div>

        <div class="page">
            <template v-if="mode=='myorders'">
                <div class="pad-bottom-16">
                    <h2 class="page-header">Мои заказы</h2>
                </div>
                <div class="table-wrap">
                    <table class="myorders">
                        <thead>
                            <tr>
                                <td>Детали заказа</td>
                                <td>Корзина</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(i, ind) in orders" :key="ind">
                                <td class="order">
                                    <ul>
                                        <li><strong>№{{i.id}}</strong></li>
                                        <li>{{new Date(i.creationdate).toLocaleString("ru", {year: 'numeric',month: 'long',day: 'numeric',hour: 'numeric',minute: 'numeric',second: 'numeric'})}}</li>
                                        <li>{{parseState(i.state)}}</li>
                                        <!-- <li>Доставка: Тастак, 75</li> -->
                                        <li>Наличными: {{getOrderTotalPrice(i.cart).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} ₸</li>

                                        <div class="payment-log" v-for="(j, jind) in i.receipts" :key="jind">
                                            {{j.code == 'ok' ? 'Успешно оплачено' : 'Оплата на'}} <b style="color: var(--color-main);">{{j.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} ₸</b>
                                            <button class="save-button pay-button" v-if="!havePaidOnes(i.receipts)" @click="payOnline(i)">Оплатить онлайн</button>
                                        </div>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li v-for="(j, jind) in i.cart" :key="jind">{{j.name}} / {{j.amount}} шт / <span>{{j.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}}₸</span></li> 
                                    </ul>
                                </td>
                            </tr>
                            <tr v-if="ordersLoading">
                                <td class="miniloading" style="width: 200px;"></td>
                                <td class="miniloading"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
            <template v-if="mode=='profile'">
                <div class="pad-bottom-16">
                    <h2 class="page-header">Профиль</h2>
                </div>

                <div class="profile">
                    <div class="alert-area" v-if="info">
                        <span>{{info}}</span>
                    </div>
                    <div class="input-group">
                        <label>Имя и Фамилия</label>
                        <input type="text" autocomplete="name" placeholder="Ивонов Иван" v-model="RAMtools.client.fullname">
                    </div>
                    <div class="input-group">
                        <label>Номер телефона</label>
                        <input type="num" autocomplete="off" v-model="RAMtools.client.phone" disabled>
                    </div>
                    <div class="input-group">
                        <label>Адрес электронной почты</label>
                        <input type="email" autocomplete="email" v-model="RAMtools.client.email" placeholder="example@gmail.com">
                    </div>
                    <div class="input-group">
                        <label>Адрес доставки</label>
                        <textarea autocomplete="adress" v-model="RAMtools.client.address" placeholder="ул. Туркестан 8/2"></textarea>
                    </div>
                    <div class="input-group" style="border: none;">
                        <div></div>
                        <div><div class="do-save" @click="saveChanges">
                            <div v-if="loading" class="landysh-loading"></div>
                            <template v-else>
                            Сохранить мои данные
                            </template>
                            </div></div>
                        <div></div>
                    </div>
                </div>

                <div class="leave">
                    <button @click="logout"><i class="fa-solid fa-door-open"></i> Выйти</button>
                </div>
            </template>
        </div>
    </div>
  </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
// import Auth from '../components/Auth.vue';
export default {
    components: {
        // Auth
    },
    data() {
        return {
            mode: 'myorders',
            serverQuery: Function,
            RAMtools: Object,
            landyshTools: Object,
            loading: false,
            info: '',
            orders: [],
            ordersLoading: false,
            offset: 0,
            emptyResult: false,
            authorized: false,
            modal: false,
            authData: {
                phone: '+7 (',
                pin: ['','','',''],
            },
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.RAMtools = inject('RAM');
        this.landyshTools = inject('landyshTools');

        this.orders.splice(0, this.orders.length);
        this.getOrders();

        window.addEventListener('scroll', this.listScroll);

        if (!this.RAMtools.client) {
            this.$router.replace('/cart?auth');
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.listScroll);
    },
    methods: {
        logout() {
            this.landyshTools.setClient(null);
            localStorage.removeItem('landyshAuth');
            this.$router.replace('/cart?auth');
        },
        listScroll(e) {
            console.log(e);
            let scrollBottom = document.documentElement.scrollTop+window.innerHeight;
            let scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
            );
            let a = window.innerWidth < 500 ? 400 : 100;
            if(scrollBottom > (scrollHeight-a)) {
                this.getOrders();
            }
        },
        async getOrders() {
            if (this.ordersLoading || this.emptyResult) return;
            this.ordersLoading = true;
            let state = (await this.serverQuery('userGetOrders', {auth: localStorage.getItem('landyshAuth'), offset: this.offset})),
                orders = state.data.message;
            for(let i in orders) {
                this.parseOrder(orders[i]);
                this.orders.push(orders[i]);
            }
            this.ordersLoading = false;
            if(Object.keys(orders).length <= 0) {
                this.emptyResult = true;
                return;
            }
            this.offset += 20;
        },
        havePaidOnes(receipts) {
            let has = false;
            for(let i in receipts) {
                if (receipts[i].code == 'ok') {
                    has = true;
                    break;
                }
            }
            return has;
        },
        async saveChanges() {
            if (this.loading) return;
            this.loading = true;
            let state = (await this.serverQuery('userUpdate', {auth: localStorage.getItem('landyshAuth'), fullname: this.RAMtools.client.fullname, email: this.RAMtools.client.email, address: this.RAMtools.client.address}));
            this.loading = false;
            if (!state.status) {
                this.info = 'Произошла ошибка при сохранении.';
                return;
            }
            this.info = 'Успешно сохранено.';
        },
        parseOrder(order) {
            order.cart = JSON.parse(order.cart);
            order.extra_info = JSON.parse(order.extra_info);
        },
        parseState(state) {
            switch(parseInt(state)) {
                case -1: return 'Отменен';
                case 0: return 'У оператора';
                case 1: return 'Ожидание принятия';
                case 2: return 'Принята кассой';
                case 3: return 'Внесены изменения';
                case 4: return 'Готово к самовывозу';
                case 5: return 'Завершен';
            }
        },
        getOrderTotalPrice(cart) {
            let total = 0;
            cart.forEach((e) => total+=(parseInt(e.price)*e.amount));
            return total;
        },
        async payOnline(order) {
            let paymentRes = await this.serverQuery('openPayment', {orderid: order.id});
            document.location.href = paymentRes.data.message.url;
        }
    },
    watch: {
        'RAMtools.client': {
            deep: true,
            handler() {
                if (this.RAMtools.client) {
                    this.authorized = true;
                    this.authData.phone = this.RAMtools.client.phone;
                }
            }
        }
    }
}
</script>

<style scoped>
/* ===== PROFILE STYLES ===== */
.page-switch{
    display: flex;
    gap: 10px;
}
.page-switch .item{
    font-weight: 600;
    padding: 12px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
}
.page-switch .item.active{
    color: var(--color-main);
    border-color: var(--color-main);
}

.table-wrap{
    width: 100%;
}
table.myorders{
    font-size: 14px;
    width: 100%;
}
table.myorders thead td{
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #fff !important;
}
table.myorders td{
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
}
table.myorders td:first-child{
    background-color: #f3f6f7;
    border-radius: 4px 0 0 4px;
}
table.myorders ul li{margin-bottom: 8px;}
table.myorders ul li span{font-weight: 600;}
table.myorders ul{
    padding-left: 20px;
    box-sizing: border-box;
}
table.myorders .order ul{padding: 0;}
table.myorders .order ul li{
    list-style: none;
    font-size: 14px;
}

@media screen and (max-width: 767px){
    
    table.myorders tbody td:first-child{
        margin-top: 20px;
    }
    table.myorders tbody td:last-child{
        border: 1px solid var(--color-border);
    }
    table tr{
        display: flex;
        flex-direction: column;
    }
}
@media screen and (max-width: 480px){
    table ul li{
        font-size: 12px;
    }
}

.profile .input-group{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--color-border);
}
.profile .input-group:last-child{border: none;}

.profile .input-group label{font-weight: 600;}

.profile .do-save{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background: var(--color-main);
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    letter-spacing: .5px;
    border: none;
    outline: none;
    cursor: pointer;
}
.profile .do-save:hover{
    color: #fff !important;
    opacity: .85;
}
.profile .alert-area{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.profile .alert-area span{
    color: var(--color-main);
    font-size: 14px;
}
@media screen and (max-width: 767px){
    .profile .input-group{
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .profile .do-save{width: 100%;}
}

.leave{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.leave button{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 220px;
    height: 45px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-error);
    letter-spacing: .5px;
    border: none;
    outline: none;
    cursor: pointer;
}
.leave button i{color: var(--color-error);}
.leave button:hover{
    opacity: .85;
}
.save-button{
    padding: 8px 15px;
    border-radius: 100px;
    border: 1px solid var(--color-main);
    color: var(--color-main);
    background: transparent;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 10px;
}
.save-button:hover{
    color: #fff;
    background: var(--color-main);
}
.save-button.pay-button {
    font-size: .9rem;
    margin-left: 0px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
}
/* ===== END PROFILE STYLES ===== */
</style>