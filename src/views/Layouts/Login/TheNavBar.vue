<template>
  <nav class="fixed-top navbar navbar-dark bg-dark navbar-expand-lg">
    <router-link to="/" class="navbar-brand">
      <img src="@/assets/img/logo.png" alt="Logo" style="width: 30px; height:30px;" />
    </router-link>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon" @click="toggleNavbar" />
    </button>
    <div ref="navbarNavAltMarkup" class="collapse navbar-collapse">
      <div class="navbar-nav flex-grow-1">
        <div class="d-lg-flex">
        </div>
        <div class="ml-lg-auto d-sm-flex">
          <div class="d-flex border-sm-left">
            <a
              v-for="(lang, index) in languages"
              :key="lang"
              href="javascript:;"
              :class="['nav-link', `${$i18n.locale === lang ? 'active' : ''}`, index < languages.length - 1 ? 'mr-2 mr-md-0' : '']"
              @click="setLanguage(lang)"
              >{{ lang }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { supportedlanguages, loadLanguageAsync } from '@/i18n';

export default {
  data() {
    return {
      languages: supportedlanguages
    };
  },
  methods: {
    toggleNavbar() {
      const { navbarNavAltMarkup } = this.$refs;
      if (!navbarNavAltMarkup.classList.contains('show')) {
        navbarNavAltMarkup.classList.add('show');
      } else {
        navbarNavAltMarkup.classList.remove('show');
      }
    },
    setLanguage(lang) {
      loadLanguageAsync(lang);
    }
  }
};
</script>
