import axiosInstance from './axios';

export const login = async (data) => {
  console.log('login', data);
  return axiosInstance.post('/auth/signin', data).then((response) => {
    console.log(response.data);
  });
};
