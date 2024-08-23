<template>
    <div class="requests">
        <div class="requests_top">
            <button class="requests_top__btn--new" @click="isModalOpen = true">Создать</button>
        </div>
        <div class="requests_filters">
            <CustomInput  v-model="filterSearch" @submit="searchRequest"
                :right-icon="'./icons/search.svg'"     placeholder="Поиск (№ заявки, название)"/>
            <CustomSelect v-model="filterAddres" @submit="filterRequest"
                :right-icon="'./icons/arrow-down.svg'" placeholder="Дом"/>
        </div>

        <CustomTable v-if="requestsList" 
            :requests-list="requestsList" />

        <div class="requests__pagination">
            <div class="requests__pagination_settings">
                <span>
                    <b>{{ pageStart + 1 }} - {{ pageEnd }}</b>
                    из
                    <b>{{ requestsCount }}</b>
                    записей
                </span>

                <CustomSelect :optionsPosition="'up'" v-model="pageSize" :placeholder="'10'" 
                    :rightIcon="'./icons/arrow-down.svg'" />
            </div>
            
            <CustomPagination v-model="page" :amountOfPages="requestsPagesAmount" />
        </div>
        <CustomModal @closeModal="isModalOpen = false" v-show="isModalOpen"/>
    </div>
</template>

<script>
// import axios from 'axios';
import CustomInput from '@/components/CustomInput.vue';
import CustomTable from '@/components/CustomTable.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import CustomPagination from '@/components/CastomPagination.vue'
import CustomModal from '@/components/CustomModal.vue';

import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            filterSearch: '',
            filterPremise_id: '',
            pageSize: 10,
            pageStart: 0,
            page: 1,
            isModalOpen: false,
        }
    },
    components: {
        CustomInput,
        CustomTable,
        CustomSelect,
        CustomPagination,
        CustomModal
    },
    methods: {
        ...mapActions({
            fetchRequestsData: 'requests/fetchRequestsData',
            auth: 'auth/auth',
            authCheck: 'auth/authCheck',
            fetchFilteredRequestsData: 'requests/fetchFilteredRequestsData'
        }),
        redirectToAuth(){
            this.$router.push({name: 'Registration'})            
        },
        async updateRequests(){
            this.fetchRequestsData({pageSize: this.pageSize, page: this.page, search: this.filterSearch})
        },
        async searchRequest(){
            this.fetchRequestsData({pageSize: 10, page: 1, search: this.filterSearch})
        },
        async filterRequest(){
            this.fetchFilteredRequestsData({pageSize: 10, page: 1, premise_id: this.filterPremise_id})
        }
    },
    computed: {
        ...mapGetters({
            requestsList: 'requests/getRequestsList',
            requestsPagesAmount: 'requests/getPages',
            requestsCount: 'requests/getCount'
        }),
        pageEnd(){
            return this.pageStart + Number(this.pageSize)
        }
    },
    watch: {
        pageSize: 'updateRequests',
        page: 'updateRequests'
    },
    async mounted() {
        if (await this.authCheck()){
            await this.updateRequests()
        } else {            
            this.redirectToAuth()            
        }
    },
    
}
</script>

<style lang="scss">
.requests {
    margin: 15px;
    padding: 10px 20px;
    border-radius: 8px;
    background: rgb(255, 255, 255);

    table {
        margin-top: 32px;
        width: 100%;
    }

    
    &_top {
        text-align: right;



        &__btn--new {
            width: 78px;
            height: 26px;
            border: none;
            border-radius: 2px;
            box-shadow: 0px 4px 4px 0px rgba(106, 174, 94, 0.25);
            background: rgb(80, 176, 83);
            color: rgb(255, 255, 255);
            font-family: Roboto;
            font-size: 10px;
            font-weight: 400;
        }
    }

    &_filters {
        display: flex;
        gap: 15px;

        .custom_input, .custom_select {
            height: 40px;
        }
    }

    .requests__pagination {
        display: flex;
        justify-content: space-between;
        margin-top: 32px;
        align-items: center;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;

        .requests__pagination_settings {
            display: flex;
            text-align: center;

            span {
                text-wrap: nowrap;
                align-content: center;
            }

            .custom_select {
                width: 89px;
                margin-left: 16px;
            }
        }
        .requests__pagination_page {
            text-align: center;
        }
    }

}

</style>