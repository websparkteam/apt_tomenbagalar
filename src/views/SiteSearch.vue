<template>
    <div class="flex-centered">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <router-link class="pathlink" to="/search">Каталог</router-link>
                <span class="pathlink">Это страница не router-link</span>
            </div>
        </div>
    </div>
    <div class="page flex-centered">
        <div class="container">
            <div class="pad-bottom-16">
                <h2 class="page-header">По запросу «Терафлю» найдено</h2>
                <div class="sub-header">25 037 товаров</div>
            </div>
            <div class="pad-bottom-16 search-group">
                <div id="filter">
                    <div class="sub-header">Фильтр:</div>
                    <div class="wrap">
                        <div class="item">
                            <div class="option active">по популярности</div>
                            <div class="option">от А-Я</div>
                            <div class="option">от Я-А</div>
                        </div>
                        <div class="item">
                            <div class="options">
                                <label for="promo-search"><input id="promo-search" type="checkbox"> Скидки и Акции</label> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="open-category"><i class="fa-solid fa-arrow-down-short-wide"></i> Поиск по категориям</div>
            </div>
            <ProductsSection />
            <div class="pagination">
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
            
            <div class="fullscreen blackout">
                <div class="modal">
                    <span class="close"><i class="fa-solid fa-xmark"></i></span>
                    <div class="top">Поиск по категориям</div>
                    <div class="category-family">
                        <div class="title active">Мама и малыш <i class="fa-solid fa-chevron-down"></i></div>
                        <div class="items">
                            <router-link to="#" v-for="i, ind in 6" :key="ind">Кормление</router-link></div>
                    </div>
                    <div class="category-family">
                        <div class="title">Мама и малыш <i class="fa-solid fa-chevron-right"></i></div>
                    </div>
                    <div class="category-family">
                        <div class="title">Мама и малыш <i class="fa-solid fa-chevron-right"></i></div>
                    </div>
                    <div class="category-family">
                        <div class="title">Мама и малыш <i class="fa-solid fa-chevron-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductsSection from '@/components/ProductsSection.vue';
export default {
    data() {

    },
    components: { ProductsSection }
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
    min-height: 200px;
    height: max-content;
    background: #fff;
    border-radius: 22px;
    overflow: hidden;
    padding: 25px;
    padding-bottom: 40px;
    box-sizing: border-box;
    position: relative;
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
/* ===== END MODAL STYLES ===== */
</style>