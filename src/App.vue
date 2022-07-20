<template>
    <SiteHeader v-if="ready"/>

    <div id="content">
        <router-view :key="$route.fullPath"/>
    </div>

    <SiteFooter />
</template>

<script>
import './assets/fonts/FontAwesome/stylesheet.css'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import $axios from 'axios';
import { useRoute } from 'vue-router'
import { computed, provide, ref } from '@vue/runtime-core'

export default {
    name: 'App',
    components: {
        SiteHeader,
        SiteFooter
    },
    data() {
        return {
            ready: false,
            baseURL: '',
            inputs: {
                searchInput: ''
            },
            client: null
        }
    },
    setup() {
        let generateEmptyRAM = () => {
			return {
				cartList: []
			}
		};
        // localStorage.setItem('landysh-ram', JSON.stringify(generateEmptyRAM())); RESET
        let getRAM = ref(localStorage.getItem('landysh-ram') ? JSON.parse(localStorage.getItem('landysh-ram')) : generateEmptyRAM());
        const route = useRoute();
		const mode = computed(() => route.name);

        return {
            mode,
            getRAM
        }
    },
    mounted() {
        this.baseURL = 'https://aptekalandysh.ru/api/';
        this.axios = $axios.create({
			baseURL: this.baseURL,
			timeout: 20000,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
        provide('landyshTools', {
            parseItem: this.parseItem,
            getImage: this.getImage,
            setClient: (val) => {
                this.client = val;
            }
        });
        provide('RAM', {
            client: computed(() => this.client),
			getRAM: this.getRAM,
			updateRAM: this.updateRAM,
			tileAddToCart: this.tileAddToCart,
			changeAmount: this.changeAmount,
            getProductsSum: this.getProductsSum,
            getStockDegree: this.getStockDegree,
		});
        provide('inputs', computed(() => this.inputs));
        provide('serverQuery', this.serverQuery);

        this.ready = true;
        this.autoAuthLogin();
    },
    methods: {
        serverQuery(query, args, index) {
			if (index === undefined) index = '';
			if (args === undefined) args = {};
			return new Promise((resolve) => {
				var params = new URLSearchParams();
				params.append('query', query);
				for(let i in args) {
					params.append(i, args[i]);
				}
				this.axios.post(`/${index}`, params).then(response => {
					let data = response.data;
					console.log(data);
					if (data.status == 'OK') { 
						resolve({status: true, data: data});
					}
					else {
                        resolve({status: false, data: data});
						for(let i in data.errors) {
							this.announce.push({type: 'E', message: data.errors[i]});
						}
					}
				}).catch(() => {
					resolve({status: false});
				});
			});
		},
        updateRAM() {
			localStorage.setItem('landysh-ram', JSON.stringify(this.getRAM));
		},
        tileAddToCart(data) {
            console.log(data);
            let el = {...data, amount: 1, price: parseInt(data.price)}
            let ind = this.getRAM.cartList.findIndex(e => e.med_id == el.med_id);
            console.log(ind);
            if (ind == -1) {
                this.getRAM.cartList.push(el);
            }
            else {
                this.getRAM.cartList.splice(ind, 1);
            }

            this.updateRAM();
            console.log('cart', this.getRAM.cartList)
        },
        changeAmount(data, add) {
            let ind = this.getRAM.cartList.findIndex(i => i.med_id == data.med_id),
                cartdata = this.getRAM.cartList[ind];
            if (add === true) cartdata.amount++;
            else if (add === false) cartdata.amount--;
			if(cartdata.amount > 999) cartdata.amount = 999;
			if(cartdata.amount < 1) {
                this.tileAddToCart(data);
            }
            this.updateRAM();
		},
		getProductsSum() {
			let sum = 0;
			try {
				this.getRAM.cartList.forEach(i=>sum+=(i.price*i.amount));
			}
			catch(e) {
				console.log(e);
				this.getRAM.cartList.splice(0, this.getRAM.cartList.length);
			}
			return sum;
		},
        parseItem(item) {
            item.images = JSON.parse(item.images);
            item.offers = JSON.parse(item.offers);
            item.specs = JSON.parse(item.specs);
            item.review = JSON.parse(item.review);
            let mostExpensive = -Infinity;
            for(let i of item.stock_data) {
                i.price = parseInt(i.price);
                if (i.price > mostExpensive) {
                    mostExpensive = i.price;
                    item.price = i.price;
                    item.item_data = i;
                }
            }
            if (!item.item_data) {
                item.price = 0;
                item.item_data = {
                    country_name: ''
                };
            }
        },
        getImage(images) {
            if (images.length) return images[0];
            else return require('./assets/no-image.jpg');
        },
        getStockDegree(qtty) {
            if (qtty >= 5) {
                return 3;
            }
            if (qtty < 5 && qtty >= 2) {
                return 2;
            }
            if (qtty < 2 && qtty > 0) {
                return 1;
            }
            if (qtty <= 0) {
                return 0;
            }
			return 0;
        },
        async autoAuthLogin() {
            let authData = localStorage.getItem('landyshAuth') ? JSON.parse(localStorage.getItem('landyshAuth')) : false;
            if (!authData) return;

            let state = (await this.serverQuery('userSignin', {phone: authData.phone, pin: authData.pin}));
            if (!state.status) {
                return;
            }
            this.client = state.data.message;
        }
    }
}
</script>

<style>
/* FONTS - Inter, Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Play:wght@400;700&display=swap');

@keyframes flicker-loading {
    0%{background-position:0% 50%}
    25%{background-position:50% 50%}
    50%{background-position:100% 50%}
    75%{background-position:50% 50%}
    100%{background-position:0% 50%}
}
/*  ==========  #INFO  ==========  */

/* Ipad, laptop Devices < 1024px */
/* Tablet Devices < 767px */
/* Mobile Devices < 480px */
/* MINI Devices < 420px */

/*  ==========  END #INFO  ==========  */

*{
    --color-main: rgb(90,191,112);
    --color-main-alpha: rgb(90,191,112,.3);
    --color-secondary: rgb(255,103,70);
    --color-text-secondary: #919399;
    --color-border: rgba(0, 0, 0, .12);
    --color-border-6: rgba(0, 0, 0, .06);
    --color-blue-link: #6faee5;
    --color-black: #2c3e50;
    --color-error: rgb(244, 78, 78);
    --color-error-alpha: rgb(244, 78, 78,.1);
    
    --box-shadow: 0 0 20px rgb(95 125 149 / 12%);

    --font-primary: 'Inter', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;

    margin: 0;
    padding: 0;
    color: #2c3e50;
}
html{scroll-behavior: smooth;}
body{background-color: #f9f9f9; font-family: var(--font-primary);}
input {outline: none;}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
::-webkit-scrollbar {width: 8px;}
::-webkit-scrollbar-track {background-color: #eaeaea;}
::-webkit-scrollbar-thumb {background-color: #cecece; border-radius: 10px;}

img{max-width: 100%;}
a{text-decoration: none;}
a:hover{color: var(--color-main) !important;}

.flex-centered{width: 100%;display: flex;justify-content: center;align-items: center;}
.flex-column{display: flex;flex-direction: column;}
.page{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--color-border-6);
}

.path{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 20px;
}
.path .pathlink{
    display: flex;
    color: #7a7b7d;
    font-weight: 500;
    font-size: 14px;
}
.path a.pathlink{color: #000;}
.path .pathlink::after{
    content: '\f105';
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-family: 'Font Awesome 6 Free';
    font-weight: 600;
    font-size: 11px;
}
.path .pathlink:last-child::after{display: none;}

.pad-16{padding: 16px 0;}
.pad-32{padding: 32px 0;}
.pad-top-16{padding-top: 16px;}
.pad-top-32{padding-top: 32px;}
.pad-bottom-16{padding-bottom: 16px;}
.pad-bottom-32{padding-bottom: 32px;}

.page-header{
    width: 100%;
    color: #131313;
    font-size: 22px;
    font-family: var(--font-secondary);
}
.sub-header{
    width: 100%;
    color: var(--color-text-secondary);
    font-size: 15px;
}

.container{
    width: 100%;
    max-width: 1220px;
}

.quantity-cart{
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #f6f7f8;
    border: 1px solid rgb(90,191,112,.1);
}
.quantity-cart button {
    width: 39px;
    height: 39px;
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    color: var(--color-black);
    cursor: pointer;
    outline: none;
    font-weight: 600;
}

.quantity-cart .number{
    flex: 1;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: transparent;
    font-size: 16px;
    font-weight: 700;
    color: #131313;
}
@media screen and (max-width: 1220px){
    .container{
        padding: 0 10px;
        box-sizing: border-box;
    }
}
@media screen and (max-width: 480px){
    .adaptive-padding {padding: 0 0;}
}

.container-grid{
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 10px;
}

section{
    width: 100%;
}

.input-group{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}
.input-group label{
    font-size: 14px;
    font-weight: 500;
    
    color: #2e2f38;
}
.input-group input{
    width: 100%;
    height: 50px;
    padding: 12px 16px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    /* background-color: #f9f9f9; */
    color: var(--color-black);
    font-size: 14px;
    font-family: var(--font-primary);
    color: #2e2f38;
}





/* ===== MODAL STYLES ===== */
.fullscreen {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    z-index: 10;
    top: 0;
    left: 0;
}
.blackout {
    background: rgba(0 0 0 / 40%);
}
.modal {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: max-content;
    max-height: 640px;
    background: #fff;
    border-radius: 22px;
    overflow: hidden;
    padding: 25px;
    padding-bottom: 40px;
    box-sizing: border-box;
    position: relative;
    overflow-y: auto;
}
.modal ::-webkit-scrollbar{
    width: 55px !important;
    transform: translateX(20px);
}
.modal .top {
    width: 100%;
    color: #000;
    font-weight: 600;
    font-size: 20px;
    padding-bottom: 16px;
}
.modal .close{
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 10px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    border-radius: 100px;
    border: 1px solid var(--color-border);
}
.modal .close i{color: #000}

.modal .category-family{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.modal .category-family .title{
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px dotted var(--color-border);
}
.modal .category-family .title i{
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    border: 1px solid var(--color-border);
    font-size: 14px;
    color: var(--color-text-secondary);
}

.modal .category-family .title.active{
    color: var(--color-main);
}
.modal .category-family .title:hover{
    color: var(--color-main);
}
.modal .category-family .items{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    padding-left: 20px;
    box-sizing: border-box;
}
.modal #auth{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
}
.modal #auth .auth-title{
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-main);
    /* font-family: var(--font-secondary); */
    text-align: center;
}
.modal #auth .form{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}
.modal #auth .text{
    padding: 0 25px;
    box-sizing: border-box;
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 14px;
}
.modal #auth .alert-area{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.modal #auth .alert-area span{
    color: var(--color-error);
    font-size: 14px;
    text-align: center;
}
.modal #auth .form button{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    box-sizing: border-box;
    border: none;
    background: var(--color-main);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    outline: none;
    font-family: var(--font-primary);
    transition: .3s;
    letter-spacing: .5px;
}
.modal #auth .form button:hover{
    opacity: .85;
}
.modal #auth .switch-wrap{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal #auth .switch-wrap .switch{
    text-align: center;
    font-size: 14px;
    color: var(--color-blue-link);
    cursor: pointer;
}
.modal #auth .switch-wrap .switch:hover{opacity: .85;}
.modal .unsign-continue{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
.modal .unsign-continue .title{
    font-size: 17px;
    color: #131313;
    font-weight: 600;
}
.modal .unsign-continue .order-button.ob-2{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: rgb(248,154,43,.2);
    font-size: 14px;
    font-weight: 600;
    color: rgb(248,154,43);
    letter-spacing: .5px;
    transition: .3s;
}
.modal .unsign-continue .order-button:hover{
    background-color: rgb(248,154,43);
    color: #fff !important;
    opacity: .85;
}
/* ===== END MODAL STYLES ===== */
</style>
