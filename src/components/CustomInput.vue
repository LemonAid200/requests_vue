<template>
  <div class="custom_input" :class="{ 'custom_input--no-label' : !label }">
    <label v-if="label" :for="id" :style="{marginLeft : labelIndent + 'px'}">{{ label }}</label>
    <div class="custom_input__inner">
      <img v-if="icon || icons[type || inputType]" :src="icon || icons[type || inputType]" class="custom_input__inner__icon--left" >
      <input :id="id" :type="inputType" :placeholder="placeholder" :value="value" 
        @focusout="$emit('submit')"
        @keyup.enter="$emit('submit')"
        @input="updateValue($event.target.value)">
      <img v-if="rightIcon || rightIcons[type || inputType]" :src="rightIcon || rightIcons[type || inputType]" @click="toggleState" class="custom_input__inner__icon--right" >
    </div>    
  </div>
</template>

<script>
export default {
  name: 'CustomInput',


  
  props: {
    value: {
      type: String,
      default: ''
    },
    id: String,
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    inputType: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type:String,
      required: false
    },
    labelIndent: {
      type: Number,
      default: () => 0
    },
    icon: {
      type: String,
      required: false
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
    toggleState(){
      this.$emit('toggle')
    }
  },
  data() {
    return {
      icons: {
        tel: './icons/phone.svg',
        password: './icons/lock.svg',
      },
      rightIcons: {
        password: './icons/hide-password.svg'
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .custom_input{
    display: grid;
    height: 56px;
    width: 100%;
    grid-template-rows: 18px 1fr;

    label {
      color: rgb(80, 176, 83);
      font-size: 12px;
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
  }

  .custom_input--no-label{
    height: 38px;
    grid-template-rows: 1fr;
  }

</style>
