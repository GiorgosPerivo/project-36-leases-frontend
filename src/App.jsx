import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import LeasesPage from './pages/LeasesPage/LeasesPage';
import { AuthContext } from './providers/authProvider/authProvider';

import './App.css';

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!isAuthenticated && <Route index element={<LoginPage />} />}
        {isAuthenticated && (
          <>
            <Route index element={<LeasesPage />} />
            {user.roles.includes('CREATE_LEASE') && (
              <Route path="create-lease" element={<div>Create lease</div>} />
            )}
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
