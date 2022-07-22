<template>
    <div class="flex-centered flex-column" v-if="ready">
        <div class="container">
            e
        </div>
        <div class="container container-grid">
            <div class="page left-menu">
                <div class="group">
                    <div class="title">Информация</div>
                    <router-link :class="{'item': true, 'active': mode=='about'}" to="/information/about">О Нас</router-link>
                    <router-link :class="{'item': true, 'active': mode=='contacts'}" to="/information/contacts">Контакты</router-link>
                    <router-link :class="{'item': true, 'active': mode=='pharmacy'}" to="/information/pharmacy">Аптеки</router-link>
                    <router-link :class="{'item': true, 'active': mode=='arenda'}" to="/information/arenda">Аренда</router-link>
                    <router-link :class="{'item': true, 'active': mode=='career'}" to="/information/career">Карьера</router-link>
                </div>
                <div class="group">
                    <div class="title">Покупателю</div>
                    <router-link :class="{'item': true, 'active': mode=='delivery'}" to="/information/delivery">Доставка</router-link>
                    <router-link :class="{'item': true, 'active': mode=='payment'}" to="/information/payment">Оплата</router-link>
                    <router-link :class="{'item': true, 'active': mode=='howtomakeorder'}" to="/information/howtomakeorder">Как сделать заказ</router-link>
                    <router-link :class="{'item': true, 'active': mode=='moneyback'}" to="/information/moneyback">Условия возврата</router-link>
                    <router-link :class="{'item': true, 'active': mode=='feedback'}" to="/information/feedback">Предложения/Жалобы</router-link>
                </div>
                <div class="group">
                    <div class="title">Документы</div>
                    <router-link :class="{'item': true, 'active': mode=='politics'}" to="/information/politics">Политика Конфиденциальности</router-link>
                    <router-link :class="{'item': true, 'active': mode=='publicterms'}" to="/information/publicterms">Договор публичной оферты</router-link>
                    <router-link :class="{'item': true, 'active': mode=='license'}" to="/information/license">Лицензия</router-link>
                </div>
            </div>
            <div id="information" class="page">
				<h2 class="page-header">{{getModeTitle()}}</h2>
                <div v-if="mode=='about'" class="landysh-document" v-html="about"></div>
                <div v-if="mode=='contacts'" class="landysh-document" v-html="contacts"></div>
                <div v-if="mode=='pharmacy'" class="landysh-document">
                    <div class="pharmacies">
                        <table class="pharmacy-list">
                            <thead>
                                <tr>
                                    <td>Адрес</td>
                                    <td>График</td>
                                    <td>Контактный номер</td>
                                    <td>Регион</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(i, ind) in pharmacies" :key="ind">
                                    <td class="strong">{{i.address}}</td>
                                    <td>{{i.time}}</td>
                                    <td>{{i.number}}</td>
                                    <td>{{i.region}}</td>
                                </tr>
                            </tbody>
                        </table>
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
                    <div class="row" style="display: flex; justify-content: center;"><img class="license" src="../assets/cart.png" style="width:80%;margin-top: 14px;" alt="license"></div>
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
#information p{
    padding-bottom: 12px;
}
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
#information .pharmacy-list{width: 100%;}
.pharmacy-list thead td{font-size: 14px;}
.pharmacy-list{
    border-top: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
}
.pharmacy-list td{
    border-right: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding: 12px;
    box-sizing: border-box;
}
.pharmacy-list .strong{
    font-weight: 600;
}
@media screen and (max-width: 690px){
    .pharmacy-list tr:first-child{display: none;}
    .pharmacy-list tr{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .pharmacy-list td:last-child{display: none;}
}
</style>
<style scoped>
h2.page-header{padding-bottom: 15px;}

.container-grid{
    display: grid;
    grid-template-columns: 320px 1fr ;
    align-items: start;
    gap: 15px;
}
@media screen and (max-width: 940px){
    .container-grid{
        display: flex;
        flex-direction: column;
    }
}

.left-menu{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.left-menu .group{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8px;
}
.left-menu .title{
    font-weight: 600;
    padding-bottom: 8px;
    font-size: 18px;
    color: #2c3e50;
}
.left-menu .item{cursor: pointer;}
.left-menu .item:hover{color: #000;}
.left-menu .item.active,
.left-menu .item.active:hover
{color: var(--color-main); font-weight: 600;}


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