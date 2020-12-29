import { checkAuth } from '@/shared/auth';
import dataServices from '@/shared/api/dataServices';

import {
  LOGIN_USER,
  LOGOUT_USER
} from '../mutation-types';

const state = () => ({
  user: null
});

const mutations = {
  [LOGIN_USER](state, user) {
    state.user = user;
  },
  [LOGOUT_USER](state) {
    state.user = '';
  }
};
const actions = {
  async registerUserAction({ commit }, user) {
    const registeredUser = await dataServices.registerUser(user);
    commit(LOGIN_USER, registeredUser);
  },
  async loginUserAction({ commit }, credentials) {
    const user = await dataServices.loginUser(credentials);
    commit(LOGIN_USER, user);
  },
  async checkAuthUserAction({ commit }) {
    const response = await checkAuth();
    if (response) {
      commit(LOGIN_USER, response);
    }
    return response;
  },
  async logoutUserAction({ commit }) {
    await dataServices.logoutUser();
    commit(LOGOUT_USER);
  }
};

const getters = {
  isLoggedIn: (state) => !!state.user
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
