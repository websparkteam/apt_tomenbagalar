<template>
    <div class="flex-centered flex-column">
        <div class="container">
            <div class="path">
                <router-link class="pathlink" to="/">Главная</router-link>
                <router-link class="pathlink" to="/cart">Корзина</router-link>
                <span class="pathlink">Оформление заказа</span>
            </div>
            <div class="pad-bottom-16">
                <h2 class="page-header">Оформление заказа</h2>
            </div>
        </div>
        <div class="container" style="max-width: 820px; box-shadow: var(--box-shadow);">
            <div class="content">    
                <div class="block">
                    <div class="page-title"><div class="num">1</div>Тип получения</div>
                    
                    <div class="radio-wrap">
                        <div class="radio-item">
                            <input id="delivery-type-2" type="radio" name="delivery-type" checked>
                            <label for="delivery-type-2">Доставка</label>
                        </div>
                        <div class="radio-item">
                            <input id="delivery-type-1" type="radio" name="delivery-type">
                            <label for="delivery-type-1">Самовывоз</label>
                        </div>
                    </div>
                    <template v-if="true">
                        <div class="page-subtitle">Укажите способ доставки</div>
                        <div class="radio-wrap">
                            <div class="radio-item">
                                <input id="address-mode-1" type="radio" name="address-mode">
                                <label for="address-mode-1">Указать адрес <small>(Рекомендовано)</small></label>
                            </div>
                            <div class="radio-item">
                                <input id="address-mode-2" type="radio" name="address-mode">
                                <label for="address-mode-2">Ввести вручную</label>
                            </div>
                        </div>
                        
                        <div class="address-fill">
                            <div class="input-group" >
                                <label>Адрес доставки</label>
                                <textarea type="text" placeholder="г.Нур-Султан, ул. Туркестан, 8/2"></textarea>
                            </div>
                        </div>
                        
                        <div class="address-additions">
                            <div class="grid-col-2">
                                <div class="input-group iconed">
                                    <span class="icon"><i class="fa-solid fa-house-laptop"></i></span>
                                    <input type="text" placeholder="Дом (Не обязательно)">
                                </div>
                                <div class="input-group iconed">
                                    <span class="icon"><i class="fa-regular fa-building"></i></span>
                                    <input type="text" placeholder="Квартира, Офис (Не обязательно)">
                                </div>
                            </div>
                            <div class="grid-col-2">
                                <div class="grid-col-2">
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-regular fa-bell"></i></span>
                                        <input type="text" placeholder="Домофон (Не обязательно)">
                                    </div>
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-solid fa-door-open"></i></span>
                                        <input type="text" placeholder="Подъезд (Не обязательно)">
                                    </div>
                                </div>  
                                <div class="grid-col-1">
                                    <div class="input-group iconed">
                                        <span class="icon"><i class="fa-solid fa-layer-group"></i></span>
                                        <input type="text" placeholder="Этаж (Не обязательно)">
                                    </div>
                                </div>                        
                            </div>
                        </div>
                    </template>
                    
                    <template v-if="true">
                        <div class="page-subtitle">Выберите аптеку для самовывоза</div>
                        
                        <div class="radio-wrap order-radio">
                            <div class="item">
                                <input id="pharmacy-2" type="radio" name="pharmacy-radio">
                                <label for="pharmacy-2"><span class="text">Pharmteka на Пушкина 1</span></label>
                            </div>
                            <div class="item">
                                <input id="pharmacy-1" type="radio" name="pharmacy-radio">
                                <label for="pharmacy-1"><span class="text">Landysh на Е-753, д.2 (Сыганак)</span></label>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="block">

                    <div class="page-title"><div class="num">2</div>Доставка</div>
                    <div class="radio-wrap order-radio iconed">
                        <div class="item">
                            <input id="delivery-2" type="radio" name="delivery-radio">
                            <label for="delivery-2">
                                <span class="text">Доставка курьером</span>
                                <span class="desc">
                                    <span>от 30 мин до 90 мин</span>
                                    <div class="price">315 <small>₸</small></div>
                                </span>
                                <span class="icon i1"></span>
                            </label>
                        </div>
                        <div class="item">
                            <input id="delivery-1" type="radio" name="delivery-radio">
                            <label for="delivery-1">
                                <span class="text">Экспресс доставка</span>
                                <span class="desc">
                                    <span v-if="true">в течении 45 мин</span>
                                    <span v-else>время работы <b>с 9:00 до 22:00</b></span>
                                    <div class="price">315 <small>₸</small></div>
                                </span>
                                <span class="icon i2"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">3</div>Способ оплаты</div>
                    <div class="radio-wrap">
                        <div class="radio-item">
                            <input id="payment-type-2" type="radio" name="payment-type" checked>
                            <label for="payment-type-2">Online оплата Visa/Mastercard</label>
                        </div>
                        <div class="radio-item">
                            <input id="payment-type-1" type="radio" name="payment-type">
                            <label for="payment-type-1">Оплата наличными</label>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">4</div>Контактное лицо</div>

                    <div class="grid-col-2">
                        <div class="input-group">
                            <label>Имя <span class="req">*</span></label>
                            <input type="text" autocomplete="name">
                        </div>
                        <div class="input-group">
                            <label>Телефон <span class="req">*</span></label>
                            <input type="num" autocomplete="phone" value="+7">
                        </div>
                    </div>
                    <div class="input-group iconed">
                        <label>Комментарии к заказу</label>
                        <span class="icon" style="top: 45px"><i class="fa-regular fa-message"></i></span>
                        <textarea type="text" rows="10" autocomplete="off" placeholder="Не обязательно"></textarea>
                    </div>
                    
                    <div class="checkbox-wrap">
                        <label for="data-save">
                            <input id="data-save" type="checkbox">
                            <span class="checkmark"></span><span>Сохранить мои данные для дальнейших заказов</span>
                        </label>
                    </div>
                </div>
                <div class="block make-order-block">
                    <div class="title">Оформить заказ</div>
                    <ul class="recipt">
                        <li class="total">
                            <span>Итого:</span>
                            <span class="sum">1 234₸</span>
                        </li>
                    </ul>
                    <button class="order-button ob-1">Оформить заказ</button>
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

.req{color: var(--color-secondary);}
.grid-col-1{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
}
.grid-col-2{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
}
.grid-col-3{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}
@media screen and (max-width: 767px){
    .grid-col-3,
    .grid-col-2{grid-template-columns: 1fr;}
}





/* ===== CHECKOUT STYLES ===== */
.block{
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
}
.make-order-block{align-items: flex-end;}
.make-order-block .title{
    font-size: 17px;
    color: #131313;
    font-weight: 600;
    font-family: var(--font-secondary);
}
.make-order-block .recipt li{
    display: flex;
    justify-content: space-between;
    gap: 12px;
    list-style: none;
    font-size: 14px;
}
.make-order-block .recipt li span{
    color: var(--color-text-secondary);
}
.make-order-block .recipt li .sum{
    font-size: 16px;
    font-weight: 500;
    color: #131313;
}
.make-order-block .order-button{
    max-width: 220px;
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
    border: none;
    outline: none;
}
.make-order-block .order-button:hover{
    color: #fff !important;
    opacity: .85;
}
.make-order-block .order-button.ob-1{background: var(--color-main);}
@media screen and (max-width: 480px){
    .make-order-block{align-items: center;}
    .make-order-block .order-button{max-width: 100%;}
}

.page-title{
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding-bottom: 5px;
    font-size: 18px;
    font-family: var(--font-secondary);
    font-weight: 600;
}
.page-title .num{
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-main);
    border: 1px solid var(--color-border);
    border-radius: 100px;
}
.page-subtitle{
    width: 100%;
    font-size: 16px;
    font-weight: 500;
}
.form{
    display: flex;
}
.address-fill{
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.address-additions{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    padding-top: 12px;
    box-sizing: border-box;
    margin-top: 12px;
    border-top: 2px dashed var(--color-border);
    gap: 15px;
}
@media screen and (max-width: 767px){
    .address-fill{padding: 0;}
    .address-additions{padding: 0; padding-top: 12px;}
}
/* ===== END CHECKOUT STYLES ===== */





/* ===== RADIO-WRAP STYLES ===== */
.radio-wrap {
	display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 45px;
    background-color: #f6f7f8;
}
.radio-wrap input[type=radio] {display: none;}
.radio-wrap label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    padding: 11px 15px;
    box-sizing: border-box;
    border-radius: 3px;
	border: 1px solid var(--border);
    border-radius: 100px;
	user-select: none;
	cursor: pointer;
}
.radio-wrap label::before{
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #ccc;
    display: block;
}
 
/* Checked */
.radio-wrap input[type=radio]:checked + label {
    background-color: #fff;
    border-color: var(--color-main);
}
.radio-wrap input[type=radio]:checked + label::before{background-color: var(--color-main);}
 
/* Disabled */
.radio-wrap input[type=radio]:disabled + label {
	opacity: 0.5;
    cursor: not-allowed;
}
@media screen and (max-width: 767px){
    .radio-wrap{
        width: 100%;
        margin: 0;
        border-radius: 0;
        border: none;
        flex-direction: column;
        background: none;
    }
}
/* ===== END RADIO-WRAP STYLES ===== */





/* ===== ORDER-RADIO STYLES ===== */
.order-radio{
    gap: 15px;
    border-radius: none;
    border: none;
    background: none;
}
.order-radio label{
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid var(--color-border);
    position: relative;
}
.order-radio label::before{
    position: absolute;
    top: 15px;
    left: 15px;
}
.order-radio label span.text{
    font-weight: 600;
    color: #131313;
    padding-left: 20px;
    box-sizing: border-box;
}
.order-radio label span.desc{
    display: flex;
    flex-direction: column;
    gap: 4;
    font-size: 14px;
}
.order-radio label .price{
    font-weight: 600;
    font-size: 18px;
    color: var(--color-black);
    height: 21px;
}
.order-radio .price.loading {
    background-color: #ffffff;
    border-radius: 10px;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;

    animation: flicker-loading 2s infinite !important;
}
.order-radio.iconed label{
    padding-right: 70px;
}
.delivery-radio label .icon{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
}
.delivery-radio label .icon.i1{
    /* background: url("../assets/bycicle.svg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.delivery-radio label .icon.i2{
    /* background: url("../assets/delivery-truck.svg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
/* ===== END ORDER-RADIO STYLES ===== */





/* ===== CHECKBOX STYLES ===== */
.checkbox-wrap{
    display: flex;
    align-items: center;
} /* Save my data - Checkbox */
.checkbox-wrap .checkmark{
	float: left;
	width: 20px;
	height: 20px;
	border-radius: 4px;
	background-color: #efefef;
	box-sizing: border-box;
	line-height: 1.6;
	text-align: center;
	cursor: pointer;
	margin-right: 10px;
	border: 1px solid var(--color-border-6);
}
.checkbox-wrap .checkmark:before{
	content: "\f00c";
    font-family: "Font Awesome 5 Free";
    font-size: 12px;
	font-weight: bold;
	color: var(--color-main);
	display: none;
}
.checkbox-wrap input{display: none;}
.checkbox-wrap input:checked ~ .checkmark:before{display: block;}
.checkbox-wrap label{
	box-sizing: border-box;
	line-height: 20px;
	font-family: var(--font-primary);
	font-size: 14px;
	cursor: pointer;
	color: #676767;
}
.checkbox-wrap label:hover{color: #000;}
/* ===== END CHECKBOX STYLES ===== */


</style>