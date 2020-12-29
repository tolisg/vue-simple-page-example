<template>
  <div class="portal-page-wrapper">
    <the-nav-bar />
    <div class="portal-container">
      <slot />
    </div>
    <the-footer />
  </div>
</template>

<script>
import TheNavBar from './TheNavBar.vue';
import TheFooter from './TheFooter.vue';

export default {
  components: {
    TheNavBar,
    TheFooter
  },
};
</script>
