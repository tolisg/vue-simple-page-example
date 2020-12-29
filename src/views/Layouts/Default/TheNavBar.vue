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
        <div class="ml-lg-auto d-sm-flex">
          <template v-if="isLoggedIn">
            <div v-popper="{ placement: 'bottom-end' }">
              <a href="javascript:;" class="nav-link" popper-trigger>
                <span class="">
                  {{ user.username }}
                  <i class="mdi mdi-chevron-down"></i>
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right" popper>
                <div class="d-flex align-items-center px-3">
                  <span class="flex-grow-0 d-none d-md-block">
                    <i class="mdi mdi-account text-secondary" style="font-size: 40px"></i>
                  </span>
                  <a class="flex-grow-1 flex-shrink-1" :href="`mailto:${ user.email }`">{{user.email}}</a>
                </div>
                <div class="d-flex border-top pt-2 px-2">
                  <button type="button" class="btn btn-block btn-outline-primary" @click="logout">
                    {{ $t('LOGOUT') }}
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-primary">
            {{ $t('LOGIN') }}
          </router-link>
          </template>
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      languages: supportedlanguages
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState({
      user: (state) => state.auth.user
    })
  },
  methods: {
    ...mapActions('auth', ['logoutUserAction']),
    toggleNavbar() {
      const { navbarNavAltMarkup } = this.$refs;
      if (!navbarNavAltMarkup.classList.contains('show')) {
        navbarNavAltMarkup.classList.add('show');
      } else {
        navbarNavAltMarkup.classList.remove('show');
      }
    },
    toggleAccount() {
      if (!this.$refs['account-dropdown'].classList.contains('show')) {
        this.$refs['account-dropdown'].classList.add('show');
      } else {
        this.$refs['account-dropdown'].classList.remove('show');
      }
    },
    async logout() {
      await this.logoutUserAction();
      this.$router.push({ name: 'Login' });
    },
    setLanguage(lang) {
      loadLanguageAsync(lang);
    }
  }
};
</script>
