<template>
    <section class="page" v-if="$route.params.state=='success'">
        <div class="order-state">
            <span class="icon"><i class="fa-regular fa-circle-check"></i></span>
            <span class="title">Оплата заказа прошла успешно</span>
            <span class="text">Вы можете отследить заказ в личном кабинете <router-link to="/mycabinet">по этой ссылке</router-link></span>
            <router-link to="/mycabinet" class="button button-success">В список заказов</router-link>
        </div>
    </section>
    <section class="page" v-if="$route.params.state=='fail'">
        <div class="order-state">
            <span class="icon error"><i class="fa-regular fa-circle-xmark"></i></span>
            <span class="title">Оплата заказа прошла неудачно</span>
            <span class="text">В личном кабинете можно повторить попытку оплаты <router-link to="/mycabinet">по этой ссылке</router-link></span>
            <router-link to="/mycabinet" class="button button-success">В список заказов</router-link>
        </div>
    </section>
</template>

<script>

</script>

<style scoped>

/*  ==========  SUCESS ORDER STYLES  ==========  */
.order-state{
	width: 100%;
	padding: 50px;
	box-sizing: border-box;
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    border: 2px dashed #ddd;
}
.order-state .icon{
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
.order-state .icon i{
    display: flex;
    align-items: center;
    font-size: 24px;
    color: var(--color-main);
}
.order-state .icon.error{background: var(--color-error-alpha)}
.order-state .icon.error i{
    color: var(--color-error);
}
.order-state .title{
    width: 520px;
    text-align: center;
	color: #000;
	font-size: 22px;
	font-weight: 700;
	margin-top: 15px;
}
.order-state .text{
    width: 520px;
    text-align: center;
	color: #708086;
	margin-top: 5px;
}
.order-state .text span{color: #000;}
.order-state .text a{color: var(--color-blue-link) !important;}
.order-details ul{
    margin: 0;
    padding: 0;
    list-style: none;
    background: #f9f9f9;
    padding: 14px;
    box-sizing: border-box;
    border-radius: 10px;
}
.order-details li{
    font-size: 14px;
    color: var(--color-text-gray);
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
}
.order-state .button{
        margin-top: 12px;
        width: 180px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-family: var(--font-primary);
}
.order-state .button-success{
        background-color: var(--color-main);
        color: #fff;
}


@media screen and (max-width: 490px){
    .order-state{padding: 18px;}
    .order-state .title{width: 100%;font-size: 20px;}
    .order-state .text{width: 100%;font-size: 14px;text-align: left;}
}
/*  ========== END SUCESS ORDER STYLES  ==========  */

.checkout .title{
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: 20px;
}
.checkout .title::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #eaeaea;
    display: block;
}
.checkout .title span{
    position: relative;
    background-color: #fff;
    padding-right: 22px;
    box-sizing: border-box;
    z-index: 1;
}
.checkout .wrap{
    display: flex;
    flex-direction: column;
    align-items: start;
}

.input-group{
    display: grid;
    grid-auto-columns: 1fr;
    gap: 10px;
}
.input-group.grid-col-2{grid-template-columns: 1fr 1fr;}
.input-group.grid-col-3{grid-template-columns: 1fr 1fr 1fr;}

@media screen and (max-width: 780px){
    .input-group.grid-col-3{grid-template-columns: 1fr;}
}

.loading-maps {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-weight: 600;
    letter-spacing: .5px;
}
.loading-maps i {
    display: flex;
    align-items: center;
    margin-right: 10px;
    animation: spin infinite 1.5s;
}
@keyframes spin {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
.check-list{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.check-list .list{
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14px;
    font-weight: 400;
}
.check-list .list li{
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
}
.check-list .list i{
    width: 25px;
    text-align: center;
    margin-right: 5px;
}
.check-list .preprice{
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
}
.check-list .preprice .price{
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--color-main);
}
.check-list .totalprice{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 600;
}
.check-list .totalprice .price{
    display: flex;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
    color: var(--color-main);
}
.check-list .do-order{
    padding: 12px 22px;
    box-sizing: border-box;
    color: #FFF;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    border: none;
    border-radius: 4px;
    background-color: var(--color-main);
    cursor: pointer;
    text-decoration: none;
    letter-spacing: .9px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check-list .do-order:hover{opacity: .85;}


.radio-wrap {
    float: left;
    background-color: #f1f3f6;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 4px;
	display: flex;
    flex-wrap: wrap;
    gap: 5px;
    overflow: hidden;
}
.radio-wrap input[type=radio] {display: none;}
.radio-wrap label {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
	cursor: pointer;
	padding: 10px 15px;
    box-sizing: border-box;
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
.checkbox-wrap{
    padding-top: 15px;
    display: flex;
    align-items: center;
} /* Save my data - Checkbox */
.checkbox-wrap .checkmark{
	float: left;
	width: 20px;
	height: 20px;
	border-radius: 2px;
	background-color: var(--color-main-alpha);
	box-sizing: border-box;
	line-height: 1.6;
	text-align: center;
	cursor: pointer;
	margin-right: 10px;
	border: 1px solid var(--color-main);
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

.delivery-radio{
    padding: 0;
    margin-top: 12px;
    background-color: #fff;
}
.delivery-radio label::before{
    position: absolute;
    top: 15px;
    left: 15px;
}
.delivery-radio label{
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    position: relative;
    padding-right: 70px;
    box-sizing: border-box;
}
.delivery-radio label span.text{
    font-weight: 600;
    color: #131313;
    padding-left: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
}
.delivery-radio label span.desc{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: var(--color-text-gray);
}
.delivery-radio label .price{
    padding-top: 4px;
    font-weight: 600;
    font-size: 18px;
    color: var(--color-black);
    height: 20px;
}
.delivery-radio .price.loading {
    background-color: #ffffff;
    border-radius: 10px;
    background: linear-gradient(270deg, #cccccc, #e9e9e9, #cccccc);
    background-size: 400% 400%;

    animation: flicker-loading 2s infinite !important;
}
.delivery-radio .price.active .t-sym {
    visibility: visible;
}
.delivery-radio .price .t-sym {
    margin-left: 5px;
    color: #767676;
    visibility: hidden;
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
    background: url("../assets/bycicle.svg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.delivery-radio label .icon.i2{
    background: url("../assets/delivery-truck.svg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.alert-box{
    width: 100%;
    margin-top: 10px;
    color: var(--color-text-gray);
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
}
.alert-box .alert-text{
    padding-bottom: 8px;
    color: var(--color-text-gray);
    font-size: 12px;
}
.alert-box .alert-text i{
    margin-right: 15px;
    color: var(--color-text-gray);
    font-size: 12px;
}

.alert-box .alert-text a{color: #6faee5 !important;}

.in-pharmacy{
    display: flex;
    flex-direction: column;
}
.in-pharmacy .item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 6px;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: 1px solid var(--color-border);
}
.in-pharmacy .group{
    display: flex;
    flex-direction: column;
}
.in-pharmacy .name{
    font-weight: 600;
}
.in-pharmacy .schedue{font-size: 12px;}

.in-pharmacy .inp-price{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-primary);
    font-weight: 600;
}
.in-pharmacy .inp-price .t-sym{
    font-size: 14px;
    color: var(--color-text-gray);
    margin-left: 5px;
    font-weight: 400;
}


@media screen and (max-width: 590px){
    .radio-wrap{
        display: grid;
        grid-template-columns: 1fr;
        width: 100%;
    }
}

.text{
    color: var(--color-text-gray);
    padding-bottom: 12px;
}

   /*  ==========  MODAL STYLES  ==========  */
    .fullscreen {
        /* position: fixed; */
        width: 100%;
        min-height: 440px;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    .blackout {
        background: rgba(0 0 0 / 40%);
    }
    .modal {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 500px;
        min-height: 200px;
        height: max-content;
        background: #fff;
        border-radius: 22px;
        padding: 40px 25px;
        box-sizing: border-box;
        position: relative;
    }
    .modal .modal-icon{
        width: 50px;
        height: 50px;
    }
    .modal .modal-icon.password-key{
        background: url('../assets/security.svg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .modal .top {
        text-align: center;
        color: #000;
        font-weight: 600;
        font-size: 18px;
    }
    .modal .close{
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        padding: 10px;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        border-radius: 100px;
    }
    .modal .close i{color: #000}
    .modal .text{
        font-size: 14px;
        color: var(--color-text-gray);
        text-align: center;
        padding: 0;
    }
    .modal .create-account-form{
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 300px;
    }
    .modal .create-account-form input{font-weight: 600;}
    .modal .button{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-family: var(--font-primary);
    }
    .modal .button-success{
        background-color: var(--color-main);
        color: #fff;
    }
    .modal .button-cancel{background-color: #fff;}
    @media screen and (max-width: 440px){
        .modal .create-account-form{width: 100%;}
    }
    .errors {
        display: flex;
        flex-direction: column;
    }
    .errors .unit {
        display: flex;
        align-items: flex-start;
        color: var(--color-error);
        padding-bottom: 5px;
    }
    .errors .unit i{
        display: flex;
        align-items: center;
        height: 22px;
    }
    .miniloading {
        height: 30px;
        width: 100px;
        border-radius: 10px;
        background: linear-gradient(270deg, #a1a1a1, #dadada, #a1a1a1);
        background-size: 400% 400%;
        animation: flicker-loading 1s infinite;
        opacity: 0.3;
    }
    .pharmacy-chosen {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
        margin-top: 0px;
        color: #FFF;
        background: var(--color-main-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
    }
    .minilabel {
        font-size: 15px;
        font-weight: 600;
        margin-top: 15px;
    }
    .note {
        color: #8d8d8d;
        margin-top: 20px;
        font-size: 13px;
    }
/*  ==========  END MODAL STYLES  ==========  */
</style>