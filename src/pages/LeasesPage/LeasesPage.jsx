import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getLeasesAPI } from '../../api/api';
import { AuthContext } from '../../providers/authProvider/authProvider';

import './LeasesPage.css';

const LeasesPage = () => {
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: 'leases',
    queryFn: () => getLeasesAPI(),
  });

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
            <tr>
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
                {lease.isFinalized ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-danger">No</span>
                )}
              </td>
              <td>
                {user.roles.includes('CREATE_LEASE') && (
                  <button className="btn btn-danger">Delete</button>
                )}

                {user.roles.includes('ACCEPT_LEASE') && (
                  <button className="btn btn-success">Accept</button>
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
