import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto" th:fragment="header">
        <div>
          <h3 className="float-md-start mb-0">Leases catalogue</h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <a
              className="nav-link fw-bold py-1 px-0"
              aria-current="page"
              href="/"
              th:href="@{/}"
            >
              Home
            </a>
            <a className="nav-link fw-bold py-1 px-0" href="/users">
              Users
            </a>
            <a
              sec:authorize="hasRole('ADMIN')"
              className="nav-link fw-bold py-1 px-0"
              href="/roles"
              th:href="@{/roles}"
            >
              Roles
            </a>
            <a
              sec:authorize="hasRole('ADMIN')"
              className="nav-link fw-bold py-1 px-0"
              href="/privileges"
              th:href="@{/privileges}"
            >
              Privileges
            </a>
            <a
              sec:authorize="isAuthenticated()"
              className="nav-link fw-bold py-1 px-0"
              href="/logout"
              th:href="@{/logout}"
            >
              Logout
            </a>
            <a
              sec:authorize="!isAuthenticated()"
              className="nav-link fw-bold py-1 px-0"
              href="/login"
              th:href="@{/login}"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="px-3">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
