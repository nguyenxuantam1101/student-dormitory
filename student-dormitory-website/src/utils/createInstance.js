import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const refreshToken = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}student/refreshToken`, {
      refreshTokenStudent: Cookies.get('refreshTokenStudent'),
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers['token'] = 'Bearer ' + data.accessToken; // gắn lại token mới vào headers token
        Cookies.set('refreshTokenStudent', data.refreshToken, {
          sameSite: 'strict',
          path: '/',
        });
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  return newInstance;
};
