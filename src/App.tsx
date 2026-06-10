import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Software from './pages/Software';
import MusicPage from './pages/Music';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('storyshout_dark_mode');
    return saved ? saved === 'true' : true; // Default to elegant dark theme
  });

  // Keep HTML root node synchronized with class dark toggles
  useEffect(() => {
    localStorage.setItem('storyshout_dark_mode', String(darkMode));
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC SITE SECTIONS - Wrapped in Common Navigation Layout */}
        <Route 
          path="/" 
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Home />
            </Layout>
          } 
        />
        <Route 
          path="/software" 
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Software />
            </Layout>
          } 
        />
        <Route 
          path="/music" 
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <MusicPage />
            </Layout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <About />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Contact />
            </Layout>
          } 
        />

        {/* SECURE ADMIN BACK-OFFICE OPERATIONS - Standalone Framework */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* FALLBACK REDIRECT CHANNELS */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
