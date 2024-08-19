<template>
    <table>
        <thead>
            <tr>
                <th v-for="category in categories" :key="category.name">{{ category.name }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in requestsList" :key="request.id">
                <td><div class="request_number">{{ request?.number }}</div></td>
                <td>{{ formatDate(request?.created_at) }}</td>
                <td>{{ request?.premise?.address + ' ' + request?.apartment?.label }}</td>
                <td>{{ formatName(request?.applicant) }}</td>
                <td>{{ request.description }}</td>
                <td>{{ formatDateTime(request.due_date) }}</td>
                <td>{{ request.status.name }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    name: 'CustomTable',
    props: {
        requestsList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            categories: [
                {name: '№', sortKey: null, isSorting: false},
                {name: 'Создана', sortKey: null, isSorting: false},
                {name: 'Адрес', sortKey: null, isSorting: false},
                {name: 'Заявитель', sortKey: null, isSorting: false},
                {name: 'Описание', sortKey: null, isSorting: false},
                {name: 'Срок', sortKey: null, isSorting: false},
                {name: 'Статус', sortKey: null, isSorting: false},
            ]
            }
    },  
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
            const year = date.getFullYear();
            
            return `${day}.${month}.${year}`;
        },
        formatDateTime(dateString){
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
            const year = date.getFullYear();
            const time = String(date.getHours()).padStart(2, 0) + ':' + String(date.getMinutes()).padStart(2, 0)
            return `${day}.${month}.${year} ${time}`;
        },
        formatName(nameObj){
            let formatedName = ''
            formatedName += nameObj?.last_name
            if (nameObj?.first_name[0]) formatedName += ` ${nameObj?.first_name[0]}.`
            if (nameObj?.patronymic_name[0]) formatedName += `${nameObj?.patronymic_name[0]}.`
            return formatedName || 'not assigned'
        }

    }  
}
</script>
<style lang="scss">
table {
    font-family: "Inter", sans-serif;

    thead {
        text-align: left;
        color: #50B053;
        //styleName: Body/Paragraph;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;


    }

    tbody {
        tr {
            box-shadow: inset 0px -1px 0px 0px rgb(221, 223, 224);
            background: rgb(255, 255, 255);
            height: 58px;

            .request_number{
                width: 56px;
                height: 28px;
                border-radius: 4px;
                color: rgb(255, 255, 255);
                font-size: 16px;
                font-weight: 500;
                line-height: 20px;
                background: rgb(68, 162, 72);
                display: flex;
                justify-content: center;
                align-items: center;

            }
        }
    }
}


    
</style>