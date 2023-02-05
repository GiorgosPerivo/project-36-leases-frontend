import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { loginAPI } from '../../api/api';
import { AuthContext } from '../../providers/authProvider/authProvider';

import './LoginPage.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { mutate, isLoading } = useMutation({
    mutationKey: 'login',
    mutationFn: (data) => loginAPI(data),
    onSuccess: (data) => {
      login(data);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        alert('Invalid credentials!');
      }
    },
  });
  const handleSubmit = (e) => {
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

      <button
        type="submit"
        className="btn btn-primary mb-4"
        disabled={isLoading}
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginPage;
