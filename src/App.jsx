import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
