import React from 'react';
import { useMutation } from 'react-query';
import { login } from '../../api/api';

import './LoginPage.css';

const LoginPage = () => {
  const { mutate } = useMutation({
    mutationKey: 'login',
    mutationFn: (data) => login(data),
  });
  const handleSubmit = (e) => {
    console.log('mpika edw');
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username, password);

    mutate({ username, password });
  };

  return (
    <form className="login-page" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input type="text" id="username" className="form-control" />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input type="password" id="password" className="form-control" />
      </div>

      <button type="submit" className="btn btn-primary mb-4">
        Sign in
      </button>
    </form>
  );
};

export default LoginPage;
