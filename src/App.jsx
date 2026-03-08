import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Grid from './pages/Grid';
import Topics from './pages/Topics';
import Pdf from './pages/Pdf';
import Purchases from './pages/Purchases';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import SetupProfile from './pages/SetupProfile';
import Landing from './pages/Landing';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPurchases from './pages/admin/Purchases';

// Custom Private Route component to protect application routes
const PrivateRoute = ({ children }) => {
  const { user, userLoading } = useData();

  if (userLoading) {
    return <div className="min-h-screen bg-bg-light dark:bg-bg-dark" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup-profile" element={<SetupProfile />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/purchases" element={<AdminPurchases />} />

          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/grid" element={<Grid />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/pdf" element={<Pdf />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
