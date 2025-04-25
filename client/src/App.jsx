import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Scheduler from './pages/Scheduler';
import Analytics from './pages/Analytics';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import Login from './pages/Login';
import Loading from './components/Loading';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Layout user={user}>
        <Routes>
          <Route 
            path="/" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/scheduler" 
            element={user ? <Scheduler /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/analytics" 
            element={user ? <Analytics /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
<Route path="/register" element={<Register />} /> 
<Route path="/reset-password" element={<PasswordReset />} /> 
<Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}