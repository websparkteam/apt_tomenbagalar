<template>
    <SiteHeader />

    <div id="content">
        <router-view :key="$route.fullPath"/>
    </div>

    <SiteFooter />
</template>

<script>
import './assets/fonts/FontAwesome/stylesheet.css'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
    name: 'App',
    components: {
        SiteHeader,
        SiteFooter
    }
}
</script>

<style>
/* FONTS - Inter, Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Play:wght@400;700&display=swap');


/*  ==========  #INFO  ==========  */

/* Ipad, laptop Devices < 1024px */
/* Tablet Devices < 767px */
/* Mobile Devices < 480px */
/* MINI Devices < 420px */

/*  ==========  END #INFO  ==========  */

*{
    --color-main: rgb(90,191,112);
    --color-main-alpha: rgb(90,191,112,.3);
    --color-secondary: rgb(255,103,70);
    --color-text-secondary: #919399;
    --color-border: rgba(0, 0, 0, .12);
    --color-border-6: rgba(0, 0, 0, .06);
    --color-blue-link: #6faee5;
    --color-black: #2c3e50;
    --color-error: rgb(244, 78, 78);
    --color-error-alpha: rgb(244, 78, 78,.1);
    
    --box-shadow: 0 0 20px rgb(95 125 149 / 12%);

    --font-primary: 'Inter', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;

    margin: 0;
    padding: 0;
    color: #2c3e50;
}
html{scroll-behavior: smooth;}
body{background-color: #f9f9f9; font-family: var(--font-primary);}
input {outline: none;}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
::-webkit-scrollbar {width: 8px;}
::-webkit-scrollbar-track {background-color: #eaeaea;}
::-webkit-scrollbar-thumb {background-color: #cecece; border-radius: 10px;}

img{max-width: 100%;}
a{text-decoration: none;}
a:hover{color: var(--color-main) !important;}

.flex-centered{width: 100%;display: flex;justify-content: center;align-items: center;}
.flex-column{display: flex;flex-direction: column;}
.page{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--color-border-6);
}

.path{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 20px;
}
.path .pathlink{
    display: flex;
    color: #7a7b7d;
    font-weight: 500;
    font-size: 14px;
}
.path a.pathlink{color: #000;}
.path .pathlink::after{
    content: '\f105';
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-family: 'Font Awesome 6 Free';
    font-weight: 600;
    font-size: 11px;
}
.path .pathlink:last-child::after{display: none;}

.pad-16{padding: 16px 0;}
.pad-32{padding: 32px 0;}
.pad-top-16{padding-top: 16px;}
.pad-top-32{padding-top: 32px;}
.pad-bottom-16{padding-bottom: 16px;}
.pad-bottom-32{padding-bottom: 32px;}

.page-header{
    width: 100%;
    color: #131313;
    font-size: 22px;
    font-family: var(--font-secondary);
}
.sub-header{
    width: 100%;
    color: var(--color-text-secondary);
    font-size: 15px;
}

.container{
    width: 100%;
    max-width: 1220px;
}

.quantity-cart{
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #f6f7f8;
    border: 1px solid rgb(90,191,112,.1);
}
.quantity-cart button {
    width: 39px;
    height: 39px;
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    color: var(--color-black);
    cursor: pointer;
    outline: none;
    font-weight: 600;
}

.quantity-cart .number{
    flex: 1;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: transparent;
    font-size: 16px;
    font-weight: 700;
    color: #131313;
}
@media screen and (max-width: 1220px){
    .container{
        padding: 0 10px;
        box-sizing: border-box;
    }
}
@media screen and (max-width: 480px){
    .adaptive-padding {padding: 0 0;}
}

.container-grid{
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 10px;
}

section{
    width: 100%;
}
</style>
