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

export const getLeaseByIdAPI = async (leaseId) => {
  return axiosInstance.get('/leases/' + leaseId).then((response) => {
    return response.data;
  });
};

export const createLeaseAPI = async (data) => {
  return axiosInstance.post('/leases', data).then((response) => {
    return response.data;
  });
};

export const editLeaseAPI = async (leaseId, data) => {
  return axiosInstance.put(`/leases/${leaseId}`, data).then((response) => {
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

export const getTenantsAPI = async () => {
  return axiosInstance.get('/users/tenants').then((response) => {
    return response.data;
  });
};
