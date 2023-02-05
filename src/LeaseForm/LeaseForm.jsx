import React from 'react';
import { useQuery } from 'react-query';
import { getTenantsAPI } from '../api/api';

const LeaseForm = ({ onSubmit, values }) => {
  const { data: tenants } = useQuery({
    queryKey: 'tenants',
    queryFn: () => getTenantsAPI(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tenantOptions = document.getElementById('tenants').selectedOptions;
    const tenantIds = Array.from(tenantOptions).map(({ value }) => value);

    onSubmit({
      street: document.getElementById('street').value,
      city: document.getElementById('city').value,
      postalCode: document.getElementById('postalCode').value,
      country: document.getElementById('country').value,
      electricalId: document.getElementById('electricalId').value,
      amount: Number(document.getElementById('amount').value),
      tenantIds,
    });
  };
  return (
    <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          required
          type="text"
          className="form-control"
          id="street"
          defaultValue={values?.street || ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          required
          type="text"
          className="form-control"
          id="city"
          defaultValue={values?.city || ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postalCode">Postal code</label>
        <input
          required
          type="text"
          className="form-control"
          id="postalCode"
          defaultValue={values?.postalCode || ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          required
          type="text"
          className="form-control"
          id="country"
          defaultValue={values?.country || ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="electricalId">Electrical ID</label>
        <input
          required
          type="text"
          className="form-control"
          id="electricalId"
          defaultValue={values?.electricalId || ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          required
          type="number"
          className="form-control"
          id="amount"
          defaultValue={values?.amount || ''}
        />
      </div>

      <div className="form-group d-flex flex-column">
        <label htmlFor="tenants">Tenants</label>
        <select required multiple id="tenants">
          {tenants?.map((tenant) => (
            <option
              key={tenant.id}
              value={tenant.id}
              selected={values?.tenants
                ?.map((current) => current.id)
                ?.includes(tenant.id)}
            >
              {tenant.username}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LeaseForm;
