/* eslint-disable no-lonely-if */
import { getToken } from '@/shared/auth';
import store from '@/store/index';
import router from './index';

router.beforeEach(async (to, from, next) => {
  const protectedPage = to.meta.requiresAuth;
  const hasToken = getToken();
  if (hasToken) {
    // Check if token is valid
    if (await store.dispatch('auth/checkAuthUserAction')) {
      if (to.path === '/login') {
        next('/');
      } else {
        next();
      }
    } else {
      await store.dispatch('auth/logoutUserAction');
      next('/login');
    }
  } else {
    /* No token */
    if (protectedPage === false) {
      // If it does not require auth, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login');
    }
  }
});
