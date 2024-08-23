<template>
    <div class="custom_pagination">
        <span><img src="../../public/icons/double-arrow-left.svg" @click="updateValue(1)" class="custom_pagination__start"></span>
        <span><img src="../../public/icons/arrow-left.svg"  @click="updateValue(value - 1)"  class="custom_pagination__previous"></span>
        <span v-for="page in amountOfPagesToDisplay" 
            @click="updateValue(page)" 
            :class="{ selected : value === page }"
            :key="page">{{page}}</span>
        <span><img src="../../public/icons/arrow-left.svg" @click="updateValue(value + 1)" class="custom_pagination__next"></span>
        <span><img src="../../public/icons/double-arrow-left.svg" @click="updateValue(amountOfPages)" class="custom_pagination__end"></span>
    </div>
</template>

<script>
export default {
    name: 'CustomPagination',
    props: {
        amountOfPages: {
            type: Number,
        },
        value: {
            type: Number,
            default: 1
        }
    },
    computed: {
        amountOfPagesToDisplay(){
            if (this.amountOfPages <= 7 ) return this.amountOfPages
            let pages = []
            if (this.value < 5){
                for (let i = 1; i <= 5; i++){
                    pages.push(i)
                }
                pages.push('...')
                pages.push(12)
            } else if(this.amountOfPages - this.value < 5){
                pages.push(this.amountOfPages - 12)
                pages.push('...')
                for (let i = this.amountOfPages - 5; i <= this.amountOfPages; i++){
                    pages.push(i)
                }
            } else {
                for (let i = this.value - 3; i <= this.value + 3; i++)
                pages.push(i)
            }


            return pages
        }
    },
    methods: {
        updateValue(page){
            if (page >= 1 && page <= this.amountOfPages) this.$emit('input', page)
        }
    }
    
}
</script>
<style lang="scss">
.custom_pagination {
    user-select: none;
    display: grid;
    grid-auto-flow: column;
    align-items: center;

    span {
        height: 32px;
        width: 32px;
        text-align: center;
        align-content: center;
        //styleName: Body/Mini;
        font-family: Roboto;
        font-size: 10px;
        font-weight: 400;
        line-height: 11.72px;
        text-align: center;
        color: #6C757D;
        cursor: pointer;
    }

    img {

        cursor: pointer;
    }

    .selected{
        background: #50B053;
        color: #FFFFFF;
        border-radius: 50%;        
    }


    .custom_pagination__start {

    }
    .custom_pagination__previous {
    }
    .custom_pagination__next {
        transform: rotate(180deg);
    }
    .custom_pagination__end {
        transform: rotate(180deg);
    }
}

</style>