import jwt from 'jsonwebtoken';
import messages from '@/shared/modules/notifications';

const getToken = () => {
  const userString = JSON.parse(localStorage.getItem('user'));
  if (!userString) return '';
  return userString.token || '';
};

const checkAuth = () => {
  const userString = JSON.parse(localStorage.getItem('user'));
  try {
    jwt.verify(userString.token, 'the_secret_key');
    return userString;
  } catch (error) {
    console.error(error);
    messages({ type: 'error', message: 'Login session expired, please login again!' });
    return '';
  }
};
const saveToken = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

const destroyToken = () => {
  localStorage.removeItem('user');
};

export {
  getToken, saveToken, checkAuth, destroyToken
};
