<template>
  <validation-provider :name="name || label" :rules="rules" v-slot="{ errors, classes, required }">
    <label v-if="label" :class="[required && 'required', labelClass]">{{label}}</label>
    <slot></slot>
    <span :class="classes">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    labelClass: {
      type: [Object, String],
      default: ''
    }
  },
};
</script>
