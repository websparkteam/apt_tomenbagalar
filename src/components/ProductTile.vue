<template>
    <div class="product-card" v-if="ready">
        <div class="tags">
            <span class="tag new">{{data.category}}</span>
            <!-- <span class="tag discount">-5%</span> -->
        </div>
        <router-link :to="getProductUrl"><img class="image" :src="landyshTools.getImage(data.images)" @error="$event.target.src = require('../assets/no-image.jpg');" :alt="data.name"></router-link>
        <div class="title-wrap">
            <router-link :to="getProductUrl" class="sub-title">{{data.brand}}</router-link>
            <router-link :to="{name: 'Product', params: {id: data.med_id}}" class="title">{{data.name}}</router-link>
        </div>
        <div class="block">
            <div class="price-wrap">
                <div class="price-old">{{(data.price+240).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}}</div>
                <div class="price">{{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}}<div class="t-sym">₸</div></div>
            </div>
            <div class="action">
                <button class="addtocart" v-if="RAMtools.getRAM.cartList.findIndex(i=>i.id==data.id) == -1" @click="RAMtools.tileAddToCart(data)">В Корзину</button>
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
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    props: {
        data: Object
    },
    data() {
        return {
            ready: false,
            landyshTools: Object,
            RAMtools: Object
        }
    },
    mounted() {
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.ready = true;
    },
    computed: {
        getProductUrl() {
            return `/product/${this.data.med_id}`;
        }
    }
}
</script>

<style scoped>
.product-card{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    padding-top: 45px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #fff;
    /* border: 1px solid var(--color-border); */
    box-shadow: 0 0 20px rgb(95 125 149 / 5%);
    position: relative;
}
.product-card .tags{
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 5px;
}
.product-card .tags .tag{
    padding: 8px 12px;
    border-radius: 5px;
    background-color: #eaeaea;
    font-size: 12px;
}
.product-card .tags .tag.new{background-color: #FFD043; color: #131313;}
.product-card .tags .tag.discount{
    background-color: var(--color-secondary);
    color: #fff;
    font-weight: 600;
}
.product-card .image{
    width: 100%;
    height: 160px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 4px;
    object-fit: contain;
}
.product-card .title-wrap{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
}
.product-card .title{
    height: 60px;
    font-size: 17px;
    color: #131313;
    font-weight: 500;
    
    color: #131313;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.product-card .sub-title{
    font-size: 14px;
    color: var(--color-main);
}
.product-card .block{
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
@media screen and (max-width: 480px){
    .product-card{
        padding: 14px;
        gap: 8px;
    }
    .product-card .block{
        display: flex;
        flex-direction: column;
        height: unset;
    }
    .product-card .title-wrap{gap: 3px;}
    .product-card .title{font-size: 16px;}
    .product-card .price-wrap{
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }
    .product-card .price{font-size: 19px;}
}
</style>