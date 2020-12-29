import Vue from 'vue';
import {
  ValidationProvider, ValidationObserver, extend, configure
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// Add custom rules
extend('password', (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/.test(value));

const config = {
  classes: {
    invalid: 'is-invalid'
  },
};

configure(config);

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
