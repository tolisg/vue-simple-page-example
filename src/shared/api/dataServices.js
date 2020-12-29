import * as axios from 'axios';
import messages from '@/shared/modules/notifications';
import { API } from '@/shared/config';
import NProgress from 'nprogress';
import { saveToken, destroyToken, getToken } from '../auth';

axios.interceptors.response.use((response) => {
  NProgress.start();
  return response;
},
(error) => {
  if (error.response.status === 401) {
    destroyToken();
  }
  return Promise.reject(error);
});

// before a response is returned stop nprogress
axios.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});
axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API}/auth/register`, user);
    const data = parseItem(response, 201);
    messages({ type: 'info', message: 'User registrated successfully!' });
    saveToken(data);
    return data;
  } catch (error) {
    console.log(error);
    messages({ type: 'error', message: 'Username exists try another!' });
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API}/auth/login`, credentials);
    // console.log(response);
    const data = parseList(response);
    saveToken(data);
    return data;
  } catch (error) {
    console.log(error);
    messages({ type: 'error', message: 'Wrong username or password!' });
  }
};

const logoutUser = async () => {
  await destroyToken();
};

const dataServices = {
  loginUser,
  logoutUser,
  registerUser
};
export default dataServices;
