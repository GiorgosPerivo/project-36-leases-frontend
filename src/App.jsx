import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import LeasesPage from './pages/LeasesPage/LeasesPage';
import CreateLeasePage from './pages/CreateLeasePage/CreateLeasePage';
import { AuthContext } from './providers/authProvider/authProvider';

import './App.css';
import EditLeasePage from './pages/EditLeasePage/EditLeasePage';

function App() {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!isAuthenticated && <Route index element={<LoginPage />} />}
        {isAuthenticated && (
          <>
            <Route index element={<LeasesPage />} />
            {user.roles.includes('CREATE_LEASE') && (
              <>
                <Route path="create-lease" element={<CreateLeasePage />} />
                <Route path=":leaseId/edit-lease" element={<EditLeasePage />} />
              </>
            )}
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
