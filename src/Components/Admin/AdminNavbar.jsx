
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { LoginContext } from '../../Context/Login.Context';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContext} from 'react';


const pages = ['Seminar Hall', 'Guest House', 'Transport','Events/poster','Items','Food & Beverages'];


function AdminNavBar() {

  const navigate = useNavigate();

  const { userName, setIsLoggedIn } = useContext(LoginContext);


  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCreateUser = (event) => {
    navigate('/create-user');
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
     navigate('/change-password');
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  }



  return (
    <AppBar position="relative">
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display: "flex", justifyContent:'end'}}>
          <Box sx={{marginLeft: "20px"}}>
          <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{borderRadius: "5px", border: "1px white solid", padding: 1}}
              >
                <AccountCircle />
                <Typography textAlign="center" sx={{marginLeft: 1, fontWeight: "medium"}}>{userName[0].toUpperCase() + userName.slice(1)}</Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCreateUser}>Create User</MenuItem>
                <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                <MenuItem onClick={handleLogOut} sx={{diaplay: "flex", justifyContent: "space-between"}}> <span>Log Out</span> <LogoutIcon/></MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNavBar;
