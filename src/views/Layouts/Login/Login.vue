<template>
  <div class="portal-page-wrapper">
    <nav-bar />
    <div class="portal-container">
      <slot />
    </div>
    <the-footer />
  </div>
</template>

<script>
import navBar from './TheNavBar.vue';
import TheFooter from './TheFooter.vue';

export default {
  components: {
    navBar,
    TheFooter
  },
};
</script>
