<template>
    <div class="flex-centered">
        <div class="container">
            <template v-if="!data">
            <!-- <template v-if="true"> -->
                <div class="loading-template"></div>
                <div class="loading-template"></div>
                <div class="loading-template"></div>
            </template>
            <template v-else>
                <div class="path">
                    <router-link class="pathlink" to="/">Главная</router-link>
                    <router-link class="pathlink" to="/search">Каталог</router-link>
                    <router-link class="pathlink" v-for="(i, ind) in catpath" :key="ind" :to="{path: '/search', query: {cat: i.id}}">{{i.name}}</router-link>
                    <span class="pathlink">{{data.name}}</span>
                </div>

                <div class="wrap-grid">
                    <div class="product-card">
                        <div class="image">
                            <img :src="data.images.length ? data.images[0] : require('../assets/no-image.jpg')" :alt="data.name" @error="$event.target.src = require('../assets/no-image.jpg');">
                        </div>
                        <div class="mini-title" v-if="data.stock_data.length">О Товаре</div>
                        <div class="group" v-if="data.stock_data.length">
                            <div class="price-wrap">
                                <!-- <div class="price-old">1 905</div> -->
                                <div class="price">{{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} <div class="t-sym">₸</div></div>
                            </div>
                            <div class="action">
                                <button class="addtocart" v-if="RAMtools.getRAM.cartList.findIndex(i=>i.id==data.id) == -1" :class="{'add-cart': true}" @click="RAMtools.tileAddToCart(data)">В Корзину</button>
                                <div v-else class="quantity-cart">
                                    <button class="minus" @click="RAMtools.changeAmount(data, false);">
                                        <i v-if="RAMtools.getRAM.cartList[RAMtools.getRAM.cartList.findIndex(i => i.med_id == data.med_id)].amount == 1" class="fa-regular fa-trash-can" style="display: flex; color: #131313;"></i>
                                        <span style="color: #131313;" v-else>-</span>
                                    </button>
                                    <input class="number" type="number" v-model.number="RAMtools.getRAM.cartList[RAMtools.getRAM.cartList.findIndex(i => i.med_id == data.med_id)].amount" @input="RAMtools.changeAmount(data)">
                                    <button class="minus" @click="RAMtools.changeAmount(data, true);">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details">
                        <h2 class="card-title">{{data.name}}</h2>
                        <div class="mini-title">Параметры</div>
                        <div class="params-wrap">
                            <div class="item">
                                <div class="name">Артикул</div>
                                <div class="value">{{data.med_id}}</div>
                            </div>
                            <div class="item">
                                <div class="name">Производитель</div>
                                <div class="value">{{data.brand}}</div>
                            </div>
                            <div class="item">
                                <div class="name">Страна</div>
                                <span v-if="data.item_data" class="value">{{data.item_data.country_name}}</span>
                            </div>
                        </div>
                        <div class="mini-title">Поделиться</div>
                        <div class="share-wrap">
                             <button @click="clipboard(data.med_id)"><i class="fa-regular fa-copy"></i>Артикул：{{data.med_id}}</button>
                            <button @click="clipboard(`tomenbagalar.kz/product/${data.med_id}`)"><i class="fa-solid fa-link"></i>Скопировать ссылку</button>
                            <div v-if="successClipboard" class="successClipboard">Успешно скопировано!</div>
                        </div>
                    </div>
                    <div class="delivery-info">
                        <div class="mini-title"><i class="fa-solid fa-info"></i></div>
                        <div class="item">
                            <div class="title"><i class="fa-solid fa-truck-ramp-box"></i> Доставка</div>
                            <div class="text">Мы доставляем товар с 9:00 до 22:00 по пути следования маршрута автотранспорта</div>
                        </div>
                        <div class="item">
                            <div class="title"><i class="fa-solid fa-parachute-box"></i> Самовывоз</div>
                            <div class="text">Перед приездом забронируйте в магазине товар для самовывоза</div>
                        </div>
                    </div>
                </div>
                <div class="stock no" v-if="!data.stock_data.length">
                    <span><i class="fa-solid fa-circle-exclamation" style="margin-right: 10px;"></i>Нет в наличии</span>
                </div>
                <section class="block" v-else>
                    <div class="pad-bottom-16">
                        <h2 class="page-header">Наличие в аптеках</h2>
                    </div>
                    <div class="pharmacy-list">
                        <div class="item" v-for="(i,ind) in data.stock_data" :key="ind">
                            <div class="address">{{getPharmaDataById(i.pharma).address}}</div>
                            <div class="schedule">{{getPharmaDataById(i.pharma).time}}</div>
                            <div class="stock"><div class="indicator"></div>В наличии {{(i.qtty)}} шт.</div>
                            <div class="price">{{(i.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}}₸</div>

                            <!-- 
                                INDICATOR COLORS 
                                red  - rgb(255,103,70)
                                yellow - rgb(255, 208, 67)
                                green - rgb(90,191,112)
                            -->
                        </div>
                    </div>
                </section>

                <section class="block">
                    <div class="pad-bottom-16">
                        <h2 class="page-header">Описание</h2>
                    </div>
                    <ul class="description-list minimized">
                        <li v-for="(i, ind) in data.specs" :key="ind" v-show="i.length > 0"><span class="val">{{ind}}</span><span>{{i}}</span></li>
                    </ul>
                    <div class="description pad-top-16">
                        
                    </div>
                </section>
            </template>
        </div>
    </div>
</template>
<script>
import { inject } from '@vue/runtime-core';
import pharmacies from '../assets/documents/pharmacies';
import cats from '../assets/scripts/getCategories'
export default {
    components: {  },
    setup() {
        window.scrollTo(0, 0);
    },
    data() {
        return {
            ready: false,
            med_id: this.$route.params.id,
            data: null,
            serverQuery: Function,
            landyshTools: Object,
            RAMtools: Object,
            successClipboard: false,
            requestAvailability: false,
            catpath: [],
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.ready = true;

        this.init();
    },
    methods: {
        async init() {
            let response = await this.serverQuery('getZelenkaData', {med_id: this.med_id}),
                data = response.data.message;
            this.landyshTools.parseItem(data);
            this.data = data;
            console.log(this.data);

            let recentProducts = [];
            if (localStorage.getItem('recentProducts')) {
                recentProducts = JSON.parse(localStorage.getItem('recentProducts'));
            }
            recentProducts.splice(10, recentProducts.length);
            recentProducts.unshift(this.med_id);
            localStorage.setItem('recentProducts', JSON.stringify(recentProducts));

            let b = {el: -1};
            this.recursiveCatSearch(b, cats, this.data.rauzacat);
            if (b.el == -1) {
                b.el = {id: -1};
            }
            this.getCatParents(b.el);
        },
        clipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.successClipboard = true;
                setTimeout(() => {
                    this.successClipboard = false;
                }, 2000);
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        },
        getPharmaDataById(id) {
            let ind = pharmacies.findIndex(e=>e.id == id);
            if (ind == -1) return {};
            return pharmacies[ind];
        },
        getStockText(qtty) {
            switch(this.RAMtools.getStockDegree(parseInt(qtty))) {
                case 3: return {text: 'большой запас', color: 'rgb(34, 181, 115)'};
                case 2: return {text: 'средний запас', color: '#ffc107'};
                case 1: return {text: 'малый запас', color: '#f44336'};
                default: return {text: 'нет в наличии', color: '#8e8e8e'};
            }
        },
        recursiveCatSearch(cat, cats, value) {
            if (!cats) return null;
            for(let i in cats) {
                if (cats[i].id == value) return cat.el = cats[i];
                let ind = cats[i].subcats.findIndex(j => j.id == value);
                if (ind == -1) this.recursiveCatSearch(cat, cats[i].subcats, value);
                else {
                    cat.el = cats[i].subcats[ind];
                }
            }
		},
        async getCatParents(subcat) {
            let a = true,
                i = subcat,
                his = [];
            his.push(subcat);
            
            while(a) {
                let b = {el: -1};
                this.recursiveCatSearch(b, cats, i.parent_category);
                if (b.el == -1) {
                    break;
                }
                else {
                    his.push(b.el);
                    i = b.el;
                }
            }
            this.catpath.splice(0, this.catpath.length);
            his.forEach(e => this.catpath.unshift(
                {
                    id: e.id,
                    name: e.name,
                }
            ));
        },
    },
    computed: {
        available() {
            return this.data.item_data != null;
        }
    }
}
</script>

<style scoped>
/* ===== STYLES ===== */
.mini-title{
    width: 100%;
    font-size: 12px;
    text-transform: uppercase;
    color: #131313;
    font-weight: 500;
}
.param-list .item{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.param-list .item .name{
    font-size: 14px;
    color: var(--color-text-secondary);
}
.param-list .item .value{
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 600;
    color: #000;
}
.block{
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 4px;
}
.loading-template {
    width: 100%;
    height: 460px;
    border-radius: 10px;
	background: linear-gradient(270deg, #a1a1a1, #dadada, #a1a1a1);
	background-size: 400% 400%;
	animation: flicker-loading 1s infinite;
	opacity: 0.3;
    margin-bottom: 20px;
}
.loading-template:nth-child(2) {
    height: 187px;
}
.loading-template:nth-child(3) {
    height: 400px;
}
.successClipboard {
    position: absolute;
    background-color: #FFF;
    box-shadow: var(--box-shadow);
    left: 10px;
    padding: 10px;
    border-radius: 10px;
    font-weight: bold;
}
/* ===== END STYLES ===== */










/* ===== PRODUCT PAGE  ===== */
.wrap-grid{
    display: grid;
    align-items: flex-start;
    grid-template-columns: 420px 1fr 260px;
    gap: 40px;
    border-radius: 10px;
}
.product-card{
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
}
.product-card .image{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
}
.product-card .image img{
    width: 100%;
    max-height: 420px;
    object-fit: contain;
}
.product-card .group{
    height: 45px;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    justify-content: space-between;
    gap: 12px;
}
.product-card .price-wrap{
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.product-card .price{
    display: flex;
    align-items: end;
    gap: 5px;
    font-size: 22px;
    font-family: var(--font-secondary);
    font-weight: 600;
}
.product-card .price .t-sym{
    font-weight: 400;
    font-size: 16px;
    color: var(--color-text-secondary)
}
.product-card .price-old{
    text-decoration:line-through;
    color: var(--color-secondary);
    font-size: 14px;
    font-family: var(--font-secondary);
}
.product-card .action{
    display: flex;
    align-items: flex-end;
}
.product-card .addtocart{
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-sizing: border-box;
    border: 1px dotted var(--color-main);
    background: rgb(90,191,112,.1);
    border-radius: 4px;
    color: rgb(90,191,112);
    cursor: pointer;
    outline: none;
    font-family: var(--font-primary);
    font-weight: 600;
    transition: .3s;
}
.product-card .addtocart:hover{
    background: var(--color-main);
    color: #fff;
}


.details{
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    overflow: hidden;
}
.card-title{
    padding-bottom: 12px;
    color: #000;
    font-size: 22px;
    font-weight: 700;
    font-family: var(--font-primary);
    text-decoration: none;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.params-wrap{
    display: flex;
    flex-direction: column;
    gap: 7px;
}
.params-wrap .item{
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    border-bottom: 2px dotted var(--color-border);
}
.params-wrap .name{
    font-size: 14px;
    color: var(--color-text-secondary);
}
.params-wrap .value{
    font-weight: 500;
    font-size: 14px;
    color: #131313;
}
.share-wrap{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.share-wrap button{
    padding: 12px 24px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 100px;
    border: 1px solid var(--color-border);
    font-family: var(--font-primary);
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    transition: .2s all;
}
.details .share-wrap button i {margin-right: 5px;}
.details .share-wrap button:hover{
    color: var(--color-main);
    border-color: var(--color-main);
}
.delivery-info{
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
    background-color: rgba(255 255 255 / 50%);
    border: 1px solid var(--color-border);
    border-radius: 4px;
}
.delivery-info .fa-info{
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: 25px;
}
.delivery-info .item{
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.delivery-info .title{font-weight: 600;font-size: 14px;}
.delivery-info .text{font-size: 12px;}
@media screen and (max-width: 1024px){
    .delivery-info{grid-column: 1/3;}
    .wrap-grid{grid-template-columns: 1fr 1fr; gap: 25px;}
}
@media screen and (max-width: 767px){
    .wrap-grid{grid-template-columns: 1fr;}
    .delivery-info{grid-column: unset;}
}
/* ===== END PRODUCT PAGE  ===== */




/* ===== PHARMACY-LIST ===== */
.pharmacy-list{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
}
.pharmacy-list .item{
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 12px 24px;
    /* border-radius: 4px; */
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
}
.pharmacy-list .address{
    font-weight: 500;
    color: #131313;
    font-size: 14px;
}
.pharmacy-list .schedule{
    font-size: 12px;
    color: var(--color-text-secondary);
}
.pharmacy-list .stock{
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: var(--color-main);
}
.pharmacy-list .stock .indicator{
    width: 8px;
    height: 8px;
    border-radius: 100px;
    background-color: #dedede;
}
.pharmacy-list .price{
    font-size: 14px;
}
@media screen and (max-width: 767px){
    .pharmacy-list{grid-template-columns: 1fr 1fr;}
}
@media screen and (max-width: 480px){
    .pharmacy-list{grid-template-columns: 1fr;}
}
/* ===== END PHARMACY-LIST ===== */




/* ===== DESCRIPTION ===== */
.description-list{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.description-list li{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    padding: 7px 0;
    word-break: break-word;
    border-bottom: 2px dotted var(--color-border); 
}
.description-list span{color: var(--color-text-gray);}
.description-list span.val{
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 500;
    color: #000;
}
@media screen and (max-width: 767px){
    .description-list{grid-template-columns: 1fr;}
}
.stock{
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 4px;
    width: 100%;
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 500;
    color: rgb(255,103,70);
}
/* ===== END DESCRIPTION ===== */
</style>