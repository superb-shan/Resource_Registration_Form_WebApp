import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { LoginPage } from '../Pages/LoginPage';
import { UserPage } from '../Pages/UserPage';
import { AdminPage } from '../Pages/AdminPage';
import { ChangePassword } from '../Pages/ChangePassword';
import { CreateUserPage } from '../Pages/CreateUserPage';
import LayoutProvider from '../Layouts/LayoutProvider';

axios.defaults.baseURL = 'http://localhost:8000'

export default function App() {

  return (
    <div className='font-[Poppins]'>
      <Router>
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/change-password" element={<ChangePassword/>} />
            <Route path="/create-user" element={<CreateUserPage/>} />
          </Routes>
        </LayoutProvider>
      </Router>
    </div>
  );
}
