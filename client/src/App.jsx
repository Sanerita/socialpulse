import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Register from './pages/Register'; 
import PasswordReset from './pages/PasswordReset'; 
import TermsOfService from './pages/TermsOfService';
import Homepage from './pages/Homepage'; 

// Custom route protection wrapper
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

// Auth redirection wrapper
const AuthRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

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
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route 
          path="/login" 
          element={
            <AuthRoute user={user}>
              <Login />
            </AuthRoute>
          } 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/terms" element={<TermsOfService />} />
        
        {/* Protected routes */}
        <Route element={<Layout user={user} />}>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/scheduler" 
            element={
              <ProtectedRoute user={user}>
                <Scheduler />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute user={user}>
                <Analytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute user={user}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute user={user}>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}