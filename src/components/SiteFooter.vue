<template>
    <section id="help" class="flex-centered">
        <div class="container">
            <div class="icon"><img src="../assets/cart.png"></div>
            <div class="group">
                <div class="text">Советник поможет найти нужные вам товары поможет найти наличие в ближайшей аптеке. Позвоните нам !</div>
                <a href="tel:+7 (707) 800-0000" class="number">+7 (700) 088-0453</a>
            </div>
        </div>
    </section>
    <footer class="flex-centered">
        <div class="container">
            <div class="link-tree">
                <div class="contacts">
                    <a href="https://www.instagram.com/apteka_nizkihtsen/" target="_blank"><i class="fa-brands fa-instagram"></i>apteka_nizkihtsen</a>
                    <a href="tel:+7 (707) 800-0000"><i class="fa-solid fa-phone"></i>+7 (700) 088-0453</a>
                    <a href="mailto:info@tomenbagalar.kz"><i class="fa-regular fa-envelope"></i>info@tomenbagalar.kz</a>
                </div>
                <div class="group">
                    <div class="header">Информация</div>
                    <router-link to="/information/about" class="link">О Нас</router-link>
                    <router-link to="/information/pharmacy" class="link">Аптеки</router-link>
                    <router-link to="/information/contacts" class="link">Контакты</router-link>
                    <router-link to="/information/career" class="link">Вакансии</router-link>
                </div>
                <div class="group">
                    <div class="header">Покупателям</div>
                    <router-link to="/profile" class="link">Личный кабинет</router-link>
                    <router-link to="/information/howtomakeorder" class="link">Как сделать заказ</router-link>
                    <router-link to="/information/payment" class="link">Способы оплаты</router-link>
                    <router-link to="/information/delivery" class="link">Доставка</router-link>
                    <router-link to="/information/moneyback" class="link">Возврат товара</router-link>
                </div>
                <div class="group">
                    <div class="header">Документы</div>
                    <router-link to="/information/politics" class="link">Политика Конфиденциальности</router-link>
                    <router-link to="/information/publicterms" class="link">Договор оферты</router-link>
                    <router-link to="/information/license" class="link">Лицензия</router-link>
                </div>
            </div>
        </div>
    </footer>
    <div id="theend" class="flex-centered">
        <div class="container">
            <span class="copyright">2022 © Интернет-аптека <span style="color: #fff;">«Аптека Низких Цен»</span>. Все права защищены.</span>
            <span class="develop">Сделано: <a href="https://webspark.kz/" target="_blank">webspark.kz</a></span>
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
.container{max-width: 1400px;padding: 0 10px; box-sizing: border-box;}

/* ===== HELP STYLES ===== */
#help{
    margin-top: 50px;
    border-radius: 4px;
    background-color: #fff;
    padding: 32px 0;
}
#help .container{
    display: flex;
    gap: 15px;
}
#help .icon{
    width: 36px;
    height: 36px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: rgb(255,80,113,.3);
}
#help .group{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
}
#help .text{
    font-weight: 500;
    color: var(--color-text-secondary);
}
#help .number{
    font-size: 18px;
    font-weight: 600;
} 
/* ===== END HELP STYLES ===== */





/* ===== FOOTER STYLES ===== */
footer{
    padding: 50px 0;
    background-color: #1b2027;
    color: #fff;
}
footer .contacts{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 24px;
    box-sizing: border-box;
}
footer .contacts a{
    margin-top: 7px;
    width: 240px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    box-sizing: border-box;
    border: 1px solid #303841;
    border-radius: 4px;
    color: #fff;
}
footer .contacts a i{color: #fff;}
footer .link-tree{
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
}
footer .link-tree .group{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 24px;
    box-sizing: border-box;
    border-left: 1px solid #303841;
}
footer .group .header{
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    padding-bottom: 10px;
}
footer .group a{
    color: var(--color-text-secondary);
}
footer .logo{
    width: 50px;
}
#theend {
    padding: 18px 0;
    background-color: #1b2027;
    border-top: 1px solid #303841;
}
#theend .container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
}
#theend span{color: #92999f;}
#theend a{color: var(--color-blue-link);}
@media screen and (max-width: 1024px){
    footer .link-tree{grid-template-columns: 1fr 1fr 1fr;}
}
@media screen and (max-width: 767px){
    footer .link-tree{grid-template-columns: 1fr; gap: 16px}
    footer .contacts{padding: 0;}
    footer .contacts a{width: 100%;}
}
/* ===== END FOOTER STYLES ===== */
</style>