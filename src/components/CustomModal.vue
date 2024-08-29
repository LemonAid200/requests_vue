<template>
    <div class="modal_wrapper" @click="$emit('closeModal')">
        <div class="modal_body" @click.stop="">
            <div class="modal_body__top">
                <span class="modal_body__top__title">{{ title }}</span>
                <span class="modal_body__top__status">{{ status }}</span>
            </div>
            <form action="">
                <CustomSelect :labelIndent="0" v-model="address"
                    :options="addressNames"
                    :label="address ? 'Дом' : ' '"
                    :placeholder="'Дом'"  :rightIcon="'./icons/arrow-down.svg'" />
                <CustomSelect :labelIndent="0" v-model="apartment_label"
                    :options="apartmentsList"
                    :label="apartment_label ? 'Квартира' : ' '"
                    :placeholder="'Квартира'"  :rightIcon="'./icons/arrow-down.svg'" />
                <CustomInput  :labelIndent="0" v-model="due_date"        
                    :label="due_date ? 'Срок' : ' '"
                    :placeholder="'Срок'" class="item-3"/>
                <CustomInput  :labelIndent="0" v-model="last_name"       
                    :label="last_name ? 'Фамилия' : ' '"
                    :placeholder="'Фамилия'"/>
                <CustomInput  :labelIndent="0" v-model="first_name"       
                    :label="first_name ? 'Имя' : ' '"
                    :placeholder="'Имя'"/>
                <CustomInput  :labelIndent="0" v-model="patronymic_name" 
                    :label="patronymic_name ? 'Отчество' : ' '"
                    :placeholder="'Отчество'"/>
                <CustomInput  :labelIndent="0" v-model="username"        
                    :label="username ? 'Телефон' : ' '"
                    :placeholder="'Телефон'"/>
                <label for="">{{ description ? 'Описание заявки' : ' '}}</label>
                <textarea :labelIndent="0" v-model="description" placeholder="Описание заявки" rows="4" ></textarea>
            </form>
            <div class="modal_body__bottom">
                <button @click="postRequest();">{{ this.requestToPatch.number ? 'Сохранить' : 'Создать'}}</button>
            </div>
        </div>        
    </div>
</template>
<script>
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';
import { mapActions } from 'vuex'
require('any-date-parser');



export default {
    name: 'CustomModal',
    data() {
        return {
            address: '',
            apartment_label: '',
            due_date: '',
            last_name: '',
            first_name: '',
            patronymic_name: '',
            username: '', // phone number
            description: '',
            status_id: 1,
            adressesList: { '...': '...' },
            apartmentsList: [4,5]
        }
    },
    props: {
        requestId: {
            type: Number || String,
        },
        date: {
            type: String,
        },
        requestToPatch: {
            type: Object,
            required: false
        }
    },

    components: {
        CustomInput,
        CustomSelect
    },
    methods: {
        ...mapActions({
            post: 'requests/pushNewRequest',
            patch: 'requests/patchRequest',
            getAdresses: 'requests/getAdresses',
            getApartments: 'requests/getApartments'

        }),

        async updateAutocompleteList(){
            this.adressesList = await this.getAdresses({address: this.address?.split(',')[0] || ''})
            this.apartmentsList = await this.getApartments({premise_id: this.adressesList[this.address]})
            if (this.apartmentsList && !this.apartmentsList?.includes(this.apartment_label)){
                this.apartment_label = ''
            }
        },

        async postRequest(){
            const due_date = Date.fromString(this.due_date)

            if (this.requestToPatch.number){
                await this.patch({
                    appeal_id: this.requestToPatch.id,
                    premise_id: this.adressesList[this.address],
                    apartment_id: this.apartment_label,
                    due_date: due_date,
                    last_name: this.last_name,
                    first_name: this.first_name,
                    patronymic_name: this.patronymic_name,
                    username: this.username,
                    description: this.description,
                    status_id: this.status_id === 1 ? 4 : this.requestToPatch.status.id
                })
            } else {
                await this.post({
                            premise_id: this.adressesList[this.address],
                            apartment_id: this.apartment_label,
                            due_date: due_date,
                            last_name: this.last_name,
                            first_name: this.first_name,
                            patronymic_name: this.patronymic_name,
                            username: this.username,
                            description: this.description,
                            status_id: 1
                        })
                    }
            this.$emit('postSucsessful')
            this.$emit('closeModal')
        },
        formatDate(dateString){
            const date = new Date(dateString);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}.${month}.${year}`
        }
    },
    computed: {
        status(){
            return this.requestToPatch?.status?.name || 'Новая'
        },
        addressNames(){
            return Object.keys(this.adressesList)
        },
        title(){
            if (this.requestToPatch?.number) {
                let date = this.formatDate(this.requestToPatch.created_at)
                return `Заявка № ${this.requestToPatch.number} от (${date})`
            }
            return 'Создание заявки'
        }
    },
    watch: {
        address: 'updateAutocompleteList'
    },
    mounted() {
        if (this.requestToPatch?.number) {
            this.address = this.requestToPatch?.premise?.address
            this.apartment_label = this.requestToPatch.apartment?.number
            this.due_date = this.formatDate(this.requestToPatch.due_date)

            this.last_name = this.requestToPatch.applicant?.last_name
            this.first_name = this.requestToPatch.applicant?.first_name
            this.patronymic_name = this.requestToPatch.applicant?.patronymic_name
            this.username = this.requestToPatch.applicant.username
            this.description = this.requestToPatch.description
            this.status_id = this.requestToPatch.status.id
        }
        this.updateAutocompleteList()
    }
    
}
</script>
<style scoped lang="scss">
.modal_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.418);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal_body {
        background: white;
        width: 738px;
        padding: 24px 32px 24px 32px;
        gap: 24px;
        border-radius: 8px;
        
        .modal_body__top {
            display: flex;
            justify-content: space-between;

            .modal_body__top__title {
                font-family: Roboto;
                font-size: 16px;
                font-weight: 500;
                line-height: 24px;

            }
            .modal_body__top__status {
                font-family: Inter;
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;

            }

        }
        
        form {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(1fr, 12);
            margin-top: 32px;

            label {
                color: rgb(80, 176, 83);
                font-size: 12px;
                column-span: all;
                margin-top: 40px;
                height: 15px;
            }

            textarea  {
                width: calc(100% - 20px);
                grid-column: span 12;
                resize: none;
                border: none;
                box-sizing: border-box;
                border-bottom: 1px solid rgb(204, 204, 204);
                margin-left: 20px;

                &:focus-visible {
                    outline: none;
                }
            }


            .custom_select {
                grid-column: span 4;
            }
            .custom_input{
                grid-column: span 3;
            }
            .item-3  {
                grid-column: span 4;
            }
        }

        .modal_body__bottom {
            float: right;

            button {
                border: none;
                width: 87px;
                height: 36px;
                border-radius: 2px;
                background: #50B053;
                font-family: Roboto;
                font-size: 14px;
                font-weight: 400;
                margin-top: 24px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                &:focus-visible {
                    border: none;
                }
            }
        }
    }

}

</style>