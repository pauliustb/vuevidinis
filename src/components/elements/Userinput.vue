<template lang="pug">
  div.select(v-bind:class="[{error:error, disabled:disabled, placeholder:placeholder, focus:focus},color, {notempty: modelValue}]")
    div.input-top
      div.label(v-if="placeholder && showLabel")
        span {{ placeholder }}
      div.counter(v-if="maxlength && showLength")
        span {{ remaining + '/' + maxlength }}
    div.placeholder(v-if="placeholder && type !== 'textarea'" v-on:click="focusELdealay") {{ placeholder }}

    input(ref="input" v-if="type === 'input'" :value="modelValue"
      v-on:blur="blur" v-on:focus="focusEl" autocomplete="off"
      v-on:keyup.enter="handleClick" v-on:animationstart="checkAnimation" spellcheck="false" @input="updateValue($event.target.value)")

    input(ref="input" type="password" v-if="type === 'password'" :value="modelValue"
      v-on:blur="blur" v-on:focus="focusEl" autocomplete="off"
      v-on:keyup.enter="handleClick" v-on:animationstart="checkAnimation" spellcheck="false" @input="updateValue($event.target.value)")

    input(ref="input" type="number" v-if="type === 'number'" :value="modelValue"
      v-on:blur="blur" v-on:focus="focusEl" autocomplete="off"
      v-on:keyup.enter="handleClick" v-on:animationstart="checkAnimation" spellcheck="false" @input="updateValue($event.target.value)")

    textarea(ref="input" v-if="type === 'textarea'" v-model="internalValue"
      v-on:blur="blur" v-on:focus="focusEl" v-on:keyup="liveCountDown"
      autocomplete="off" v-on:animationstart="checkAnimation"
      spellcheck="false" v-bind:maxlength="maxlength" @input="updateValue($event.target.value)")

    transition(name="expand")
      div.errortxt(v-if="error")
        span(v-if="error !== '' && error !== true") {{ error }}
</template>

<script>
export default {
  name: 'UserInput',
  props: {
    type: String,
    error: [String, Boolean],
    modelValue: String,
    disabled: Boolean,
    placeholder: String,
    color: String,
    maxlength: Number,
    showLength: Boolean,
    showLabel: Boolean
  },
  data() {
    return {
      focus: false,
      remaining: 0
    };
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    }
  },
  mounted() {
      
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    focusELdealay() {
      setTimeout(() => {
        this.focus = true;
      }, 20);
    },
    blur() {
      this.focus = false;
    },
    focusEl() {
      this.focus = true;
    },
    checkAnimation(e) {
      if (e.animationName === 'onAutoFillStart') {
        this.focus = true;
      }
    },
    liveCountDown() {
      this.remaining = this.modelValue ? this.modelValue.length : 0;
    },
    updateValue(value) {
      this.$emit('update:modelValue', value);
    }
  },
  watch: {
    focus(to) {
      if (to && this.$refs.input) {
        this.$refs.input.focus();
      } else if (this.$refs.input) {
        this.$refs.input.blur();
      }
    }
  }
};
</script>


<style  scoped lang="stylus">
.input-top
  display: flex
  justify-content: space-between
  span
    font-size: 14px
  .label
    color: #6B798B
  .counter
    color: #CFD5E1
.select {
  position: relative;
  &.disabled{
    pointer-events: none;
    .placeholder{
      color: #9597af;
    }
    input,textarea{
      border-color: #d9d6e0;
      color: #d9d6e0;
    }
  }
  .errorbox{
    position: absolute;
    right: 0;
    top: 3px;
    opacity: 0;
    transition: 0.3s all;
    transform: scale(0);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #e95a0c;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.placeholder{
    .errorbox{
      top: 19px;
    }
  }
  input,textarea {
    -webkit-appearance: none;
    border-radius: 0;
    transition: 0.3s all;
    height: 48px;
    width: 100%;
    border-radius: 0px;
    border-bottom: 1px solid #DDE9F6;
    padding: 8px 0px;
    padding-top: 20px;
    color: #6B798B;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    align-items: center;
    &:focus{
      border-color #246cb5;
    }
    &:-webkit-autofill {
      animation-name: onAutoFillStart;
    }
  }
  &.error {
    input,textarea {
      border-color: #DC4E41;
    }
    .errorbox{
      opacity: 1;
      transform: scale(1);
    }
    &:after{
      background: #DC4E41;
    }
  }
  &.notempty{
    .placeholder{
      transform: translateY(0px) scale(0.8);
    }
  }
  .placeholder{
    padding: 0px 0px
    pointer-events: none;
    transform: translateY(17px) scale(1);
    transition: 0.3s all;
    margin-bottom: 0px;
    color: #6B798B;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    position: absolute;
    left: 0px;
    top: 4px;
    transform-origin 0 50%;
  }
  &.focus{
    .placeholder{
      transform: translateY(0px) scale(0.8);
    }
  }
  &.black{
    input{
      border-bottom: 2px solid #000;
    }
    &:after{
      background-color: #000;
    }
  }
  .errortxt{
    overflow: hidden;
    position: absolute;
    right: 0px;
    bottom: 3px;
    color: #DC4E41;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    z-index: 2;
  }
}
textarea{
      border: 1px solid #dde9f6;
  min-height: 100px;
  resize: auto;
  min-width: 100%;
  max-width: 100%;
  background-color: #FFFFFF;
  padding: 10px 20px !important;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@keyframes onAutoFillStart {
   from {
   }
   to {
   }
}
@keyframes onAutoFillCancel {
   from {
   }
   to {
   }
}
</style>
