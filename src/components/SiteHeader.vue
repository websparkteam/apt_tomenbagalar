<template>
    <header class="flex-centered" v-if="ready">
        <div class="container">
            <div class="container-unit">
                <div class="element menu-icon" @click="toggleMenu=!toggleMenu">
                    <span class="icon"><i class="fa-solid fa-bars-staggered" style="background: #fff !important;"></i></span>
                </div>
                <router-link to="/" style="display: flex; flex-direction: row; align-items: center;">
                    <img class="logo" src="../assets/logo.png" alt="Аптека Низких Цен">
                    <div class="name">Аптека<br><span>Низких Цен</span></div>
                </router-link>
                <div class="nav-menu" v-if="toggleMenu">
                    <router-link to="#" class="item">О Нас</router-link>
                    <router-link to="#" class="item">Аптеки</router-link>
                    <router-link to="#" class="item">Доставка</router-link>
                    <router-link to="#" class="item">Акции</router-link>
                    <router-link to="#" class="item">Контакты</router-link>
                </div>
            </div>
            <div class="container-unit">
                <div id="search">
                    <div class="search-body">
                        <input placeholder="Найти лекарство..." ref="itemInput" @keydown.enter="addToHistory(); $router.push({path: '/search', query: {name: inputs.searchInput}}); searchDropdown=false" v-model="inputs.searchInput" @input="searchAutocomplete" @click="inputs.searchInput.length > 0 ? searchDropdown=true : (searchHistory.length ? searchDropdown=true : false)">
                        <button><!-- <i class="fa-solid fa-magnifying-glass"></i> --></button>
                    </div>
                    <div class="search-dropdown" v-if="searchDropdown" ref="itemSelect">
                        <template v-if="inputs.searchInput.length <= 0 && searchHistory.length > 0"> 
                            <div class="note">История запросов:</div>
                            <div class="recent">
                                <router-link @click="inputs.searchInput=i" :to="{path: '/search', query: {name: i}}" class="item" v-for="(i, ind) in searchHistory" :key="ind" v-show="ind < 5"><i class="fa-solid fa-arrow-rotate-left"></i> {{i}}</router-link>
                            </div>
                        </template>
                        <template v-else>
                            <div class="note">Результаты глобального поиска:</div>
                            <div class="list">
                                <div class="message" v-if="!autocompList.length && !loadingSearch"><i class="fa-solid fa-person-falling"></i>По Вашему запросу ничего не найдено</div>
                                <div class="loading-unit" v-if="loadingSearch"></div>
                                <div class="list-items" v-for="(i, ind) in autocompList" :key="ind">
                                    <router-link :to="`/product/${i.med_id}`" class="item" @click="searchDropdown=false; addToHistory(i.name); inputs.searchInput='';">
                                        <img :src="i.images.length ? i.images[0] : require('../assets/no-image.jpg')" :alt="i.name" @error="$event.target.src = require('../assets/no-image.jpg');">
                                        <div class="details">
                                            <div class="medname" v-html="`${(i.name.toLowerCase().replace(inputs.searchInput.toLowerCase(), '<b>'+inputs.searchInput.toLowerCase()+'</b>'))}`"></div>
                                            <div class="min">{{i.brand}}</div>
                                        </div>
                                    </router-link>
                                    <!-- <button ref="itemButton1" class="addtocart" v-if="RAMtools.getRAM.cartList.findIndex(e=>e.id==i.id) == -1" @click="RAMtools.tileAddToCart(i)"><i class="fa-solid fa-cart-plus"></i></button> -->
                                    <!-- <div ref="itemButton2" class="addedtocart" v-else @click="RAMtools.changeAmount(i, false);"><i class="fa-solid fa-check"></i></div> -->
                                </div>
                                <router-link :to="{path: '/search', query: {name: inputs.searchInput}}" class="item show-more">Показать больше</router-link>
                            </div>
                        </template>
                    </div>
                </div>
                <router-link to="#" class="element user">
                    <span class="icon"><i class="ws-icon-user"></i></span>
                </router-link>
                <router-link to="/cart" class="element cart">
                    <span class="icon"><i class="ws-icon-cart"></i><span class="qtty">{{RAMtools.getRAM.cartList.length}}</span></span>
                     <span v-if="RAMtools.getRAM.cartList.length == 0" class="value">Корзина</span>
                    <span v-else class="value">{{RAMtools.getProductsSum().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}} ₸</span>
                </router-link>
            </div>
        </div>
    </header>

    <div id="populars" class="flex-centered">
        <div class="container">
            <div class="wrap">
                <router-link :to="{path: '/search', query: {cat: i.id}}" class="item" v-for="(i, ind) in cats" :key="ind">{{i.name}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import cats from '../assets/scripts/getCategories'
import { inject } from '@vue/runtime-core';
import { mask } from 'maska'

export default {
    data(){
        return{
            ready: false,
            cats,
            mask,
            category_dropbox: false,
            search_dropbox: false,
            serverQuery: Function,
            landyshTools: Object,
            RAMtools: Object,
            autocompList: [],
            medSearchList: [],
            loadingSearch: false,
            searchDropdown: false,
            lastLetter: 0,
            mobileMenu: false,
            inputs: {},
            searchHistory: [],
            modalCatalog: false,
            modalSelectedCat: 0,
            stockRequests: {},
            toggleMenu: window.innerWidth > 1024 ? true: false
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.inputs = inject('inputs');
        this.ready = true;
        document.addEventListener('click', this.windowClick);

        if (localStorage.getItem('searchHistory')) {
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            this.searchHistory.splice(5, this.searchHistory.length);
        }
        this.searchHistory.splice(0, this.searchHistory.length);

        window.addEventListener('resize', this.windowResize);
    },
    unmounted() {
        document.removeEventListener('click', this.windowClick);
        window.removeEventListener('resize', this.windowResize);
    },
    methods: {
        windowResize() {
            this.toggleMenu = window.innerWidth > 1024 ? true: false;
        },
        addToHistory(text) {
            let hist = text;
            if (!text) hist = this.inputs.searchInput;
            this.searchHistory.unshift(hist);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        },
        async searchAutocomplete() {
			let thisMoment = Date.now();
			this.lastLetter = thisMoment;
			this.autocompList.splice(0, this.autocompList.length);
            this.medSearchList.splice(0, this.medSearchList.length);
			this.searchDropdown = true;
			this.loadingSearch = true;
            let response = (await this.serverQuery('getByName', {input: this.inputs.searchInput, offset: 0, limit: 4})).data.message,
				searchList = response;
			if (this.lastLetter != thisMoment) return;
            this.autocompList.splice(0, this.autocompList.length);
            let empty = true;
            for(let i in searchList){
                empty = false;
                this.landyshTools.parseItem(searchList[i]);
                this.autocompList.push(searchList[i]);
            }
            if (empty) {
                let response = (await this.serverQuery('searchInMedicine', {input: this.inputs.searchInput})).data.message,
                    medSearchList = response;
                for(let i in medSearchList){
                    this.medSearchList.push(medSearchList[i]);
                }
            }
            
            console.log(this.autocompList);
			this.loadingSearch = false;
		},
        windowClick(event) {
            if (!this.searchDropdown) return;
            let isClickInside = this.$refs['itemSelect'].contains(event.target);
            if (!isClickInside) {
                try {
                if (this.$refs['itemInput'].contains(event.target)) return false;
                if (this.$refs['itemButton1']) {
                    if (this.$refs['itemButton1']?.contains(event.target)) return false;
                }
                if(this.$refs['itemButton2']) {
                    if (this.$refs['itemButton2']?.contains(event.target)) return false;
                }
                } catch(e){e}
                this.searchDropdown = false;
            }
        },
    }
}
</script>
<style>
body{padding-top: 74px;}
@media screen and (max-width: 1024px){
    body{padding-top: calc(74px + 20px);}
}
@media screen and (max-width: 767px){
    body{padding-top: calc(124px + 20px);}
}
</style>


<style scoped>
.container{
    max-width: 1400px;
    padding: 0 10px;
    box-sizing: border-box;
}
/* ===== HEADER MENU STYLES ===== */
header{
    position: fixed;
    top: 0;
    left: 0;
    height: 74px;
    padding: 10px 0;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 1;
}
header .container{
    display: flex;
    justify-content: space-between;
    align-content: center;
}
header .container-unit{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
}
header .menu-icon{display: none !important;}
header .logo{
    height: 50px;
    margin-right: 10px;
}
header .name{
    font-family: var(--font-secondary);
    font-weight: 600;
}
header .nav-menu{
    display: flex;
    gap: 13px;
    padding-left: 13px;
}
header .nav-menu a{
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
}
header .element{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .3s;
}
header .element:hover{
    box-shadow: none;
}
header .element .icon{
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid rgb(0 0 0 / 5%);
    background-color: #fff;
    box-shadow: var(--box-shadow);
}
.ws-icon-user{
    width: 20px;
    height: 20px;
    mask-image: url('../assets/fonts/user-icon.svg');
    mask-size: cover;
    background: #000;
}
.ws-icon-cart{
    width: 26px;
    height: 26px;
    mask-image: url('../assets/fonts/shopping-cart.svg');
    mask-size: cover;
    background: #000;
}
header .element:hover .icon i{background: var(--color-main);}
header .element.cart .icon{position: relative;}
header .element.cart .qtty{
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%,-25%);
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-secondary);
    border-radius: 100px;
    color: #fff;
    font-size: 14px;
}
header .element .value{
    width: 106px;
    display: flex;
    align-items: center;
    padding: 10px 12px;
    box-sizing: border-box;
    height: 50px;
    border: 1px solid var(--color-border);
    border-left: none;
    border-radius: 0 5px 5px 0;
    font-family: var(--font-secondary);
    font-size: 15px;
}
header .element.catalog{
    margin-left: 12px;
}
header #search{
    position: relative;
}
.search-body input{
    width: 360px;
    height: 50px;
    padding: 15px;
    padding-left: 50px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    background: none;
    font-family: var(--font-primary);
    font-weight: 500;
}
.search-body button{
    width: 20px;
    height: 20px;
    font-size: 18px;
    border: none;
    padding: 0;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    mask-image: url('../assets/fonts/search-icon.svg');
    mask-size: cover;
    background: var(--color-main);
}
.search-body button:hover{
    background: var(--color-main);
    cursor: pointer;
}

.search-dropdown{
	position: absolute;
	top: calc(100% + 10px);
	left: 0;
    width: 100%;
	max-height: 550px;
    padding: 12px;
    box-sizing: border-box;
	display: flex;
    flex-direction: column;
	background: #fff;
	box-shadow: var(--box-shadow);
	border-radius: 4px;
    overflow-y: auto;
}

.search-dropdown .note{
    font-size: 14px;
    padding: 14px 0;
    font-weight: 500;
}
.search-dropdown .note:first-child{padding-top: 0;}
.search-dropdown .recent{
    display: flex;
    flex-direction: column;
}
.search-dropdown .recent .item{
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 3px;
}
.search-dropdown .recent .item:hover{
    background-color: #f9f9f9;
}
.search-dropdown .list{
    display: flex;
    flex-direction: column;
}
.search-dropdown .message {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 14px;
    box-sizing: border-box;
    border: 1px dashed var(--color-border);
    border-radius: 3px;
    letter-spacing: .5px;
    color: var(--color-text-gray);
    font-size: 14px;
    text-align: center;
}
.search-dropdown .list-items{
    display: flex;
    align-items: center;
    border-radius: 5px;
}
.search-dropdown .list-items .item{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    height: 60px;
    padding: 4px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0 0 0 / 6%);
}
.search-dropdown .list-items .item:hover .medname{color: var(--color-main);}
.search-dropdown .list-items img{
    width: 50px;
    height: 50px;
    object-fit: contain;
}
.search-dropdown .list-items .details{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.search-dropdown .list-items .medname{
    font-size: 15px;
    color: #131313;
}
.search-dropdown .list-items .min{
    font-size: 13px;
    color: var(--color-text-secondary);
}
.search-dropdown .show-more{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 10px;
    margin-top: 10px;
    font-weight: 600;
}
@media screen and (max-width: 1200px){
    header .container{gap: 5px;}
    header .container-unit{gap: 8px}
    header .nav-menu{gap: 8px;padding-left: 8px;}
    header .search-body input{width: 270px;}
}
@media screen and (max-width: 1024px){
    header .nav-menu{
        width: 260px;
        gap: 0;
        flex-direction: column;
        position: absolute;
        top: 100%;
        padding: 6px 0;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: var(--box-shadow);
        z-index: 2;
    }
    header .nav-menu a{
        padding: 12px 18px;
        box-sizing: border-box;
        color: #000;
        font-weight: 500;
    }
    header .menu-icon{display: flex !important;}
}
@media screen and (max-width: 767px){
    header #search{
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #fff;
    }
    header .search-body input{
        width: 100%;
    }
    header .search-body button{left: 25px}
}
@media screen and (max-width: 480px){
    header .element .value{display: none;}
}
.medname {
    text-transform: lowercase;
    white-space: pre-wrap;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    vertical-align: middle;
    overflow: hidden;
    font-weight: 300;
}
.medname::first-letter{text-transform: capitalize;}
.loading-unit {
    height: 300px;
    border-radius: 10px;
	background: linear-gradient(270deg, #a1a1a1, #dadada, #a1a1a1);
	background-size: 400% 400%;
	animation: flicker-loading 1s infinite;
	opacity: 0.3;
}
/* ===== END HEADER MENU STYLES ===== */





/* ===== POPULARS STYLES ===== */
#populars{
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 20px;
}
#populars .wrap{
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 15px;
}
#populars .wrap a{
    padding: 12px 0;
    box-sizing: border-box;
    position: relative;
    font-size: 14px;
    text-align: center;
    font-weight: 500;
}
#populars .wrap a::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: var(--color-main);
    display: block;
}
@media screen and (max-width: 1024px){#populars{display: none;}}
/* ===== END POPULARS STYLES ===== */
</style>