<template>
    <div class="products-list" v-if="ready">
        <ProductTile v-for="(i, ind) in items" :key="ind" :data="i"/>
    </div>
    <div class="itemloading" v-if="loadingSync"></div>
</template>

<script>
import { inject } from '@vue/runtime-core'
import ProductTile from './ProductTile.vue'

export default {
    components: {
        ProductTile
    },
    data() {
        return {
            ready: false,
            offset: 0,
            serverQuery: Function,
            landyshTools: Object,
            items: [],
            loadingOffset: false,
            maxOffset: false,
            loadingSync: false
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.ready = true;

        this.sync();

        // window.addEventListener('scroll', this.listScroll);
    },
    beforeUnmount() {
        // window.removeEventListener('scroll', this.listScroll);
    },
    methods: {
        async sync() {
            this.loadingSync = true;
            let response = await this.serverQuery('getHot', {limit: 20, offset: this.offset}),
                data = response.data.message;
            this.loadingSync = false;
            
            let ind = 0;
            for(let i in data) {
                this.landyshTools.parseItem(data[i]);
                this.items.push(data[i]);
                ind++;
            }
            if (ind <= 0) {
                this.maxOffset = true;
            }
            console.log(this.items);
        },
        listScroll(e) {
            console.log(e);
            let scrollBottom = document.documentElement.scrollTop+window.innerHeight;
            let scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
            );
            let a = window.innerWidth < 500 ? 400 : 100;
            if(scrollBottom > (scrollHeight-a)) {
                this.lazyLoad();
            }
        },
        async lazyLoad() {
            if (this.loadingOffset || this.maxOffset) return;
            this.loadingOffset = true;
            this.offset += 20;
            console.log('lazy load')
            await this.sync();
            this.loadingOffset = false;
            console.log('Updated!')
        },
    }
}
</script>
<style scoped>
.products-list{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 15px;
    justify-content: space-between;
    place-items: center;
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
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 5px;
    }
}
</style>