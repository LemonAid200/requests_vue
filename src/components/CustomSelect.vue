<template>
    <div class="custom_select" :class="{ custom_select__has_habel: label  }">
        <label v-if="label" :for="id" :style="{marginLeft : labelIndent}">{{ label }}</label>
        <div class="custom_select__inner" >
            <input  :placeholder="placeholder" :value="value" :id="id"
                @input="updateValue($event.target.value)">
            <img :src="rightIcon" class="custom_select__inner__icon--right" @click="isOptionsHidden = !isOptionsHidden">
        </div>

        <ul class="custom_select__options_list" 
            v-show="options.length"
            :class="{
                'custom_select__options_list--hidden' : isOptionsHidden,
                'custom_select__options_list--up' : optionsPosition === 'up'
            }">
            <li v-for="option in options" @click="updateValue(option); isOptionsHidden = true" :key="option" class="custom_select__options_list__option">
                {{ option }}
            </li>
        </ul> 
    </div>
</template>

<script>

export default {
name: 'CustomSelect',

data() {
    return {
        isOptionsHidden: true,
    }
},


props: {
    id: String,

    label: {
      type:String,
      required: false
    },
    labelIndent: {
        type: Number
    },

    optionsPosition: {
        type: String,
        default: 'down'
    },

    value: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        default: () => [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    rightIcon: {
        type: String,
    },
    placeholder: {
        type: String,
        required: false
    }
},
methods: {
    updateValue(newValue) {
        this.$emit('input', newValue);
    },
    convertInputValue(value) {
        if (this.type === 'Number'){
            return Number(value)
        } else {
            return value
        }
    }
},

}
</script>
  
<style scoped lang="scss">
@import '../styles/_variables.scss';

.custom_select {
    display: grid;
    height: 40px;
    width: 100%;
    grid-template-rows: 1fr;
    position: relative;

    label {
      color: rgb(80, 176, 83);
      font-size: 12px;
      margin-left: 32px;
      column-span: all;
    }


    &__inner {
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(204, 204, 204);
    border-radius: 4px 4px 0px 0px;
    align-items: center;
    justify-content: space-between;

    
        input {
            border: none;
            width: 100%;
            font-family: Roboto;
            //styleName: Body/Paragraph;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            text-align: left;


            
            &::placeholder {
            color: rgb(153, 153, 153);
            font-family: Roboto;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            }

            &:focus-visible {
            outline: none;
            }
        }

        &__icon--left {
            height: 18px;
            width: 24px;
        }

        &__icon--right {
            width: 24px;
            margin-right: 12px;
            cursor: pointer;
        }
    }

    &__options_list {
        @include custom-scroll;

        position: absolute;
        top: 104%;
        margin: 0;
        padding: 2px 10px 2px 0;
        background: white;
        marker: none;
        list-style: none;
        border: 1px solid grey;
        border-radius: 4px;
        overflow-y: scroll;
        max-height: 100px;
        max-width: 100%;
        transition: all ease 150ms;
        user-select: none;



        &__option {
            font-family: Roboto;
            cursor: pointer;
        }
    }

    &__options_list--hidden {
        height: 0;
        border: none;
        padding: 0;
        transition: height ease 0ms;
    }

    &__options_list--up {
        bottom: 104%;
        top: unset;
    }

}

.custom_select__has_habel {
    display: grid;
    height: 56px;
    width: 100%;
    grid-template-rows: 18px 1fr;
}



</style>
