import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Main/App';
import LoginProvider from './Context/Login.Context';
import { ToastContainer } from "react-toastify";
import SeminarProvider from './Context/Seminar.Context';
import UserProvider from './Context/User.Context';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Main/theme';
import GuestHouseProvider from './Context/GuestHouse.Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <LoginProvider>
      <SeminarProvider>
        <UserProvider>
          <GuestHouseProvider>
            <ThemeProvider theme={theme}>
              <App />
              <ToastContainer /> 
            </ThemeProvider>
          </GuestHouseProvider>
        </UserProvider>
      </SeminarProvider>
    </LoginProvider>
  </>
);

