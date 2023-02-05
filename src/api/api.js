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

export const acceptLeaseAPI = async (leaseId) => {
  return axiosInstance.put(`/leases/${leaseId}/accept`).then((response) => {
    return response.data;
  });
};

export const addDetailsLeaseAPI = async (leaseId, data) => {
  return axiosInstance
    .put(`/leases/${leaseId}/add-details`, { details: data })
    .then((response) => {
      return response.data;
    });
};
