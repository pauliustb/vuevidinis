<template>
  <label class="wrapper flex items-center">
    {{label}}
    <input class="checkbox" type="radio" name="test" :value="value" @change="$emit('change', $event.target.value)" />
    <span class="checkmark"></span>
  </label>

</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    label: {},
    modelValue: { default: '' },
    value: {},
  },
};
</script>

<style scoped>
/* Customize the label (the wrapper) */
.wrapper {
  margin-top:1rem;
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;
  margin-right:2rem
}
/* Hide the browser's default radio button */
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 21px;
  width: 21px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e7eff2;
  transition: all .5s ease;
}
/* On mouse-over, add a grey background color */
.wrapper:hover input ~ .checkmark {
  background-color: #fff;
  border: 1px solid #4487ff;
}
/* When the radio button is checked, add a blue background */
.wrapper input:checked ~ .checkmark {
  background:#fff;
  transition: all .5s ease;
}
/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the indicator (dot/circle) when checked */
.wrapper input:checked ~ .checkmark:after {
  display: block;
  transition: all .5s ease;
}
/* Style the indicator (dot/circle) */
.wrapper .checkmark:after {
  top: 2px;
  left: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #25408F;
  transition: all .5s ease;
}
</style>
