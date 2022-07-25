<template>
    <div class="flex-centered" v-if="ready">
        <div class="container container-grid adaptive-padding">
            <div class="sidebar">
                <div class="group">
                    <div class="title"><i class="fa-regular fa-bookmark"></i>Информация</div>
                    <router-link :class="{'item': true, 'active': mode=='about'}" to="/information/about">О Нас</router-link>
                    <router-link :class="{'item': true, 'active': mode=='contacts'}" to="/information/contacts">Контакты</router-link>
                    <router-link :class="{'item': true, 'active': mode=='pharmacy'}" to="/information/pharmacy">Аптеки</router-link>
                    <router-link :class="{'item': true, 'active': mode=='arenda'}" to="/information/arenda">Аренда</router-link>
                    <router-link :class="{'item': true, 'active': mode=='career'}" to="/information/career">Карьера</router-link>
                </div>
                <div class="group">
                    <div class="title"><i class="fa-solid fa-store"></i>Покупателю</div>
                    <router-link :class="{'item': true, 'active': mode=='delivery'}" to="/information/delivery">Доставка</router-link>
                    <router-link :class="{'item': true, 'active': mode=='payment'}" to="/information/payment">Оплата</router-link>
                    <router-link :class="{'item': true, 'active': mode=='howtomakeorder'}" to="/information/howtomakeorder">Как сделать заказ</router-link>
                    <router-link :class="{'item': true, 'active': mode=='moneyback'}" to="/information/moneyback">Условия возврата</router-link>
                    <router-link :class="{'item': true, 'active': mode=='feedback'}" to="/information/feedback">Предложения/Жалобы</router-link>
                </div>
                <div class="group">
                    <div class="title"><i class="fa-regular fa-file"></i> Документы</div>
                    <router-link :class="{'item': true, 'active': mode=='politics'}" to="/information/politics">Политика Конфиденциальности</router-link>
                    <router-link :class="{'item': true, 'active': mode=='publicterms'}" to="/information/publicterms">Договор публичной оферты</router-link>
                    <router-link :class="{'item': true, 'active': mode=='license'}" to="/information/license">Лицензия</router-link>
                </div>
            </div>
            <div id="information">
                <div class="path">
                    <router-link class="pathlink" to="/">Главная</router-link>
                    <span class="pathlink">Информация</span>
                    <span class="pathlink">{{getModeTitle()}}</span>
                </div>
				<h2 class="page-header">{{getModeTitle()}}</h2>
                <div v-if="mode=='about'" class="landysh-document" v-html="about"></div>
                <div v-if="mode=='contacts'" class="landysh-document" v-html="contacts"></div>
                <div v-if="mode=='pharmacy'" class="landysh-document">
                    <div class="pharmacy-list">
                        <div class="item" v-for="(i, ind) in pharmacies" :key="ind">
                            <span class="title">{{i.address}}</span>
                            <span class="text">{{i.region}} <br> {{i.time}}</span>
                            <span class="number">{{i.number}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="mode=='arenda'" class="landysh-document" v-html="arenda"></div>
                <div v-if="mode=='career'" class="landysh-document" v-html="career"></div>
                
                <div v-if="mode=='delivery'" class="landysh-document" v-html="delivery"></div>
                <div v-if="mode=='howtomakeorder'" class="landysh-document" v-html="howtomakeorder"></div>
                <div v-if="mode=='payment'" class="landysh-document" v-html="payment"></div>
                <div v-if="mode=='moneyback'" class="landysh-document" v-html="moneyback"></div>
                <div v-if="mode=='feedback'" class="landysh-document" v-html="feedback"></div>
                
                <div v-if="mode=='politics'" class="landysh-document" v-html="politics"></div>
                <div v-if="mode=='publicterms'" class="landysh-document" v-html="publicterms"></div>
                <div v-if="mode=='license'" class="landysh-document">
                    <div class="row" style="display: flex; justify-content: center;"><img class="license" src="../assets/licence.jpg" style="width:80%;margin-top: 14px;" alt="license"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue';
import about from '../assets/documents/about';
import contacts from '../assets/documents/contacts';
import arenda from '../assets/documents/arenda';
import career from '../assets/documents/career';
import delivery from '../assets/documents/delivery';
import howtomakeorder from '../assets/documents/howtomakeorder';
import moneyback from '../assets/documents/moneyback';
import payment from '../assets/documents/payment';
import feedback from '../assets/documents/feedback';
import politics from '../assets/documents/politics';
import publicterms from '../assets/documents/publicterms';
import pharmacies from '../assets/documents/pharmacies';
export default {
    data() {
        return {
            ready: false,
            serverQuery: Function,
            inputs: {},
            mode: this.$route.params.mode,
            about,
            contacts,
            arenda,
            career,
            politics,
            delivery,
            howtomakeorder,
            moneyback,
            feedback,
            payment,
            publicterms,
            pharmacies,
            textarea: '',
            customerName: '',
            phoneNumber: '',
            success: false
        }
    },
    mounted() {
        this.inputs = inject('inputs');
        this.serverQuery = inject('serverQuery');
        this.ready = true;
        window.scrollTo(0, 0);
    },
    methods: {
        getModeTitle() {
            switch(this.mode) {
                case 'about': return 'О Нас';
                case 'contacts': return 'Контакты';
                case 'pharmacy': return 'Аптеки';
                case 'arenda': return 'Аренда';
                case 'career': return 'Карьера';
                
                case 'delivery': return 'Условия доставки';
                case 'payment': return 'Оплата';
                case 'howtomakeorder': return 'Как сделать заказ';
                case 'moneyback': return 'Условия по возврату';
                case 'feedback': return 'Предложения/Жалобы';
                
                case 'politics': return 'Политика конфиденциальности';
                case 'publicterms': return 'Публичный договор-оферта о предоставлении услуг (публичная оферта)';
                case 'license': return 'Лицензия';

                default: return '';
            }
        }
    },
    watch: {
        mode() {
            this.textarea = '';
            this.success = false;
        }
    }
}
</script>

<style>
#information p{padding-bottom: 12px;}
#information b{
    color: #101010;
    font-weight: 600;
}
#information a{
	color: var(--color-blue-link);
	text-decoration: none;
}
#information a:hover{color: var(--color-main);}
#information ul{
    margin-bottom: 12px;
    padding-left: 20px;
    box-sizing: border-box;
}
</style>
<style scoped>
h2.page-header{padding-bottom: 16px;}

.container-grid{
    display: grid;
    grid-template-columns: 320px 1fr ;
    align-items: start;
}
@media screen and (max-width: 940px){
    .container-grid{
        display: flex;
        flex-direction: column;
    }
}

.sidebar{
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 40px;
}
.sidebar .group{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.sidebar .title{
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    padding-bottom: 12px;
    font-size: 16px;
    color: #1c2025;
    text-transform: uppercase;
    font-family: var(--font-secondary);
}
.sidebar .title i{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: var(--box-shadow);
    font-size: 14px;
}
.sidebar .item{
    color: #8688a0;
    font-weight: 500;
    margin-left: 14px;
    padding: 12px;
    padding-left: 24px;
    box-sizing: border-box;
    border-left: 2px solid #bcc0c9;
}
.sidebar .item.active{
    font-weight: 600;
    color: #1c2025 !important;
    border-color: var(--color-main);
    background-color: #fff;
}

#information{
    width: 100%;
    height: calc(100% + 50px);
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border-left: 1px solid var(--color-border);
}

.pharmacy-list{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
}
.pharmacy-list .item{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: var(--box-shadow);
    border: 1px solid var(--color-border)
}
.pharmacy-list .title{
    font-size: 18px;
    font-weight: 600;
    color: #131313;
}
.pharmacy-list .text{
    display: flex;
    font-display: inherit;
    font-size: 14px;
}
.pharmacy-list .number{
    font-weight: 600;
}

@media screen and (max-width: 940px){
    .sidebar{
        display: none;
    }
    #information{
        margin-top: 20px;
        height: unset;
        border: none;
        box-shadow: var(--box-shadow);
        border-radius: 10px;
    }
    .path{padding-top: 0;}
    .pharmacy-list{
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width: 480px){
    .pharmacy-list{
        grid-template-columns: 1fr;
    }
}


.form{
    float: left;
    display: flex;
    flex-direction: column;
}    
.form .wrapper{
    position: relative;
}
.form input, .form textarea{
    float: left;
    width: 100%;
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    margin: 10px 0;
    outline: none;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
}
.form input{padding-left: 40px;}
textarea{resize: none;}
.form input:focus, .form textarea:focus{border-color: var(--color-main);background: #E8F0FE;}

.form .icon{
    position: absolute;
    top: 49px;
    left: 15px;
    color: #aaa;
}
.form button{
    float: left;
    width: 100%;
    margin-top: 20px;
    text-align: center;
    border-radius: 2px;
    background-color: var(--color-main);
    padding: 10px 0;
    box-sizing: border-box;
    color: #FFF;
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    border: none !important;
}


.myorders-list {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 15px;
}
.myorders-list .unit {
    width: 100%;
    height: max-content;
    background-color: #fafafa;
    box-shadow: 0 0 10px rgba(0,0,0, 0.2);
    padding: 10px 20px 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
.unit .unit-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.unit .unit-line {
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    margin: 0 0 10px 0;
}
.unit-row span {
    display: flex;
    align-items: center;
}
.unit-row i {
    display: flex;
    align-items: center;
}
.unit .maright {
    margin-right: 10px;
}
.unit .maleft {
    margin-left: 10px;
}
.unitcart-list {
    display: flex;
    flex-direction: column;
}
.unitcart-list span {
    border-bottom: 1px dashed #e9e9e9;
}
.showmoreunits {
    color: var(--color-main);
    font-weight: bold;
    cursor: pointer;
}
.row {
    float: left;
    width: 100%;
}
.left-bar .top{
    padding: 8px 20px;
    box-sizing: border-box;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
}
.main {
    padding: 20px;
    background: #fff;
    border-radius: 3px;
}
.user{
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    text-align: center;
    grid-gap: 10px;
    padding: 15px;
}
.image{
    display: flex;
    justify-content: center;
}
.name{
    font-weight: 600;
    color: #000;
}
.page_title{
    float: left;
    width: 100%;
}
.page_title h1{
    float: left;
    width: 100%;
    margin: 0;
    font-size: 28px;
    padding-bottom: 5px;
}
.page_title span{color: #708086; font-size: 14px;}
.line{
    float: left;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 12px 0;
}
.line input{
    float: left;
    width: 100%;
    border: 2px solid #ddd;
    border-radius: 100px;
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 10px 0;
    outline: none;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
}
.line select{
    float: left;
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0;
    border: 2px solid #ddd;
    border-radius: 100px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
}
.edit{
    cursor: pointer;
    font-weight: 700;
    color: var(--color-main);
    display: flex;
    justify-content: center;
}
.save-button{
    padding: 8px 22px;
    border-radius: 100px;
    border: 1px solid var(--color-main);
    color: var(--color-main);
    background: transparent;
    margin-top: 25px;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: 'Open Sans';
}
.save-button:hover{
    color: #fff;
    background: var(--color-main);
}
@media screen and (max-width: 890px) {
    .ac {
        display: flex;
        flex-direction: column;
    }
    .ac .main{order: 1;}
    .ac .left-bar{order: 2;}
    .line{
        display: grid;
        grid-template-columns: 1fr;
    }
    .edit{
        padding: 5px 0;
    }
    .mobilebox {
        margin: 10px 0;
    }
}
</style>