<template>
    <div class="flex-centered">
        <div class="container">
            <carousel :autoplay="9000" :wrap-around="true" :items-to-show="1">
                <slide v-for="(i, ind) in main_banners" :key="ind" @mousedown="adMousedown" @mouseup="adClick($event, i)" :style="{cursor: i.url ? 'pointer' : 'unset'}">
                    <img :src="i.image" alt="Banner">
                </slide>

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
            <section>
                <div class="pad-32">
                    <h2 class="page-header">Каталог товаров</h2>
                    <div class="sub-header">Предложения месяца</div>
                </div>
                <ProductsSection />
                <div class="pad-top-32 show-more-block">
                    <span>Переидите в каталог товаров для большего просмотра</span>
                    <router-link to="/search" class="show-more-button">Все товары <i class="fa-solid fa-arrow-right-long"></i></router-link>
                </div>
            </section>
            
            <section class="partners">
                <div class="pad-32">
                    <div class="page-header">Производители</div>
                </div>
                <carousel :items-to-show="5" :breakpoints="breakpoints" :autoplay="3000" :wrap-around="true">
                    <slide v-for="(i, ind) in partners" :key="ind">
                        <img :src="i.image">
                    </slide>
                </carousel>
            </section>

            <section id="steps">
                <div class="pad-32">
                    <h2 class="page-header">Как заказать</h2>
                </div>
                <div class="wrap">
                    <div class="group">
                        <div class="num-block">1</div>
                        <div class="text">
                            <div class="title">Оставьте заявку</div>
                            <p class="desc">Заполните заявку на сайте или позвоните нам</p>
                        </div>
                    </div>
                    <div class="group">
                        <div class="num-block">2</div>
                        <div class="text">
                            <div class="title">Обработка заказа</div>
                            <p class="desc">Перезваниваем вам и обговариваем детали заказа</p>
                        </div>
                    </div>
                    <div class="group">
                        <div class="num-block">3</div>
                        <div class="text">
                            <div class="title">Доставляем товар</div>
                            <p class="desc">Осуществляем доставку по указанному вами адресу</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ProductsSection from '../components/ProductsSection.vue';
import { inject } from '@vue/runtime-core';

export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        ProductsSection
    },
    data(){
        return{
            ready: false,
            serverQuery: Function,
            landyshTools: Object,
            search: '',
            autocompList: [],
            loadingSearch: false,
            searchDropdown: false,
            lastLetter: 0,
            banners_loaded: false,
            main_banners: [],
            sideTopBanner: {},
            sideBottomBanner: {},
            adClickedPlace: {x: 0, y: 0},
            breakpoints: {
                1000: {itemsToShow: 5},
                700: {itemsToShow: 3},
                100: {itemsToShow: 2},
            },
            partners: [
                {image: require('../assets/partners/astrazeneca-png-logo.webp')},
                {image: require('../assets/partners/Biogen_logo.webp')},
                {image: require('../assets/partners/Boehringer_Ingelheim_logo.webp')},
                {image: require('../assets/partners/generic-company-logo-png-1.webp')},
                {image: require('../assets/partners/johnson-johnson-logo-png-transparent-2.webp')},
                {image: require('../assets/partners/Novo_Nordisk.webp')},
                {image: require('../assets/partners/pfizer.webp')},
                {image: require('../assets/partners/PNGPIX-COM-Gilead-Logo-PNG-Transparent.webp')},
                {image: require('../assets/partners/takeda.webp')},
                {image: require('../assets/partners/partner1.webp')},
                {image: require('../assets/partners/partner2.webp')},
                {image: require('../assets/partners/pharmak.webp')}
            ],
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.ready = true;
        document.addEventListener('click', this.windowClick);

        this.initBanners();
    },
    unmounted() {
        document.removeEventListener('click', this.windowClick);
    },
    methods: {
        async initBanners() {
            let response = (await this.serverQuery('getBanners')).data.message,
				banners = response;
            for(let i in banners) {
                switch(parseInt(banners[i].type)) {
                    case 0: {
                        this.main_banners.push({
                            image: banners[i].image,
                            url: banners[i].url
                        });
                    } break;
                    case 1: {
                        this.sideTopBanner = {
                            image: banners[i].image,
                            url: banners[i].url
                        };
                    } break;
                     case 2: {
                        this.sideBottomBanner = {
                            image: banners[i].image,
                            url: banners[i].url
                        };
                    } break;
                }
            }
            this.banners_loaded = true;
        },
        async searchAutocomplete() {
			let thisMoment = Date.now();
			this.lastLetter = thisMoment;
			this.autocompList.splice(0, this.autocompList.length);
			this.searchDropdown = true;
			this.loadingSearch = true;
            let response = (await this.serverQuery('getByName', {input: this.search, offset: 0, limit: 4})).data.message,
				searchList = response;
			if (this.lastLetter != thisMoment) return;
            this.autocompList.splice(0, this.autocompList.length);
            for(let i in searchList){
                this.landyshTools.parseItem(searchList[i]);
                this.autocompList.push(searchList[i]);
            }
            console.log(this.autocompList);
			this.loadingSearch = false;
		},
        windowClick(event) {
            if (!this.searchDropdown) return;
            let isClickInside = this.$refs['itemSelect'].contains(event.target);
            if (!isClickInside) {
                if (this.$refs['itemInput'].contains(event.target)) return false;
                this.searchDropdown = false;
            }
        },
        openUrl(url) {
            if (!url) return;
            document.location.href = url;
        },
        adMousedown(e) {
            this.adClickedPlace = {x: e.clientX, y: e.clientY};
        },
        adClick(e, i) {
            if (!i.url) return;
            let a = this.adClickedPlace,
                b = {x: e.clientX, y: e.clientY},
                dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
            if (dist < 5) {
                this.openUrl(i.url);
            }
        }
    }
};
</script>

<style>
.carousel{margin: 0;}
.carousel img{
    border-radius: 12px;
}
.carousel__prev, .carousel__next {
    width: 40px;
    height: 40px;
    background-color: #fff;
    box-shadow: var(--box-shadow);
}
.carousel__prev{left: 10px; transform: translate(0,-50%);}
.carousel__next{right: 10px; transform: translate(0,-50%);}
.carousel__pagination-button{
    width: 12px;
    height: 12px;
    border-radius: 100px;
}
.carousel__pagination-button{background-color: transparent; border: 1px solid #fff;}
.carousel__pagination-button--active{background-color: #fff;}
.carousel__pagination{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 10px;
}
</style>

<style scoped>
.show-more-block{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
}
.show-more-button{
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 16px 32px;
    box-sizing: border-box;
    background-color: #fff;
    color: #131313;
    font-weight: 600;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    /* box-shadow: var(--box-shadow); */
}





/* ===== STEPS STYLES ===== */
#steps .wrap{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    gap: 16px;
}
#steps .group{
    display: flex;
    gap: 16px;
}
#steps .num-block{
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-main);
    font-size: 18px;
    font-weight: 600;
    border-radius: 100px;
    background-color: var(--color-main-alpha);
}
#steps .text{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
#steps .title{
    font-family: var(--font-secondary);
    font-weight: 600;
    font-size: 18px;
}
#steps .desc{color: var(--color-text-secondary);}
@media screen and (max-width: 1024px) {
    #steps .wrap{grid-template-columns: 1fr 1fr; gap: 32px;}
}
@media screen and (max-width: 767px) {
    #steps .wrap{grid-template-columns: 1fr;}
}
/* ===== END STEPS STYLES ===== */





/*  ==========  PARTNERS STYLES  ==========  */
.partners{
    width: 100%;
}
.partners img{
    width: 100px;
    filter: saturate(0);
    object-fit: cover;
    cursor: pointer;
}
.partners img:hover{filter: saturate(1);}
/*  ==========  END PARTNERS STYLES  ==========  */
</style>