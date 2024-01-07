import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PLayout from './components/PLayout';
import Dashboard from './scenes/Dashboard';
import HomeVisit from './scenes/HomeVisit';
import Payments from './scenes/Payments';
import Feedback from './scenes/Feedback';
import StripeMain from './components/stripe/App';
import MedicalReport from './scenes/Dashboard/MedicalReport';
import InProgress from './scenes/InProgress';

const ProtectedApp = () => {
  return (
    <Routes>
      <Route element={<PLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/stripe-main/:userId/:appointmentId"
          element={<StripeMain />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visits" element={<HomeVisit />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/in-progress" element={<InProgress />} />
        <Route
          path="/dashboard/medicalReport/:id"
          element={<MedicalReport />}
        />
      </Route>
    </Routes>
  );
};

export default ProtectedApp;
