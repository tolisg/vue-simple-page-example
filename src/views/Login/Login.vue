<template>
  <div class="container-fluid text-center">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header bg-primary">
            <h4 class="card-title text-white mb-0">{{$t('PLEASE_LOGIN')}}</h4>
          </div>
          <div class="card-body pt-3">
            <validation-observer v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="row">
                  <div class="col-sm-12 form-group">
                    <validation-input :label="$t('USERAME')" rules="required">
                      <input v-model="username" type="text" class="form-control" />
                    </validation-input>
                  </div>
                  <div class="col-sm-12 form-group">
                    <validation-input :label="$t('PASSWORD')" rules="required">
                      <input v-model="password" type="password" class="form-control" />
                    </validation-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <button type="submit" class="btn btn-primary btn-block mb-3">{{$t('LOGIN')}}</button>
                  </div>
                  <div class="col-sm-12">
                    <button type="button" class="btn btn-outline-secondary btn-block" @click="registerUser">{{$t('REGISTER')}}</button>
                  </div>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
     <loader v-if="loading" msg="You are logging in" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },
  methods: {
    ...mapActions('auth', ['loginUserAction']),
    async onSubmit() {
      this.loading = true;
      await this.loginUserAction({ username: this.username, password: this.password });
      this.loading = false;
      if (this.user) {
        this.$router.push({ name: 'HomePage' });
      }
    },
    registerUser() {
      this.$router.push({ name: 'Register' });
    }
  },
};
</script>
