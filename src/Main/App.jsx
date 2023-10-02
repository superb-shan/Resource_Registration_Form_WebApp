import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LayoutProvider from '../Layouts/LayoutProvider';
import LoginPage from '../Pages/LoginPage';
import UserPage from '../Pages/UserPage';
import AdminPage from '../Pages/AdminPage';
import ChangePasswordPage from '../Pages/ChangePasswordPage';
import CreateUserPage from '../Pages/CreateUserPage';
import underConstruction from '../Assets/Images/underConstruction.jpg'

axios.defaults.baseURL = 'http://localhost:8000';

export default function App() {
  const isMobile = window.innerWidth <= 768; // Define your breakpoint for mobile screens

  return (
    <div className='font-[Poppins]'>
      <Router>
        <LayoutProvider>
          {isMobile ? (
            <div className='bg-[#e7eff2]'>
              <img src={underConstruction} alt='Under Construction for mobile version.' className='pb-[100px]' />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/create-user" element={<CreateUserPage />} />
            </Routes>
          )}
        </LayoutProvider>
      </Router>
    </div>
  );
}
