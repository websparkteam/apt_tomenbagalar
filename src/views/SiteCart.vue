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

                <div class="empty-cart" v-if="false">
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

                <div class="cart-actions">
                    <router-link class="go-shop" to="/search"><i class="fa-solid fa-plus"></i> Добавить позиции</router-link>
                    <button class="clear-cart"><i class="fa-regular fa-trash-can"></i> Очистить корзину</button>
                </div>
            </div>
            <div class="sidebar">
                <div class="page">
                    <div class="title">Оформить заказ</div>
                    <ul class="adv">
                        <div class="item"><span class="icon"></span> Надежная защита данных</div>
                        <div class="item"><span class="icon"></span> Сезонные скидки</div>
                        <div class="item"><span class="icon"></span> Уникальные предложения</div>
                    </ul>
                    <ul class="recipt">
                        <li>
                            <span>Сумма:</span>
                            <span class="sum">1 234₸</span>
                        </li>
                        <li>
                            <span>Скидки / Промокоды:</span>
                            <span class="sum">0</span>
                        </li>
                        <li class="total">
                            <span>Итого:</span>
                            <span class="sum">1 234₸</span>
                        </li>
                    </ul>
                    <router-link to="/cart/checkout" class="order-button ob-1">Оформить заказ</router-link>
                </div>
                
                <div class="page">
                    <div class="title">Продолжить без регистрации</div>
                    <div class="text">
                        Отлично подходит для одноразовых заказов
                    </div>
                    <router-link to="/cart/checkout" class="order-button ob-2">Продолжить без регистрации</router-link>
                </div>
            </div>
        </div>
    </div>
    
            
    <div class="fullscreen blackout">
        <div class="modal">
            <span class="close"><i class="fa-solid fa-xmark"></i></span>
            <div class="top">Авторизация</div>
            <div id="auth">
                <div class="form">
                    <div class="auth-title">Войти</div>
                    <div class="text">Для получения персональных и сезонных скидок, а также уникальных предложений</div>
                    <div class="input-group">
                        <label>Телефон</label>
                        <input type="text" placeholder="+7 (___) ___-____" autocomplete="phone" value="+7">
                    </div>
                    <div class="input-group">
                        <label>Пароль</label>
                        <input type="password" placeholder="Пароль" autocomplete="off">
                    </div>
                    <div class="alert-area">
                        <span>Заполните поля</span>
                    </div>
                    <button>Войти</button>
                    
                    <div class="switch-wrap">
                        <span class="switch">Еще нет аккаунта ? Регистрация</span>
                    </div>
                </div>
                <div class="form">
                    <div class="auth-title">Регистрация</div>
                    <div class="text">Следуя инструкциям пройдите не сложную процедуру регистрации</div>
                    <div class="input-group">
                        <label>Телефон</label>
                        <input type="text" placeholder="+7 (___) ___-____" autocomplete="phone" value="+7">
                    </div>
                    <div class="input-group">
                        <label>Пароль</label>
                        <input type="password" placeholder="Пароль" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label>Подтвердите пароль</label>
                        <input type="password" placeholder="Пароль" autocomplete="off">
                    </div>
                    <div class="alert-area">
                        <span>Заполните поля</span>
                    </div>
                    <button>Регистрация</button>
                    <div class="switch-wrap">
                        <span class="switch">Уже есть Аккаунт ? Войти</span>
                    </div>
                </div>
                
            </div>
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
    grid-template-columns: 1fr 320px;
    align-items: start;
}
.alert{
    padding: 14px;
    box-sizing: border-box;
    border-radius: 4px;
    background: rgb(90,191,112,.1);
    font-size: 14px;
}
.alert i{
    margin-right: 8px;
    color: rgb(90,191,112);
}
@media screen and (max-width: 767px){
    .container-grid{
        display: flex;
        flex-direction: column;
        gap: 50px;
        align-items: unset;
    }
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
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid var(--color-border-6);
    position: relative;
}
#cart-items .item-left{
    width: 310px;
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
#cart-items .descriptions .code,
#cart-items .descriptions .company{
    color: var(--color-text-secondary) !important;
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
    font-weight: 500;
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
.cart-actions{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.go-shop{
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px;
    font-size: 14px;
}
.clear-cart{
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
    border-bottom: 1px dashed transparent;
}
.clear-cart:hover{
    border-bottom: 1px dashed var(--color-black);
}
@media screen and (max-width: 1024px) {
    #cart-items .item{flex-direction: column;}
    #cart-items .item-left{width: 100%;}
    #cart-items .item-right{
        width: 100%;
        justify-content: space-between;
    }
    #cart-items .close{
        position: absolute;
        top: 5px;
        right: 5px;
    }
}
/* ===== END CART STYLES ===== */





/* ===== SIDEBAR STYLES ===== */
.sidebar{
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.sidebar .page{
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 24px 20px;
}
.sidebar .title{
    font-size: 17px;
    color: #131313;
    font-weight: 600;
    font-family: var(--font-secondary);
}
.sidebar .adv{position: relative;}
.sidebar .adv .item{
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 25px;
    font-size: 14px;
}
.sidebar .adv .item .icon{
    display: block;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    background: url('../assets/shield.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.sidebar .recipt li{
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 14px 0;
    font-size: 14px;
    border-bottom: 1px solid var(--color-border-6);
}
.sidebar .recipt li span{
    color: var(--color-text-secondary);
}
.sidebar .recipt li .sum{
    font-size: 16px;
    font-weight: 500;
    color: #131313;
}
.sidebar .text{
    font-size: 14px;
    color: var(--color-text-secondary);
}
.sidebar .order-button{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 45px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #eaeaea;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    letter-spacing: .5px;
}
.sidebar .order-button:hover{
    color: #fff !important;
    opacity: .85;
}
.sidebar .order-button.ob-1{
    background: var(--color-main);
}
.sidebar .order-button.ob-2{
    background: rgb(248,154,43);
}
/* ===== END SIDEBAR STYLES ===== */
</style>