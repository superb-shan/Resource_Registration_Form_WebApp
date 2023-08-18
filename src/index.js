import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Main/App';
import LoginProvider from './Context/Login.Context';
import TransportProvider from './Context/Transport.Context';
import { ToastContainer } from "react-toastify";
import AdminProvider from './Context/Admin.Context';
import SeminorProvider from './Context/Seminor.Context';
import UserProvider from './Context/User.Context';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Main/theme';
import GuestHouseProvider from './Context/GuestHouse.Context';
import ItemsProvider from './Context/Items.Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <LoginProvider>
      <TransportProvider>
        <AdminProvider>
          <SeminorProvider>
            <UserProvider>
             <GuestHouseProvider>
               <ItemsProvider>
              <ThemeProvider theme={theme}>
                <App />
                <ToastContainer /> 
              </ThemeProvider>
                </ItemsProvider>
              </GuestHouseProvider>
            </UserProvider>
          </SeminorProvider>
        </AdminProvider>
      </TransportProvider>
    </LoginProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
