<template>
    <div class="flex-centered">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <router-link class="pathlink" to="/search">Каталог</router-link>
                <router-link class="pathlink" @click="inputs.searchInput=''" v-for="(i, ind) in catpath" :key="ind" :to="{path: '', query: {cat: i.id, sort: filter.sort}}">{{i.name}}</router-link>
            </div>
        </div>
    </div>
    <div class="page flex-centered">
        <div class="container">
            <div class="pad-bottom-16">
                <h2 class="page-header" v-if="inputs.searchInput">По запросу «{{inputs.searchInput}}» найдено</h2>
                <h2 class="page-header" v-else-if="$route.query.cat">По категории {{catpath[catpath.length-1]?.name}} найдено</h2>
                <h2 class="page-header" v-else>По запросу найдено</h2>

                <div class="sub-header" v-if="!loadingSync">{{totalCount}} товаров</div>
                <div class="miniloading" v-else></div>
            </div>
            <div id="sub-category" v-show="subcats">
                <span class="switch-text" @click="showSubcats=!showSubcats">{{showSubcats?'Скрыть подкатегории':'Показать подкатегории'}}<i :class="'fi fi-rs-angle-small-'+(showSubcats?'up':'down')"></i></span>
                <ul class="box" v-show="showSubcats">
                    <router-link class="unit" @click="inputs.searchInput=''" v-for="(i, ind) in subcats" :key="ind" :to="{path: '/search', query: {cat: i.id, sort: filter.sort}}">{{i.name}}</router-link>
                </ul>
            </div>
            <div class="pad-bottom-16 search-group">
                <div id="filter">
                    <div class="sub-header">Фильтр:</div>
                    <div class="wrap">
                        <div class="item">
                            <div :class="{'option': true, 'active': filter.sort=='popularity'}" @click="filter.sort='popularity'; $router.push({path: '', query: {page: 1, cat: filter.cat_id, sort: filter.sort}});">по популярности</div>
                            <div :class="{'option': true, 'active': filter.sort=='az'}" @click="filter.sort='az'; $router.push({path: '', query: {page: 1, cat: filter.cat_id, sort: filter.sort}});">от А-Я</div>
                            <div :class="{'option': true, 'active': filter.sort=='za'}" @click="filter.sort='za'; $router.push({path: '', query: {page: 1, cat: filter.cat_id, sort: filter.sort}});">от Я-А</div>
                        </div>
                        <div class="item">
                            <div class="options">
                                <label for="promo-search"><input id="promo-search" type="checkbox"> Скидки и Акции</label> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="open-category" @click="chooseCatModal=!chooseCatModal"><i class="fa-solid fa-arrow-down-short-wide"></i> Поиск по категориям</div>
            </div>
            <div class="products-out">
                <div class="products-list" v-if="items.length">
                    <ProductTile v-for="(i, ind) in items" :key="ind" :data="i"/>
                </div>
                <div class="message" v-if="!items.length && !loadingSync"><i class="fa-solid fa-circle-xmark"></i>По Вашему запросу ничего не найдено</div>
                <div class="itemloading" v-if="loadingSync"></div>
            </div>
            <div class="pages" v-if="!loadingSync">
                <div class="prev" v-if="currentPage!=1" @click="choosePage(currentPage)">Предыдущая</div>
                <div class="page"
                v-for="i in maxpage" :key="i"
                v-show="(i > currentPage-2 && i < currentPage+4) || i == 1 || i == maxpage" 
                @click="choosePage(i)"
                :active="currentPage==i"
            >{{i}}</div>
                <div class="next" v-if="currentPage!=maxpage" @click="choosePage(currentPage+2)">Следующая</div>
            </div>
            <div class="pagination" v-if="false">
                <span>Всего страниц:</span>
                <div class="page-group">
                    <div class="button prev"><i class="fa-solid fa-angle-left"></i></div>
                    <div class="count">
                        <span><b>1</b></span>
                        <span>/</span>
                        <span>12</span>
                    </div>
                    <div class="button next"><i class="fa-solid fa-angle-right"></i></div>
                </div>
            </div>
            <div class="fullscreen blackout" v-if="chooseCatModal">
                <div class="modal">
                    <span class="close" @click="chooseCatModal=false"><i class="fa-solid fa-xmark"></i></span>
                    <div class="top">Поиск по категориям</div>
                    <div class="category-family" v-for="(i, ind) in cats" :key="ind" @click="(showCat==i.id ? showCat=-2 : showCat=i.id)">
                        <div class="title active"><i :class="getCatIcon(i.id)"></i>{{i.name}} <i class="fa-solid fa-chevron-down"></i></div>
                        <template v-if="(showCat==i.id)">
                            <div class="items">
                                <router-link v-for="(j, jind) in i.subcats" :key="jind" :to="{path: '/search', query: {cat: j.id}}">{{j.name}}</router-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import ProductTile from '../components/ProductTile.vue'
import cats from '../assets/scripts/getCategories'
export default {
    components: { ProductTile },
    data() {
        return {
            ready: false,
            serverQuery: Function,
            landyshTools: Object,
            RAMtools: Object,
            filter: {
                name: '',
                cat_id: -1,
                minCost: '',
                maxCost: '',
                sort: this.$route.query.sort ? this.$route.query.sort : 'popularity'
            },
            catpath: [],
            subcats: [],
            items: [],
            showSubcats: true,
            loadingSync: false,
            offset: 0,
            currentPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
            maxPerPage: 20,
            totalCount: 20,
            inputs: {},
            cats,
            masonryCols: 1,
            showCat: -1,
            windowWidth: window.innerWidth,
            icons: [
                {id: '1', icon: 'fa-solid fa-baby-carriage'},
                {id: '7', icon: 'fa-solid fa-leaf'},
                {id: '10', icon: 'fa-solid fa-prescription-bottle-medical'},
                {id: '14', icon: 'fa-solid fa-hand-holding-medical'},
                {id: '18', icon: 'fa-solid fa-tablets'},
                {id: '50', icon: 'fa-solid fa-mortar-pestle'},
                {id: '71', icon: 'fa-solid fa-suitcase-medical'},
                {id: '112', icon: 'fa-solid fa-suitcase-rolling'},
                {id: '185', icon: 'fa-solid fa-hands-bubbles'},
                {id: '965', icon: 'fa-solid fa-weight-scale'},
            ],
            chooseCatModal: false
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.inputs = inject('inputs');
        this.ready = true;

        this.filter.name = this.inputs.searchInput;

        this.init();

        console.log(this.cats);
        window.addEventListener('resize', this.windowResize);
    },
    unmounted() {
        window.removeEventListener('resize', this.windowResize)
    },
    methods: {
        getCatIcon(id) {
            let ind = this.icons.findIndex(e=>e.id == id);
            if (ind == -1) return '';
            return this.icons[ind].icon;
        },
        windowResize() {
            this.recalculateMasonryCols();
        },
        init() {
            let b = {el: -1};
            this.recursiveCatSearch(b, cats, this.$route.query.cat ? this.$route.query.cat : -1);

            if (b.el == -1) {
                b.el = {id: -1};
            }
            this.filter.cat_id = b.el.id;
            this.getCatParents(b.el);
            console.log(this.catpath);

            if (b.el.id == -1) {
                document.title = `Все товары - Интернет-аптека Landysh`;
                this.subcats = cats;
            }
            else {
                let pathLine = this.catpath.map(e=>e.name).join(', ');
                document.title = `${pathLine} - Интернет-аптека Landysh`;
                this.subcats = b.el.subcats;
            }
            this.offset = (this.currentPage-1) * this.maxPerPage;
            window.scrollTo({top: 0, behavior: 'smooth'});
            this.sync();
        },
        async sync() {
            this.loadingSync = true;
            this.items.splice(0, this.items.length);
            let response = await this.serverQuery('itemSearch', {name: this.filter.name, cat_id: this.filter.cat_id, sort: this.filter.sort, minCost: this.filter.minCost, maxCost: this.filter.maxCost, limit: 20, offset: this.offset}),
                data = response.data.message,
                items = data.items;
            console.log('sync', response);
            this.loadingSync = false;
            
            let ind = 0;
            for(let i in items) {
                this.landyshTools.parseItem(items[i]);
                this.items.push(items[i]);
                ind++;
            }
            if (ind <= 0) {
                this.maxOffset = true;
            }
            this.totalCount = parseInt(data.count[0]['COUNT(*)']);
            console.log(this.items);
        },
        // copy from product.vue >>>
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
        choosePage(page) {
            this.$router.push({path: '', query: {page, cat: this.filter.cat_id, sort: this.filter.sort}});
        }
    },
    computed: {
        maxpage() {
            return Math.floor(this.totalCount/this.maxPerPage) + 1;
        }
    }
}
</script>

<style scoped>
.container-grid{
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 20px
}

/* ===== CATALOG STYLES ===== */
.search-group{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
.open-category{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 100px;
    border: 1px solid var(--color-main);
    color: var(--color-main);
    font-weight: 600;
    cursor: pointer;
    transition: .3s;
}
.open-category:hover{
    background-color: var(--color-main-alpha);
}
.open-category i{color: var(--color-main);}
@media screen and (max-width: 767px){
    .search-group{
        flex-direction: column;
        align-items: flex-start;
    }
}
/* ===== END CATALOG STYLES ===== */





/* ===== FILTER STYLES ===== */
#filter{
    flex: 1;
}
#filter .wrap{
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}
#filter .wrap .item{
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
#filter .wrap .item .option{
    font-size: 14px;
    padding: 2px 0;
    font-weight: 500;
    border-bottom: 1px dotted transparent;
    cursor: pointer;
}
#filter .wrap .item .option:hover{
    color: var(--color-main);
}
#filter .wrap .item .option.active{
    color: var(--color-main);
    border-bottom: 1px dotted var(--color-main);
}
#filter .wrap .item label{
    cursor: pointer;
}
/* ===== END FILTER STYLES ===== */





/* ===== FILTER STYLES ===== */
.pagination{
    width: 100%;
    padding: 24px 0;
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
}
.pagination .page-group{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
}
.pagination .button{
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: 4px;
}
.pagination .button{
    display: flex;
    align-items: center;
    cursor: pointer;
}
.pagination .button:hover{
    background-color: #f5f5f5;
}
.pagination .count{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 120px;
    font-size: 19px;
}
/* ===== END FILTER STYLES ===== */

.products-out .message {
    width: 100%;
    border: 1px dashed #eaeaea;
    padding: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: .5px;
    color: var(--color-text-gray);
    text-align: center;
    font-size: 14px;
}
.miniloading {
    height: 19.5px;
    width: 150px;
    border-radius: 10px;
    background: linear-gradient(270deg, #a1a1a1, #dadada, #a1a1a1);
    background-size: 400% 400%;
    animation: flicker-loading 1s infinite;
    opacity: 0.3;
    margin-top: 5px;
}
.products-out .message i {
    margin-right: 5px;
    color: var(--color-text-gray);
}
.products-list{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 15px;
    justify-content: space-between;
    place-items: center;
    padding-bottom: 20px;
}
.itemloading {
    width: 100%;
    height: 400px;
    flex-shrink: 0;
    border: 1px solid rgb(166, 57, 254, 0) !important;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;
    border-radius: 10px;
    margin-bottom: 20px;
    animation: flicker-loading 2s infinite !important;
}
@media screen and (max-width: 480px){
    .products-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}
@media screen and (max-width: 380px){
    .products-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
.pages {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
}
.pages .page {
    width: 42px;
    height: 42px;
    border: 1px solid var(--rauza-lighten);
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    text-align: center;
    box-shadow: 0 0 7px rgba(0, 0, 0, 5%);
    cursor: pointer;
    margin-top: 0;
}
.pages .page:hover{
    color: var(--rauza-main);
    background-color: #f9f9f9;
}
.pages .page[active="true"] {
    background-color: var(--color-main);
    font-weight: bold;
    color: #FFF;
}
.pages .prev, .pages .next{
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px;
    box-sizing: border-box;
}
.pages .prev:hover, .pages .next:hover{
    color: var(--rauza-main);
}
#sub-category .switch-text{
    float: left;
    display: flex;
    color: var(--rauza-main);
    gap: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}
#sub-category .switch-text i{display: flex; align-items: center;}
#sub-category .switch-text:hover{color: #000;}

#sub-category .box{
    float: left;
    width: 100%;
    margin-top: 0;
    padding: 17px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    background: #fff;
    border-left: 2px solid var(--rauza-main);
    border-radius: 10px;
    list-style: none;
}
#sub-category .box a{
    cursor: pointer;
    transition: .3s all;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #2c3e50;
    text-decoration: none;
}
#sub-category .box a:hover{
    color: var(--rauza-main);
    transform: translateX(5px);
}
#sub-category .box a:before{
    content: '• ';
    font-weight: 600;
}
@media screen and (max-width: 720px){
    #sub-category .box{grid-template-columns: 1fr;}
}
</style>