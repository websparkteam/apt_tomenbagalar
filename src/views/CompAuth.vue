<template>
    <div class="fullscreen blackout">
        <div class="modal">
            <span class="close" @click="$parent.modal = false"><i class="fa-solid fa-xmark"></i></span>
            <div class="top">Авторизация</div>
            <div id="auth">
                <template v-if="hideSkip">
                <div class="unsign-continue">
                    <div class="title">Продолжить без регистрации</div>
                    <div class="text" style="padding: 0;">Отлично подходит для одноразовых заказов</div>
                    <router-link to="/cart/checkout" class="order-button ob-2">Продолжить без регистрации</router-link>
                </div>
                <div class="split"><span>или</span></div>
                </template>
                <div class="form" v-if="signup===false">
                    <div class="auth-title">Войти</div>
                    <div class="text">Авторизуйтесь для получения персональных <span>скидок и уникальных предложений</span></div>
                    <div class="input-group">
                        <input type="text" v-maska="'+7 (###) ### ##-##'" placeholder="+7 (___) ___-____" autocomplete="phone" v-model="number">
                    </div>
                    <div class="input-group">
                        <input type="password" placeholder="Пароль" autocomplete="off" v-model="pin" @keydown.enter="auth(false)">
                    </div>
                    <div class="alert-area" v-if="error">
                        <span>{{error}}</span>
                    </div>
                    <button @click="auth(false)">Войти</button>
                    
                    <div class="switch-wrap">
                        <span class="switch" @click="signup=true">Еще нет аккаунта? Регистрация</span>
                    </div>
                </div>
                <div class="form" v-else>
                    <div class="auth-title">Регистрация</div>
                    <div class="text">Следуя инструкциям пройдите несложную процедуру регистрации</div>
                    <div class="input-group">
                        <input type="text" v-maska="'+7 (###) ### ##-##'" placeholder="+7 (___) ___-____" autocomplete="phone" v-model="number">
                    </div>
                    <div class="input-group">
                        <input type="text" placeholder="Имя и фамилия" autocomplete="name" v-model="fio">
                    </div>
                    <div class="input-group">
                        <input type="password" placeholder="Пароль" autocomplete="off" v-model="pin" @keydown.enter="auth(false)">
                    </div>
                    <div class="alert-area" v-if="error">
                        <span>{{error}}</span>
                    </div>
                    <button @click="auth(false)">Регистрация</button>
                    <div class="switch-wrap">
                        <span class="switch" @click="signup=false">Уже имеется аккаунт? Войти</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core';
export default {
    props: ['hideSkip'],
    data() {
        return {
            ready: false,
            serverQuery: Function,
            landyshTools: Object,
            RAMtools: Object,
            error: '',
            loading: false,
            number: '7',
            fio: '',
            pin: '',
            resetPINstep: 0,
            oldPIN: '',
            signup: true,
            resetPIN: false
        }
    },
    mounted() {
        this.serverQuery = inject('serverQuery');
        this.landyshTools = inject('landyshTools');
        this.RAMtools = inject('RAM');
        this.ready = true;
    },
    methods: {
        async auth(auth) {
            console.log(this.full);
            if (!this.full) {
                return;
            }
            let authData = {phone: this.number, pin: this.pin, fullname: this.fio};

            // Сброс ПИН кода
            if (this.resetPIN === true) {
                if (this.resetPINstep == 0) {
                    this.loading = true;
                    let state = (await this.serverQuery('userSignin', authData));
                    this.loading = false;
                    if (!state.status) {
                        this.error = state.data.message;
                        return;
                    }
                    this.resetPINstep = 1;
                    this.error = '';
                    this.oldPIN = authData.pin;
                    this.pin = '';
                    return;
                }
                // New PIN
                if (this.resetPINstep == 1) {
                    this.loading = true;
                    let state = (await this.serverQuery('userResetPIN', {...authData, oldPIN: this.oldPIN}));
                    this.loading = false;
                    if (!state.status) {
                        this.error = state.data.message;
                        return;
                    }
                    this.landyshTools.setClient(state.data.message);
                    this.$parent.modal = false;
                    localStorage.setItem('landyshAuth', JSON.stringify(authData));
                    return;
                }
                return;
            }
            // Регистрация
            if (this.signup && !auth) {
                this.loading = true;
                let state = (await this.serverQuery('userSignup', authData));
                console.log('signup state', state);
                if (!state.status) {
                    if (!auth) {
                        this.error = state.data.message;
                    }
                    this.loading = false;
                }
                this.auth(true);
            }
            if (!this.signup || auth) {
                this.loading = true;
                let state = (await this.serverQuery('userSignin', authData));
                this.loading = false;
                if (!state.status) {
                    this.error = state.data.message;
                    return;
                }
                this.landyshTools.setClient(state.data.message);
                this.$parent.modal = false;

                localStorage.setItem('landyshAuth', JSON.stringify(authData));

                this.$router.push({path: '/cart/checkout'});
                console.log('AUTH SUCCESS this.RAMtools.client', this.RAMtools.client);
            }
        },
    },
    computed: {
        full() {
            return this.pin.length > 0 && this.number.length > 0;
        }
    }
}
</script>

<style scoped>
    .modalloading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.367);
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
/*  ==========  END MODAL STYLES  ==========  */
</style>