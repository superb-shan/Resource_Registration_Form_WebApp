import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LayoutProvider from '../Layouts/LayoutProvider';


//New -->
import LoginPage from '../Pages/LoginPage';
import UserPage from '../Pages/UserPage';
import AdminPage from '../Pages/AdminPage';
import ChangePasswordPage from '../Pages/ChangePasswordPage';
import CreateUserPage from '../Pages/CreateUserPage';
import Feedback from '../Pages/Feedback';


axios.defaults.baseURL = 'http://localhost:8000'

export default function App() {

  return (
    <div className='font-[Poppins]'>
      {/* New Components */}

      <Router>
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/change-password" element={<ChangePasswordPage/>} />
            <Route path="/create-user" element={<CreateUserPage/>} />
            <Route path="/feedback" element={<Feedback/>} />
          </Routes>
        </LayoutProvider>
      </Router>
    </div>
  );
}
