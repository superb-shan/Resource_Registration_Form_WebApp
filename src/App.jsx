import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage';
import { UserPage } from './Pages/UserPage';
import { AdminPage } from './Pages/AdminPage';


export default function App() {

  return (
    <div className='font-[Poppins]'>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="/admin" element={<AdminPage/>} />  
        </Routes>
      </Router>
    </div>
  );
}
