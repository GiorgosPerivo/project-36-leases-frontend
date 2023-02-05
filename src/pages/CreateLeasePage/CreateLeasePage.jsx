import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createLeaseAPI } from '../../api/api';
import LeaseForm from '../../LeaseForm/LeaseForm';

const CreateLeasePage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: 'createLease',
    mutationFn: (data) => createLeaseAPI(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('leases');

      navigate('/leases');
    },
  });

  const handleSubmit = (lease) => {
    mutate(lease);
  };

  return <LeaseForm onSubmit={handleSubmit} />;
};

export default CreateLeasePage;
