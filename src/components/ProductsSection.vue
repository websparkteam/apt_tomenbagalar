<template>
    <div class="products-list">
        <ProductTile />
    </div>
</template>

<script>
import ProductTile from './ProductTile.vue'

export default {
    components: {
        ProductTile,
    },
    data(){
        return{
            
        }
    },
};
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
@media screen and (max-width: 480px){
    .products-list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 5px;
    }
}
</style>