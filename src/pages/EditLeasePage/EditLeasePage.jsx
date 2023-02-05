import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { editLeaseAPI, getLeaseByIdAPI } from '../../api/api';
import LeaseForm from '../../LeaseForm/LeaseForm';

const EditLeasePage = () => {
  const { leaseId } = useParams();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['lease', leaseId],
    queryFn: () => getLeaseByIdAPI(leaseId),
  });

  const { mutate } = useMutation({
    mutationKey: 'editLease',
    mutationFn: (data) => editLeaseAPI(leaseId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries('leases');

      navigate('/leases');
    },
  });

  const handleSubmit = (lease) => {
    mutate(lease);
  };

  return <LeaseForm onSubmit={handleSubmit} values={data} />;
};

export default EditLeasePage;
