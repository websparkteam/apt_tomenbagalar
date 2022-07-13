<template>
    <div class="flex-centered">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <router-link class="pathlink" to="/search">Каталог</router-link>
                <span class="pathlink">Роксибел 150мг N10</span>
            </div>

            <div class="wrap-grid">
                <div class="product-card">
                    <div class="image">
                        <img src="../assets/nobelaff-roksibel-150mg-n10-101341812-1.jpg" alt="Роксибел 150мг N10">
                    </div>
                    <div class="mini-title">О Товаре</div>
                    <div class="group">
                        <div class="price-wrap">
                            <div class="price-old">1 905</div>
                            <div class="price">1 905 <div class="t-sym">₸</div></div>
                        </div>
                        <div class="action">
                            <button class="addtocart" v-if="true">В Корзину</button>
                            <div v-else class="quantity-cart">
                                <button class="minus">-</button>
                                <input class="number" type="number" value="1">
                                <button class="minus">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <h2 class="card-title">Роксибел 150мг N10</h2>
                    <div class="mini-title">Параметры</div>
                    <div class="params-wrap">
                        <div class="item">
                            <div class="name">Артикул</div>
                            <div class="value">54265</div>
                        </div>
                        <div class="item">
                            <div class="name">Производитель</div>
                            <div class="value">Нобел АФФ</div>
                        </div>
                        <div class="item">
                            <div class="name">Страна</div>
                            <div class="value">Россия</div>
                        </div>
                    </div>
                    <div class="mini-title">Поделиться</div>
                    <div class="share-wrap">
                        <button><i class="fa-regular fa-copy"></i>Артикул: 54265</button>
                        <button><i class="fa-solid fa-link"></i>Скопировать ссылку</button>
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

            <section class="block">
                <div class="pad-bottom-16">
                    <h2 class="page-header">Наличие в аптеках</h2>
                </div>
                <div class="pharmacy-list">
                    <div class="item" v-for="i,ind in 5" :key="ind">
                        <div class="adress">Ландыш на Бокейхан, 32</div>
                        <div class="schedule">Ежедневно 9:00-23:00</div>
                        <div class="stock"><div class="indicator"></div>Наличие: 5шт</div>
                        <div class="price">1 925₸</div>

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
                    <li v-for="(i, ind) in 10" :key="ind"><span>Тип</span><span class="val">профилактическое средство</span></li>
                </ul>
                <div class="description pad-top-16">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error similique odit aut, repellat nulla assumenda quos necessitatibus earum ut incidunt corrupti nobis sunt laudantium dolorum non iusto distinctio in atque.
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
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
.pharmacy-list .adress{
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
/* ===== END DESCRIPTION ===== */
</style>