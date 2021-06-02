<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import Default from '@/views/Layouts/Default/Default.vue';
import Login from '@/views/Layouts/Login/Login.vue';

export default {
  name: 'App',
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`;
    }
  },
  components: {
    'default-layout': Default,
    'login-layout': Login
  },
};
</script>
<style lang="scss">
  @import "@/assets/styles/index.scss";
</style>
