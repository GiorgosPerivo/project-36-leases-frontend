import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/authProvider/authProvider';

const Layout = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Leases application</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            {isAuthenticated && (
              <>
                <NavLink className="nav-link fw-bold py-1 px-0" to="/">
                  Leases
                </NavLink>
                <button
                  className="btn btn-link nav-link fw-bold py-1 px-0"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <NavLink className="nav-link fw-bold py-1 px-0" to="/">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="px-3">
        <Outlet />
      </main>

      {user && (
        <footer className="mt-auto text-white-50">
          You are logged in as: <strong>{user.username}</strong> with the
          following permissions <strong>{user.roles.join(', ')}</strong>
        </footer>
      )}
    </div>
  );
};

export default Layout;
