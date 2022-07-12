<template>
    <div class="flex-centered flex-column">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <span class="pathlink">Корзина</span>
            </div>
            <div class="pad-bottom-16">
                <h2 class="page-header">Корзина</h2>
            </div>
        </div>
        <div class="container container-grid">
            <div id="cart-items">

                <div class="empty-cart">
                    <span class="icon"><i class="fa-solid fa-basket-shopping"></i></span>
                    <span class="title">Ваша корзина пуста</span>
                    <span class="text">Похоже, что Вы еще ничего не добавили в корзину.</span>
                    <router-link to="/search">Перейти к покупкам</router-link>
                </div>

                <div class="item" v-for="i, ind in 2" :key="ind">
                    <div class="item-left">
                        <img class="image" src="../assets/nobelaff-roksibel-150mg-n10-101341812-1.jpg" alt="Роксибел 150мг N10">
                        <div class="descriptions">
                            <router-link to="#" class="title">Роксибел 150мг N10</router-link>
                            <div class="code">Код товара: 77896</div>
                            <div class="company">Нобел АФФ</div>
                        </div>
                    </div>
                    <div class="item-right">
                        <div class="quantity">
                            <div class="quantity-cart">
                                <button class="minus">-</button>
                                <input class="number" type="number" value="1">
                                <button class="minus">+</button>
                            </div>
                        </div>
                        <div class="price">121 905 <div class="t-sym">₸</div></div>
                        <div class="close">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>

                <div class="alert"><i class="fa-solid fa-parachute-box"></i> При заказе товаров на сумму от 15000тг доставка по городу Бесплатно !</div>

                <div class="actions">
                    <router-link class="go-shop" to="/search"><i class="fa-solid fa-plus"></i> Добавить позиции</router-link>
                    <button class="clear-cart"><i class="fa-regular fa-trash-can"></i> Очистить корзину</button>
                </div>
            </div>
            <div class="page"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        
    }
}
</script>

<style scoped>
.container-grid{
    display: grid;
    grid-template-columns: 1fr 300px;
}
.alert{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 14px;
    box-sizing: border-box;
    border-radius: 4px;
    background: rgb(90,191,112,.1);
    font-size: 14px;
}
.alert i{
    color: rgb(90,191,112);
}





/* ===== EMPTY CART STYLES ===== */
.empty-cart{
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    border: 1px dashed #ddd;
}
.empty-cart .icon{
    width: 50px;
    height: 50px;
    padding: 12px;
    box-sizing: border-box;
    background-color: #f6f7f8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
}
.empty-cart .icon i{
    display: flex;
    align-items: center;
    font-size: 24px;
    color: var(--color-main);
}
.empty-cart .title{
    color: #000;
    font-size: 22px;
    font-weight: 700;
    margin-top: 15px;
}
.empty-cart .text{
    color: #708086;
    margin-top: 5px;
}
.empty-cart a{
    padding: 12px 24px;
    color: var(--color-main);
    border: 2px solid var(--color-main);
    border-radius: 4px;
    margin-top: 25px;
    transition: .3s;
}
.empty-cart a:hover{background-color: rgb(90,191,112,.1);}
@media screen and (max-width: 490px){
    .empty-cart{padding: 24px;}
    .empty-cart .title{font-size: 20px;}
    .empty-cart .text{font-size: 14px;text-align: left;}
}
/* ===== END EMPTY CART STYLES ===== */





/* ===== CART STYLES ===== */
#cart-items{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 15px;
}
#cart-items .item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
}
#cart-items .item-left{
    width: 400px;
    display: flex;
    align-items: center;
    gap: 24px;
}
#cart-items .item .image{
    width: 90px;
    height: 90px;
    padding: 10px;
    box-sizing: border-box;
    object-fit: contain;
    background-color: #fff;
    border-radius: 4px;
}
#cart-items .item .descriptions{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
}
#cart-items .item .title{
    font-size: 17px;
    color: #131313;
    font-weight: 500;
    margin-bottom: 5px;
    
    color: #131313;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
#cart-items .item-right{
    width: 310px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
}
#cart-items .item .quantity-cart{width: 140px;}
#cart-items .item .price{
    width: 80px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    font-family: var(--font-secondary);
}
#cart-items .item .price .t-sym{
    font-weight: 400;
    font-size: 14px;
    color: var(--color-text-secondary)
}
#cart-items .item .close{
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
#cart-items .item .close:hover i{color: var(--color-error);}
/* ===== END CART STYLES ===== */





/* ===== CART STYLES ===== */
/* ===== END CART STYLES ===== */
</style>