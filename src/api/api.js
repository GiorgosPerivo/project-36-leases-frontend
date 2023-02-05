import axiosInstance from './axios';

export const loginAPI = async (data) => {
  return axiosInstance.post('/auth/signin', data).then((response) => {
    return response.data;
  });
};

export const getLeasesAPI = async () => {
  return axiosInstance.get('/leases').then((response) => {
    return response.data;
  });
};
