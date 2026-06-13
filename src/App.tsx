import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Software from './pages/Software';
import About from './pages/About';
import Contact from './pages/Contact';
import Music from './pages/Music';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

declare global {
  interface Window { __SUBDOMAIN__?: string; }
}

function getSubdomain(): string {
  if (typeof window.__SUBDOMAIN__ === 'string') return window.__SUBDOMAIN__;
  return window.location.hostname.startsWith('label.') ? 'label' : 'main';
}

function LabelSite() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('storyshout_dark_mode');
    return saved ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('storyshout_dark_mode', String(darkMode));
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Music />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  if (getSubdomain() === 'label') return <LabelSite />;

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('storyshout_dark_mode');
    return saved ? saved === 'true' : true;
  });

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
        <Route
          path="/"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Software />
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

        {/* Legacy /software redirect */}
        <Route path="/software" element={<Navigate to="/features" replace />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
