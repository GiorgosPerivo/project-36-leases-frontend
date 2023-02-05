import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import {
  acceptLeaseAPI,
  addDetailsLeaseAPI,
  getLeasesAPI,
} from '../../api/api';
import { AuthContext } from '../../providers/authProvider/authProvider';

import './LeasesPage.css';

const LeasesPage = () => {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: 'leases',
    queryFn: () => getLeasesAPI(),
  });

  const { mutate: acceptLease } = useMutation({
    mutationKey: 'acceptLease',
    mutationFn: (id) => acceptLeaseAPI(id),
    onSuccess: () => {
      queryClient.invalidateQueries('leases');
    },
  });

  const { mutate: addDetailsLease } = useMutation({
    mutationKey: 'addDetailsLease',
    mutationFn: (data) => addDetailsLeaseAPI(data.id, data.details),
    onSuccess: () => {
      queryClient.invalidateQueries('leases');
    },
  });

  const handleAcceptLease = (id) => {
    window.confirm('Are you sure you want to accept this lease?') &&
      acceptLease(id);
  };

  const handleAddDetailsLease = (id) => {
    const details = window.prompt('Add details to this lease');
    console.log('details', details);
    if (details) {
      addDetailsLease({ id, details });
    }
  };

  return (
    <div className="leases-page">
      <h3>Leases</h3>
      {user.roles.includes('CREATE_LEASE') && (
        <Link to="/create-lease" className="btn btn-primary">
          Create lease
        </Link>
      )}
      <table className="table mt-auto text-white">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Address</th>
            <th scope="col">Leaser</th>
            <th scope="col">Tenants</th>
            <th scope="col">Amount</th>
            <th scope="col">Details</th>
            <th scope="col">Is finalized</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lease) => (
            <tr key={lease.id.toString()}>
              <th scope="row">{lease.id}</th>
              <td>
                {lease.street + ', ' + lease.postalCode + ',  ' + lease.country}
              </td>
              <td>{lease.leaser.username}</td>
              <td>
                {lease.tenants.map((tenant) => tenant.username).join(', ')}
              </td>
              <td>{lease.amount}</td>
              <td>{lease.details}</td>
              <td>
                {lease.finalized ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-danger">No</span>
                )}
              </td>
              <td>
                {user.roles.includes('CREATE_LEASE') && (
                  <button className="btn btn-info">Edit</button>
                )}
                {user.roles.includes('ACCEPT_LEASE') && !lease.finalized ? (
                  <button
                    onClick={() => handleAcceptLease(lease.id)}
                    className="btn btn-success"
                  >
                    Accept
                  </button>
                ) : null}
                {user.roles.includes('ADD_DETAILS_TO_LEASE') && (
                  <button
                    onClick={() => handleAddDetailsLease(lease.id)}
                    className="btn btn-warning"
                  >
                    Add details
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeasesPage;
