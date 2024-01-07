import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'scenes/home';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
