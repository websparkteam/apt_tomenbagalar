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
        <div class="container container-grid">
            <div class="content">    
                <div class="block">
                    <div class="page-title"><div class="num">1</div>Тип получения</div>
                    
                    <div class="radio-wrap">
                        <div class="item">
                            <input id="delivery-type-2" type="radio" name="delivery-type">
                            <label for="delivery-type-2">Доставка</label>
                        </div>
                        <div class="item">
                            <input id="delivery-type-1" type="radio" name="delivery-type">
                            <label for="delivery-type-1">Самовывоз</label>
                        </div>
                    </div>

                    
                    <div class="page-subtitle pad-bottom-16">Укажите адрес доставки</div>
                    <div class="radio-wrap radio-wrap-2">
                        <div class="item">
                            <input id="address-mode-1" type="radio" name="address-mode">
                            <label for="address-mode-1">Указать адрес <div class="free">(Рекомендовано)</div></label>
                        </div>
                        <div class="item">
                            <input id="address-mode-2" type="radio" name="address-mode">
                            <label for="address-mode-2">Ввести вручную</label>
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">2</div>Доставка</div>
                    <div class="radio-wrap order-radio">
                            <div class="item">
                                <input id="delivery-2" type="radio" name="delivery-radio">
                                <label for="delivery-2">
                                    <span class="text">Доставка курьером</span>
                                    <span class="desc">
                                        <span>от 30 мин до 90 мин</span>
                                        <div class="price">315 <small class="t-sym">₸</small></div>
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
                                        <div class="price">315 <small class="t-sym">₸</small></div>
                                    </span>
                                    <span class="icon i2"></span>
                                </label>
                            </div>
                        </div>
                </div>
                <div class="block">
                    <div class="page-title"><div class="num">3</div>Способ оплаты</div>
                    block 3
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
                    <div class="input-group">
                        <label>Комментарии к заказу</label>
                        <textarea type="text" rows="10" autocomplete="off" placeholder="Не обязательно"></textarea>
                    </div>
                    
                    <div class="checkbox-wrap">
                        <label for="data-save">
                            <input id="data-save" type="checkbox">
                            <span class="checkmark"></span><span>Сохранить мои данные для дальнейших заказов</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="sidebar">
                total
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
    grid-template-columns: 1fr 280px;
    align-items: start;
}
.req{color: var(--color-secondary);}
.grid-col-2{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
.grid-col-3{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
@media screen and (max-width: 767px){
    .container-grid{
        display: flex;
        flex-direction: column;
        gap: 50px;
        align-items: unset;
    }
    .grid-col-3,
    .grid-col-2{grid-template-columns: 1fr;}
}





/* ===== CHECKOUT STYLES ===== */
.block{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
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
/* ===== END CHECKOUT STYLES ===== */





/* ===== ORDER-RADIO STYLES ===== */
.order-radio{
    padding: 0;
    margin-top: 12px;
    background-color: #fff;
}
.order-radio label::before{
    position: absolute;
    top: 15px;
    left: 15px;
}
.order-radio label{
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    position: relative;
    padding-right: 70px;
    box-sizing: border-box;
}
.order-radio label span.text{
    font-weight: 600;
    color: #131313;
    padding-left: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
}
.order-radio label span.desc{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: var(--color-text-gray);
}
.order-radio label .price{
    padding-top: 4px;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-black);
    height: 20px;
}
.order-radio .price.loading {
    background-color: #ffffff;
    border-radius: 10px;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;

    animation: flicker-loading 2s infinite !important;
}
.order-radio .price.active .t-sym {
    visibility: visible;
}
.order-radio .price .t-sym {
    margin-left: 5px;
    color: #767676;
    visibility: hidden;
}
.order-radio label .icon{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 45px;
    height: 45px;
}
.order-radio label .icon.i1{
    /* background: url("../assets/bycicle.svg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.order-radio label .icon.i2{
    /* background: url("../assets/delivery-truck.svg"); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
/* ===== END ORDER-RADIO STYLES ===== */





/* ===== RADIO-WRAP STYLES ===== */
.radio-wrap {
    width: 100%;
	display: flex;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
    gap: 15px;
}
.radio-wrap input[type=radio] {display: none;}
.radio-wrap label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
	cursor: pointer;
	border: 1px solid var(--border);
    border-radius: 3px;
	user-select: none;
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
    background: #fff;
    border-color: var(--color-main);
}
.radio-wrap input[type=radio]:checked + label::before{background-color: var(--color-main);}
 
/* Disabled */
.radio-wrap input[type=radio]:disabled + label {
	opacity: 0.5;
    cursor: not-allowed;
}
/* ===== END RADIO-WRAP STYLES ===== */





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