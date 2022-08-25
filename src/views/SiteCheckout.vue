<template>
    <div class="flex-centered flex-column" v-if="ready">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <router-link class="pathlink" to="/cart">Корзина</router-link>
                <span class="pathlink">Оформление заказа</span>
            </div>
            <div class="pad-bottom-16">
                <h2 class="page-header">Оформление заказа</h2>
            </div>
        </div>
        <div class="container" v-if="orderSuccess">
            <!-- ↓ IF SUCESS ORDER SECTION -->
            <section class="page">
                <div class="order-state">
                    <span class="icon success"><i class="fas fa-check-circle"></i></span>
                    <span class="title">Ваш заказ успешно принят</span> <!-- Number ID FORMUL = №:RANDOM_A-Z:YYMMDD  -->
                    <span class="text" v-if="currentOrder.paymentType=='2'">Пожалуйста, не покидайте страницу. Перенаправляем на страницу оплаты...</span>
                    <span class="text" v-else>Детали вашего заказа:</span>
                    <td class="order-details">
                        <ul>
                            <li><strong>Заказ №{{currentOrder.id}}</strong></li>
                            <li>{{new Date().toLocaleString('ru', {year: 'numeric',month: 'long',day: 'numeric',hour: '2-digit', minute:'2-digit'})}}</li>
                            <li>Способ получения: {{currentOrder.type=='1' ? 'Доставка' : 'Самовывоз'}}</li>
                            <li>Оплата: {{currentOrder.paymentType=='1' ? 'Наличными' : 'Онлайн оплата'}}</li>
                        </ul>
                    </td>
                        
                    <router-link to="/profile" class="button button-success">В список заказов</router-link>
                    
                    <div class="alert-box" v-if="!RAMtools.client"><span class="alert-text"><span><i class="fa-solid fa-info"></i>Сделайте скриншот экрана или создайте личный кабинет <router-link to="/profile">по этой ссылке</router-link></span></span></div>
                    <div class="alert-box" v-else><span class="alert-text"><span><i class="fa-solid fa-info"></i>Вы можете отследить заказ в личном кабинете <router-link to="/profile">по этой ссылке</router-link></span></span></div>
                    <!-- <div class="alert-box"><span class="alert-text"><span><i class="fa-solid fa-ellipsis"></i>Пожалуйста, не покидайте страницу. Перенаправляем на страницу оплаты...</span></span></div> -->
                </div>
            </section>
        </div>
        <div class="container" style="box-shadow: var(--box-shadow);" v-if="!orderSuccess">
            <div class="content">
                <div class="block">
                    <div class="errors" style="margin-top: 10px;">
                        <div class="unit" v-for="(i, ind) in errors" :key="ind"><i class="fi-rs-exclamation"></i>{{i.text}}</div>
                    </div>
                    <div class="page-title"><div class="num">1</div>Тип получения</div>
                    
                    <div class="radio-wrap">
                        <div class="radio-item" @click="currentOrder.type='1'">
                            <input id="delivery-type-2" type="radio" name="delivery-type" :checked="currentOrder.type=='1'">
                            <label for="delivery-type-2">Доставка</label>
                        </div>
                        <div class="radio-item" @click="currentOrder.type='2'">
                            <input id="delivery-type-1" type="radio" name="delivery-type" :checked="currentOrder.type=='2'">
                            <label for="delivery-type-1">Самовывоз</label>
                        </div>
                    </div>
                    <template v-if="currentOrder.type=='1'">
                        <div class="page-subtitle">Укажите способ доставки</div>
                        <div class="radio-wrap" v-if="currentOrder.type=='1'">
                            <div class="radio-item">
                                <input id="address-mode-1" type="radio" name="address-mode" @click="inputAddressType=1; yandex_ready=1;" :checked="inputAddressType==1">
                                <label for="address-mode-1">Указать адрес <small>(Рекомендовано)</small></label>
                            </div>
                            <div class="radio-item">
                                <input id="address-mode-2" type="radio" name="address-mode" @click="inputAddressType=2; currentOrder.pharmacy=-1; resetDelivery()" :checked="inputAddressType==2">
                                <label for="address-mode-2">Ввести вручную</label>
                            </div>
                        </div>
                        <div class="address-fill" v-if="inputAddressType!=0">
                            <div class="input-group">
                                <template v-if="inputAddressType==1">
                                <label>Адрес доставки</label>
                                <div class="landysh-input" style="width: 100% !important;">
                                    <div class="loading-maps" v-if="yandex_ready==1"><i class="fa-solid fa-spinner"></i>Идет загрузка карты, пожалуйста подождите...</div>
                                    <iframe id="yandex-address" ref="maps" :src="`/yandexmaps.html?rauzaversion=${random_str}`" frameborder="0" :style="{height: '350px', width: '100%', filter: 'hue-rotate(41deg)'}"></iframe>
                                    <!-- <input type="text" placeholder="Нұржол, 14" autocomplete="address"> -->
                                </div>
                                </template>
                                <div v-if="inputAddressType==2" class="landysh-input" style="width: 100% !important;">
                                    <textarea v-model="currentOrder.address" placeholder="г.Нур-Султан, ул. Туркестан 8/2" required="" style="resize: none;"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="address-additions">
                            <div class="grid-col-2">
                                <div class="input-group iconed">
                                    <span class="icon"><i class="fa-solid fa-house-laptop"></i></span>
                                    <input type="text" placeholder="Дом (Не обязательно)" v-model="currentOrder.extraInfo.house">
                                </div>
                                <div class="input-group iconed">
                                    <span class="icon"><i class="fa-regular fa-building"></i></span>
                                    <input type="text" placeholder="Квартира, Офис (Не обязательно)" v-model="currentOrder.extraInfo.apartment">
                                </div>
                            </div>
                            <div class="grid-col-2">
                                <div class="grid-col-2">
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-regular fa-bell"></i></span>
                                        <input type="text" placeholder="Домофон (Не обязательно)" v-model="currentOrder.extraInfo.intercom">
                                    </div>
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-solid fa-door-open"></i></span>
                                        <input type="text" placeholder="Подъезд (Не обязательно)" v-model="currentOrder.extraInfo.entrance">
                                    </div>
                                </div>  
                                <div class="grid-col-1">
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-solid fa-layer-group"></i></span>
                                        <input type="text" placeholder="Этаж (Не обязательно)" v-model="currentOrder.extraInfo.floor">
                                    </div>
                                </div>                        
                            </div>
                        </div>
                    </template>
                    
                    <template v-if="currentOrder.type=='2'">
                        <div class="page-title"><div class="num">2</div>Выберите аптеку для самовывоза</div>
                        <!-- <div class="page-subtitle">Выберите аптеку для самовывоза</div> -->
                        
                        <div class="radio-wrap order-radio">
                            <div class="item" v-for="(i, ind) in pharmacies" :key="ind" @click="currentOrder.pharmacy=i.id; updateMedsStock();">
                                <input :id="`pharma-${ind}`" type="radio" :checked="currentOrder.pharmacy==i.id">
                                <label :for="`pharma-${ind}`"><span class="text">{{i.address}}</span></label>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="block" v-if="currentOrder.type!='2'">
                    <div class="page-title"><div class="num">2</div>Доставка</div>
                    <div class="radio-wrap order-radio iconed delivery-radio">
                        <div class="item" @click="delivery.type='yandex'">
                            <input id="delivery-2" type="radio" name="delivery-radio" :checked="delivery.type=='yandex'">
                            <label for="delivery-2">
                                <span class="text">Доставка курьером</span>
                                <span class="desc">
                                    <span class="item">от 30 мин до 90 мин</span>
                                    <div :class="{'price': true, 'loading': delivery.loading, 'active': delivery.yandex}">{{delivery.yandex ? delivery.yandex?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ''}}<small class="t-sym">₸</small></div>
                                </span>
                                <span class="icon i1"></span>
                            </label>
                        </div>
                        <div class="item" @click="delivery.raketaAvailable ? delivery.type='raketa' : false">
                            <input id="delivery-1" type="radio" name="delivery-radio" :disabled="!delivery.raketaAvailable">
                            <label for="delivery-1">
                                <span class="text">Экспресс доставка</span>
                                <span class="desc">
                                    <span class="item" v-if="delivery.raketaAvailable">в течении 45 мин</span>
                                    <span class="item" v-else>время работы <b>с 9:00 до 22:00</b></span>
                                    <div :class="{'price': true, 'loading': delivery.loading, 'active': delivery.raketa}">{{delivery.raketa ? delivery.raketa?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : ''}}<small class="t-sym">₸</small></div>
                                </span>
                                <span class="icon i2"></span>
                            </label>
                        </div>
                    </div>
                    <div class="uniq-padding">
                        <div class="note" v-if="currentOrder.type==1">
                            {{inputAddressType == 1 ? (currentOrder.pharmacy == recommendedPharma ? 'Система автоматически подобрала ближайшую аптеку (исходя из выбранного адреса)' : 'Вы изменили автоматически подобранную аптеку. На заметку: ближайшая аптека к Вашему адресу: '+pharmacies[pharmacies.findIndex(e=>e.id==recommendedPharma)].address) : 'Используя Яндекс.Карты, Вы позволите системе самой определить ближайшую для Вас аптеку.'}}
                        </div>
                        <div class="pharmacy-chosen">
                            <i class="fa-solid fa-parachute-box"></i>
                            <template v-if="currentOrder.pharmacy!=-1">Вам привезут из {{pharmacies[pharmacies.findIndex(e=>e.id==currentOrder.pharmacy)].address}}</template>
                            <template v-else>Оператор самостоятельно подберет для Вас аптеку</template>
                        </div>
                        <div class="alert-box" v-if="currentOrder.pharmacy!=-1">
                            <div class="alert-text">
                                <span><i class="fa-solid fa-info"></i> Узнайте наличие в аптеках</span>
                            </div>
                            <div class="in-pharmacy">
                                <div class="item" v-for="(i, ind) in RAMtools.getRAM.cartList" :key="ind" :outofstock="gsf(i).qtty==0">
                                    <div class="group">
                                        <span class="name">{{i.name}}</span>
                                        <span class="schedue" v-html="`Наличие: ${getStockText(gsf(i).qtty)}`"></span>
                                    </div>
                                    <div class="group">
                                        <span v-if="!gsfLoading" class="inp-price">{{(gsf(i).price * i.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} <span class="t-sym">₸</span></span>
                                        <div v-else class="miniloading"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="warningnote" v-if="!allOutofstock && hasOutofstock && currentOrder.pharmacy!=-1">
                            <i class="fa-solid fa-warning"></i>Обратите внимание, некоторых лекарств нет в наличии. Эти лекарства останутся в корзине.
                        </div>
                        <div class="warningnote superwarning" v-if="allOutofstock">
                            <i class="fa-solid fa-warning"></i>К сожалению всех товаров в корзине нет в наличии. Заказ сделать невозможно.
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">3</div>Способ оплаты</div>
                    <div class="radio-wrap">
                        <div class="radio-item" @click="currentOrder.paymentType='2'">
                            <input id="paytype-2" type="radio" :checked="currentOrder.paymentType=='2'" value="2">
                            <label for="paytype-2">Онлайн оплата:<i class="fa-regular fa-credit-card"></i>Банковской картой</label>
                        </div>
                        <div class="radio-item" @click="currentOrder.paymentType='1'">
                            <input id="paytype-1" type="radio" :checked="currentOrder.paymentType=='1'" value="1">
                            <label for="paytype-1">Наличными: {{currentOrder.type=='1' ? 'Курьеру' : 'На месте получения'}}</label>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">4</div>Контактное лицо</div>

                    <div class="grid-col-2">
                        <div class="input-group">
                            <label>Имя <span class="req">*</span></label>
                            <input v-model="currentOrder.fullname" type="text" placeholder="Иванов Иван" autocomplete="fullname" required :style="{border: errors.findIndex(e=>e.input=='fullname')!=-1?'1px solid #e80000':'1px solid #ddd'}">
                        </div>
                        <div class="input-group">
                            <label>Телефон <span class="req">*</span></label>
                            <input v-model="currentOrder.phone" @input="getPhoneInfo" v-maska="'+7 (###) ### ##-##'" type="tel" ref="phone" placeholder="+7 (700) 000 00-00" autocomplete="number" required :style="{border: errors.findIndex(e=>e.input=='phonenumber')!=-1?'1px solid #e80000':'1px solid #ddd'}">
                        </div>
                    </div>
                    <div class="input-group iconed">
                        <label>Комментарии к заказу</label>
                        <span class="icon" style="top: 45px"><i class="fa-regular fa-message"></i></span>
                        <textarea type="text" rows="10" autocomplete="off" placeholder="Не обязательно" v-model="currentOrder.extraInfo.comment"></textarea>
                    </div>
                    
                    <div class="checkbox-wrap">
                        <label for="data-save">
                            <input id="data-save" type="checkbox" v-model="saveMyData" checked>
                            <span class="checkmark"></span><span>Сохранить мои данные для дальнейших заказов</span>
                        </label>
                    </div>
                </div>
                <div class="block make-order-block" v-if="delivery.type">
                    <div class="page-title"><div class="num">5</div>Оформить заказ</div>
                    <div class="inner-block">
                        <ul class="recipt check-list">
                            <ul class="list">
                                <li><i class="fa-solid fa-basket-shopping"></i> {{RAMtools.getRAM.cartList.length}} {{RAMtools.getRAM.cartList.length == 1 ? 'товар' : 'товаров'}}</li>
                                <li><i class="fa-solid fa-truck-ramp-box"></i> Способ получения: {{currentOrder.type=='1' ? 'Доставка' : 'Самовывоз'}}</li>
                                <li><i class="fa-solid fa-money-bill-wave"></i> Оплата: {{currentOrder.paymentType=='1' ? 'Наличными' : 'Онлайн оплата'}}</li>
                            </ul>
                            <div class="preprice">
                                <span>Товары:</span>
                                <span class="price">{{getProductsSumPharma()}} ₸</span>
                            </div>
                            <div class="preprice" v-if="currentOrder.type==1 && delivery.type && !delivery.loading && !deliveryData.error">
                                <span>Доставка:</span>
                                <span class="price">{{deliveryData.delivery_price}} ₸</span>
                            </div>
                            <div class="totalprice">
                                <span>Сумма:</span>
                                <span class="price">{{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} ₸</span>
                            </div>
                        </ul>
                        <a @click="sendOrder" class="order-button ob-1">
                            <div v-if="submitOrderLoading" class="landysh-loading" style="width: 22px; height: 22px;"></div>
                            <template v-else>Сделать заказ</template>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
import pharmacies from '../assets/documents/pharmacies';
export default {
    data() {
        return{
            ready: false,
            serverQuery: Function,
            landyshTools: Object,
            RAMtools: Object,
            saveMyData: true,
            currentOrder: {
                id: -1,
                phone: '+7 (',
                email: '',
                fullname: '',
                address: '',
                extraInfo: {
                    house: '',
                    apartment: '',
                    intercom: '',
                    entrance: '',
                    floor: '',
                    comment: ''
                },
                coords: '',
                type: '1',
                pharmacy: '1',
                paymentType: '2',
                cart: ''
            },
            itemsToTake: [],
            pharmacies,
            authModal: false,
            submitOrderLoading: false,
            errors: [],
            orderSuccess: false,
            gsfLoading: true,
            modal: false,
            signup: true,
            authData: {
                phone: '+7 (',
                pin: ['','','',''],
                fullname: '',
                address: ''
            },
            yandex_ready: 0,
            recommendedPharma: '1',
            makeOnlinePayment: Function,
            delivery: {
                type: null,
                loading: false,
                data: null,
                raketa: null,
                yandex: null,
                outOfSquare: false,
                raketaAvailable: false
            },
            random_str: Date.now(),
            inputAddressType: 0,
            deliveryPrice: 0,
            isFreeDelivery: false
        }
    },
    setup() {
        window.scrollTo(0, 0);
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.ready = true;

        this.init();
        this.updateMedsStock();
        window.addEventListener('message', this.onWindowMessage);

        let now = new Date;
        if (now.getHours() >= 9 && now.getHours() < 22) {
            this.delivery.raketaAvailable = true;
        }
    },
    beforeUnmount() {
        window.removeEventListener('message', this.onWindowMessage);
    },
    methods: {
        async onWindowMessage(e) {
            switch(e.data.type) {
                case 'map_ready': {
                    this.$refs.maps.contentWindow.postMessage({type: 'rauza_address', address: this.authData.address});
                    this.yandex_ready = 2;
                } break;
                case 'rauza_address': {
                    this.currentOrder.address = e.data.address;
                    this.currentOrder.pharmacy = e.data.startPoint.value;
                    this.recommendedPharma = this.currentOrder.pharmacy;

                    this.updateMedsStock();
                    this.getDeliveryPrices(e);
                } break;
                case 'rauza_inborder': {
                    this.delivery.outOfSquare = false;
                } break;
                case 'rauza_outofborder': {
                    this.delivery.outOfSquare = true;
                } break;
            }
        },
        async getPhoneInfo() {
            if(this.currentOrder.phone.length < 18) return;
            this.submitOrderLoading = true;
            let response = await this.serverQuery('userGetPhoneInfo', {phone: this.currentOrder.phone});
            if (response.status) {
                this.signup = false;
                let client = response.data.message;
                this.currentOrder.email = client.email;
                this.currentOrder.fullname = client.fullname;

                if (this.currentOrder.address.length <= 0) this.currentOrder.address = client.address;
            }
            this.submitOrderLoading = false;
            console.log('getPhoneInfo', response);
        },
        async init() {
            this.updateMedsStock();

            if (this.RAMtools.client) {
                this.currentOrder.phone = this.RAMtools.client.phone;
                this.currentOrder.email = this.RAMtools.client.email;
                this.currentOrder.fullname = this.RAMtools.client.fullname;
            }
        },
        async sendOrder() {
            console.log(this.currentOrder.type, this.currentOrder.address,this.currentOrder.address.length);

            if (this.submitOrderLoading || this.gsfLoading) return;

            this.errors.splice(0, this.errors.length);
            if(this.currentOrder.phone.length != 18) this.errors.push({input: 'phonenumber', text: 'Введен некорректный номер телефона.'});
            if(this.currentOrder.fullname.length < 1) this.errors.push({input: 'fullname', text: 'Пожалуйста, введите Ваше имя.'});
            
            if (this.currentOrder.type == 1 && !this.delivery.type) this.errors.push({input: '', text: 'Пожалуйста, укажите способ доставки.'});
            if(this.currentOrder.type == 1 && !this.currentOrder.address.length) {
                this.errors.push({input: 'address', text: this.t('Введите адрес доставки.')});
                if (this.$refs?.maps?.contentWindow)
                    this.$refs.maps.contentWindow.postMessage({type: 'rauza_error', text: this.t('Введите адрес доставки.')});
            }
            if (this.errors.length) {
                window.scrollTo({top: 0, behavior: 'smooth'});
                return;
            }

            if(!this.RAMtools.client) {
                this.authData.phone = this.currentOrder.phone;
                this.authData.fullname = this.currentOrder.fullname;
                this.authData.address = this.currentOrder.address;
                this.authData.email = this.currentOrder.email;
                this.modal = true;
            }

            this.submitOrderLoading = true;
            let list = [];
            this.RAMtools.getRAM.cartList.forEach(i=>{
                if (parseInt(this.gsf(i).qtty) <= 0) return;
                list.push({
                    med_id: i.med_id,
                    name: i.name,
                    price: this.gsf(i).price,
                    amount: i.amount,
                    pharma: this.currentOrder.pharmacy
                });
            });
            this.currentOrder.cart = JSON.stringify(list);

            console.log(this.currentOrder);

            let response = await this.serverQuery('newOrder', {...this.currentOrder, extraInfo: JSON.stringify(this.currentOrder.extraInfo), delivery_type: this.delivery.type, delivery_price: this.deliveryData.delivery_price});
            console.log(response);
            if (response.status) {
                this.currentOrder.id = response.data.message;
                this.orderSuccess = true;
                window.scrollTo(0, 0);
                if (this.currentOrder.paymentType == '2') {
                    let paymentRes = await this.serverQuery('openPayment', {orderid: this.currentOrder.id});
                    document.location.href = paymentRes.data.message.url;
                }
                this.RAMtools.getRAM.cartList.forEach((i, ind)=>{
                    if (parseInt(this.gsf(i).qtty) > 0) {
                        this.RAMtools.getRAM.cartList.splice(ind, 1);
                    }
                });
                // this.RAMtools.getRAM.cartList.splice(0, this.RAMtools.getRAM.cartList.length);
                this.RAMtools.updateRAM();
            }
            this.submitOrderLoading = false;
        },
        async updateMedsStock() {
            let medids = [];
            this.gsfLoading = true;
            this.RAMtools.getRAM.cartList.forEach(e => {
                medids.push(e.med_id);
            });
            let hotObj = (await this.serverQuery('getByMedId', {list: JSON.stringify(medids), pharma: this.currentOrder.pharmacy})).data.message;
            this.itemsToTake.splice(0, this.itemsToTake.length);
            for(let i of hotObj) {
                this.landyshTools.parseItem(i);
                this.itemsToTake.push(i);
            }
            console.log('itemsToTake', this.itemsToTake);

            this.RAMtools.getRAM.cartList.sort((a, b) => this.RAMtools.getStockDegree(parseInt(this.gsf(b).qtty)) - this.RAMtools.getStockDegree(parseInt(this.gsf(a).qtty)));
            this.gsfLoading = false;
        },
        async getDeliveryPrices(e) {
            try {
            this.delivery.loading = true;
            this.delivery.raketa = null;
            this.delivery.yandex = null;
            this.delivery.data = null;
            
            this.delivery.data = {
                from: {
                    address: e.data.startPoint.name,
                    longitude: e.data.startPoint.coords[1],
                    latitude: e.data.startPoint.coords[0]
                },
                to: {
                    address: e.data.address,
                    longitude: e.data.coords[1],
                    latitude: e.data.coords[0]
                }
            }
            this.currentOrder.coords = JSON.stringify(this.delivery.data);
            
            let deliveryPrices = {
                yandex: (await this.serverQuery('orderDeliveryPricesYandex', {data: JSON.stringify(this.delivery.data)})).data.message,
                raketa: (await this.serverQuery('orderDeliveryPricesRaketa', {data: JSON.stringify(this.delivery.data)})).data.message,
            };
            let yandexData = JSON.parse(deliveryPrices.yandex),
                raketaData = JSON.parse(deliveryPrices.raketa);
            this.delivery.loading = false;
            // Yandex success
            if (yandexData.price) {
                this.delivery.yandex = {
                    price: yandexData.price,
                };
            }
            else {
                this.delivery.yandex = null;
            }
            if (raketaData.price) {
                this.delivery.raketaAvailable = true;
                this.delivery.raketa = {
                    price: raketaData.price,
                    time: raketaData.time + 15
                };
            }
            else {
               this.delivery.raketa = null;
               this.delivery.type='yandex';
               this.delivery.raketaAvailable = false;
            }
            if (this.isFreeOrder) {
                this.delivery.yandex.price = 0;
            }
            }
            catch(error) {
                console.log(error);
                this.getDeliveryPrices(e);
            }
        },
        resetDelivery() {
            this.delivery.yandex = null;
            this.delivery.raketa = null;
        },
        gsf(i) { // Get stock reference
            let ind = this.itemsToTake.findIndex(e=>e.med_id == i.med_id);
            if (ind == -1) return {...i, ...{qtty: 0}};
            if (this.itemsToTake[ind].stock_data.length <= 0) return {...i, ...{qtty: 0}};
            return this.itemsToTake[ind].stock_data[0];
        },
        getProductsSumPharma() {
            let sum = 0;
            this.RAMtools.getRAM.cartList.forEach((i)=>{
                if (this.gsf(i).qtty <= 0) return;
                sum += parseInt(this.gsf(i).price * i.amount);
            });
            return sum;
        },
        getStockText(qtty) {
            switch(this.RAMtools.getStockDegree(parseInt(qtty))) {
                case 3: return 'большой запас';
                case 2: return 'средний запас';
                case 1: return 'малый запас';
                default: return '<span class="outofstock">нет в наличии</span>';
            }
        },
    },
    watch: {
        currentOrder: {
            handler() {
                console.log(this.currentOrder);
                this.errors.splice(0, this.errors.length);
                if (this.$refs.maps) this.$refs.maps.contentWindow.postMessage({type: 'rauza_error', status: -1});
            },
            deep: true
        }
    },
    computed: {
        deliveryData() {
            let deliveryData = {delivery_price: 0, delivery_type: 0, error: true};
            if (this.currentOrder.type == 1) {
                switch(this.delivery.type) {
                    case 'yandex': {
                        if (this.inputAddressType != 2 && this.delivery.yandex) {
                            deliveryData.delivery_price = parseInt(this.delivery.yandex.price);
                            deliveryData.error = false;
                        }
                        deliveryData.delivery_type = 1;
                    } break;
                    case 'raketa': {
                        if (this.inputAddressType != 2 && this.delivery.raketa) {
                            deliveryData.delivery_price = parseInt(this.delivery.raketa.price);
                            deliveryData.error = false;
                        }
                        deliveryData.delivery_type = 2;
                    } break;
                }
            }
            return deliveryData;
        },
        isFreeOrder() {
            let is = false;
            if (this.getProductsSumPharma() >= 14990) {
                is = true;
            }
            // if (this.delivery.outOfSquare || this.inputAddressType == 2) {
            //     is = false;
            // }
            if (this.inputAddressType == 2) {
                is = false;
            }
            return is;
        },
        totalPrice() {
            let total = this.getProductsSumPharma() + this.deliveryData.delivery_price;
            if (total < 0) total = 0;
            return total;
        },
        hasOutofstock() {
            let outof = false;
            this.RAMtools.getRAM.cartList.forEach((i)=>{
                if (this.gsf(i).qtty <= 0) outof = true;
            });
            return outof;
        },
        allOutofstock() {
            if (this.currentOrder.pharmacy==-1) return false;
            let outof = true;
            this.RAMtools.getRAM.cartList.forEach((i)=>{
                if (this.gsf(i).qtty > 0) outof = false;
            });
            return outof;
        }
    }
}
</script>

<style scoped>

.req{color: var(--color-secondary);}
.grid-col-1{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
}
.grid-col-2{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
.grid-col-3{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}
@media screen and (max-width: 767px){
    .grid-col-3,
    .grid-col-2{grid-template-columns: 1fr;}
}





/* ===== CHECKOUT STYLES ===== */
.block{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
}
.inner-block {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.make-order-block{align-items: flex-end;}
.make-order-block .title{
    font-size: 17px;
    color: #131313;
    font-weight: 600;
    font-family: var(--font-secondary);
}
.make-order-block .recipt li{
    display: flex;
    justify-content: space-between;
    gap: 12px;
    list-style: none;
    font-size: 14px;
}
.make-order-block .recipt li span{
    color: var(--color-text-secondary);
}
.make-order-block .recipt li .sum{
    font-size: 16px;
    font-weight: 500;
    color: #131313;
}
.make-order-block .order-button{
    max-width: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #eaeaea;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    letter-spacing: .5px;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
}
.make-order-block .order-button:hover{
    color: #fff !important;
    opacity: .85;
}
.make-order-block .order-button.ob-1{background: var(--color-main);}
@media screen and (max-width: 480px){
    .make-order-block{align-items: center;}
    .make-order-block .order-button{max-width: 100%;}
}

.page-title{
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding-bottom: 5px;
    font-size: 18px;
    font-family: var(--font-secondary);
    font-weight: 600;
}
.page-title .num{
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-main);
    border: 1px solid var(--color-border);
    border-radius: 100px;
}
.page-subtitle{
    width: 100%;
    font-size: 16px;
    font-weight: 500;
}
.form{
    display: flex;
}
.address-fill{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.address-additions{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    padding-top: 12px;
    box-sizing: border-box;
    margin-top: 12px;
    border-top: 2px dashed var(--color-border);
    gap: 15px;
}
.pharmacy-chosen {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    margin-top: 0px;
    color: var(--color-main);
    font-weight: 700;
}
.minilabel {
    font-size: 15px;
    font-weight: 600;
    margin-top: 15px;
}
.note {
    color: #8d8d8d;
    margin-top: 20px;
    font-size: 13px;
}
.warningnote {
    border: 1px solid var(--color-border);
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    color: #3A3A3A;
    font-size: 0.9rem;
}
.warningnote .fa-warning {
    margin-right: 5px;
    color: rgb(184, 0, 0);
}
.warningnote.superwarning {
    border: 1px solid rgb(184, 0, 0);
}
.uniq-padding{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.alert-box{
    width: 100%;
    color: var(--color-text-gray);
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    margin-top: 10px;
}
.alert-box .alert-text{
    padding-bottom: 8px;
    color: var(--color-text-gray);
    font-size: 12px;
}
.alert-box .alert-text i{
    margin-right: 15px;
    color: var(--color-text-gray);
    font-size: 12px;
}

.alert-box .alert-text a{color: #6faee5 !important;}

.in-pharmacy{
    display: flex;
    flex-direction: column;
}
.in-pharmacy .item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6px;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: 1px solid var(--color-border);
}
.in-pharmacy .group{
    display: flex;
    flex-direction: column;
}
.in-pharmacy .name{
    font-weight: 600;
}
.in-pharmacy .schedue{font-size: 12px;}

.in-pharmacy .inp-price{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
}
.in-pharmacy .inp-price .t-sym{
    font-size: 14px;
    color: var(--color-text-gray);
    margin-left: 5px;
    font-weight: 400;
}
@media screen and (max-width: 767px){
    .uniq-padding{padding: 0;}
    .address-fill{padding: 0;}
    .address-additions{padding: 0; padding-top: 12px;}
}
/* ===== END CHECKOUT STYLES ===== */





/* ===== RADIO-WRAP STYLES ===== */
.radio-wrap {
	display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 45px;
    background-color: #f6f7f8;
}
.radio-wrap input[type=radio] {display: none;}
.radio-wrap label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    padding: 11px 15px;
    box-sizing: border-box;
    border-radius: 3px;
	border: 1px solid var(--border);
    border-radius: 100px;
	user-select: none;
	cursor: pointer;
}
.radio-wrap label::before{
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #ccc;
    display: block;
}
 
/* Checked */
.radio-wrap input[type=radio]:checked + label {
    background-color: #fff;
    border-color: var(--color-main);
}
.radio-wrap input[type=radio]:checked + label::before{background-color: var(--color-main);}
 
/* Disabled */
.radio-wrap input[type=radio]:disabled + label {
	opacity: 0.5;
    cursor: not-allowed;
}
@media screen and (max-width: 767px){
    .radio-wrap{
        width: 100%;
        margin: 0;
        border-radius: 0;
        border: none;
        flex-direction: column;
        background: none;
    }
}
/* ===== END RADIO-WRAP STYLES ===== */





/* ===== ORDER-RADIO STYLES ===== */
.order-radio{
    gap: 15px;
    border-radius: none;
    border: none;
    background: none;
}
.order-radio label{
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid var(--color-border);
    position: relative;
}
.order-radio label::before{
    position: absolute;
    top: 15px;
    left: 15px;
}
.order-radio label span.text{
    font-weight: 600;
    color: #131313;
    padding-left: 20px;
    box-sizing: border-box;
}
.order-radio label span.desc{
    display: flex;
    flex-direction: column;
    gap: 4;
    font-size: 14px;
}
.order-radio label .price{
    font-weight: 600;
    font-size: 18px;
    color: var(--color-black);
    height: 21px;
}
.order-radio .price.loading {
    background-color: #ffffff;
    border-radius: 10px;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;

    animation: flicker-loading 2s infinite !important;
}
.order-radio.iconed label{
    padding-right: 70px;
}
.order-radio label .icon{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
}
.order-radio label .icon.i1{
    background: url("../assets/hatchback.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.order-radio label .icon.i2{
    background: url("../assets/small-plane.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
/* ===== END ORDER-RADIO STYLES ===== */





/* ===== CHECKBOX STYLES ===== */
.checkbox-wrap{
    display: flex;
    align-items: center;
} /* Save my data - Checkbox */
.checkbox-wrap .checkmark{
	float: left;
	width: 20px;
	height: 20px;
	border-radius: 4px;
	background-color: #efefef;
	box-sizing: border-box;
	line-height: 1.6;
	text-align: center;
	cursor: pointer;
	margin-right: 10px;
	border: 1px solid var(--color-border-6);
}
.checkbox-wrap .checkmark:before{
	content: "\f00c";
    font-family: "Font Awesome 5 Free";
    font-size: 12px;
	font-weight: bold;
	color: var(--color-main);
	display: none;
}
.checkbox-wrap input{display: none;}
.checkbox-wrap input:checked ~ .checkmark:before{display: block;}
.checkbox-wrap label{
	box-sizing: border-box;
	line-height: 20px;
	font-family: var(--font-primary);
	font-size: 14px;
	cursor: pointer;
	color: #676767;
}
.checkbox-wrap label:hover{color: #000;}
/* ===== END CHECKBOX STYLES ===== */
.check-list{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.check-list .list{
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    font-weight: 400;
}
.check-list .list li{
    padding: 12px 0;
    box-sizing: border-box;
}
.check-list .list i{
    width: 25px;
    text-align: center;
    margin-right: 5px;
}
.check-list .preprice{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
}
.check-list .preprice .price{
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--color-main);
}
.check-list .totalprice{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 600;
}
.check-list .totalprice .price{
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--color-main);
}
.check-list .do-order{
    padding: 12px 22px;
    box-sizing: border-box;
    color: #FFF;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    border: none;
    border-radius: 4px;
    background-color: var(--color-main);
    cursor: pointer;
    text-decoration: none;
    letter-spacing: .9px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check-list .do-order:hover{opacity: .85;}
.delivery-radio .price.loading {
    background-color: #ffffff;
    border-radius: 10px;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;

    animation: flicker-loading 2s infinite !important;
}
.delivery-radio .price.active .t-sym {
    visibility: visible;
}
.delivery-radio .price .t-sym {
    margin-left: 5px;
    color: #767676;
    visibility: hidden;
}
.errors {
    display: flex;
    flex-direction: column;
}
.errors .unit {
    display: flex;
    align-items: flex-start;
    color: var(--color-error);
    padding-bottom: 5px;
}
.errors .unit i{
    display: flex;
    align-items: center;
    height: 22px;
}
/*  ==========  SUCESS ORDER STYLES  ==========  */
.order-state{
	width: 100%;
	padding: 50px;
	box-sizing: border-box;
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    border: 2px dashed #ddd;
}
.order-state .icon{
    width: 50px;
    height: 50px;
    padding: 12px;
    box-sizing: border-box;
    background-color: #f6f7f8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
}
.order-state .icon i{
    display: flex;
    align-items: center;
    font-size: 24px;
    color: var(--color-main);
}
.order-state .icon.error{background: var(--color-error-alpha)}
.order-state .icon.error i{
    color: var(--color-error);
}
.order-state .title{
    width: 520px;
    text-align: center;
	color: #000;
	font-size: 22px;
	font-weight: 700;
	margin-top: 15px;
}
.order-state .text{
    width: 520px;
    text-align: center;
	color: #708086;
	margin-top: 5px;
}
.order-state .text span{color: #000;}
.order-state .text a{color: var(--color-blue-link) !important;}
.order-details ul{
    margin: 0;
    margin-top: 10px;
    padding: 0;
    list-style: none;
    background: #f9f9f9;
    padding: 14px;
    box-sizing: border-box;
    border-radius: 10px;
}
.order-details li{
    font-size: 14px;
    color: var(--color-text-gray);
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
}
.order-state .button{
        margin-top: 12px;
        width: 180px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-family: var(--font-primary);
}
.order-state .button-success{
        background-color: var(--color-main);
        color: #fff;
}


@media screen and (max-width: 490px){
    .order-state{padding: 18px;}
    .order-state .title{width: 100%;font-size: 20px;}
    .order-state .text{width: 100%;font-size: 14px;text-align: left;}
}
/*  ========== END SUCESS ORDER STYLES  ==========  */
</style>