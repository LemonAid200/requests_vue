<template>
    <div class="registration">
        <div class="registration_modal">
            <div class="registration__title">Авторизация</div>

            <form @submit.stop.prevent="authenticate">
                <CustomInput v-model="login"    :label="'Логин или телефон'" :type="'tel'" :inputType="'tel'" />
                <CustomInput v-model="password" :type="'password'"
                    :inputType="isPasswordHidden ? passwordStates.hidden : passwordStates.notHidden"
                    :placeholder="'Пароль'" @toggle="togglePasswordVisibility" />
                <button class="registration_modal__btn--submit">Войти</button>
            </form> 
        </div>
    </div>
</template>
<script>
import CustomInput from '@/components/CustomInput.vue';
import { mapActions } from 'vuex'


export default {
    components: {
        CustomInput
    },

    data() {
        return {
            login: '+7',
            password: '',
            isPasswordHidden: true,
            passwordStates: {
                hidden: 'password',
                notHidden: 'text'
            }
        }
    },
    methods: {
        ...mapActions({
            auth: 'auth/auth'
        }),
        togglePasswordVisibility(){
            this.isPasswordHidden = !this.isPasswordHidden
        },
        authenticate(){            
            this.auth({login: this.login.replace(/\D/g, ''), password: this.password})
        }
    },


}
</script>
<style lang="scss">

.registration {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../public/img/background.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    font-family: "Roboto", sans-serif;

    .registration_modal {
        width: 340px;
        height: 290px;
        border-radius: 5px;
        background: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 52px 20px 20px 20px;
        position: relative;
        box-sizing: border-box;

        .registration__title{
            border-radius: 5px;
            width: 308px;
            height: 56px;
            color: rgb(255, 255, 255);
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            background: rgb(68, 162, 72);
            align-content: center;
            text-align: center;
            margin: 0 auto;
            position: absolute;
            top: -19px;
            font-family: "Inter", sans-serif;
        }

        form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            width: 100%;
            margin-top: 34px;




            .registration_modal__btn--submit{
                border-radius: 4px;
                border: none;
                box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
                background: rgb(80, 176, 83);
                width: 110px;
                height: 36px;
                color: rgb(255, 255, 255);
                font-size: 14px;
                margin-top: 18px;
            }
        }
    }
}    
</style>