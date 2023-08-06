
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { BsMenuButtonFill} from "react-icons/bs";
import { UserContext } from '../../Context/User.Context';
import { LoginContext } from '../../Context/Login.Context';
import ViewSelector from './ViewSelector';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState, useEffect, useContext} from 'react';


const pages = ['Seminar Hall', 'Guest House', 'Transport','Events/poster','Items','Food & Beverages'];


function UserNavBar() {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const { selectedForm, setSelectedForm,selectedView} = useContext(UserContext);
  const { userName, setIsLoggedIn } = useContext(LoginContext);


  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(()=> {
    setSelectedForm(selectedForm);
  }, [selectedForm, setSelectedForm]);

  return (
    <AppBar position="relative">
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{justifyContent:'end'}}>
          <ViewSelector/>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              width: 20,
               mr: 0,
              display: { xs: 'flex', md: 'none', justifyContent:'end' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SECE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' ,marginLeft:'auto',justifyContent:"end" } }}>
            {selectedView==="Add Bookings" && pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{ setSelectedForm(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
          >
                {page}
              </Button>
            ))}
          </Box>

           {/* for phone  size */}
           
          <Box sx={{ width: 10 , flexGrow: 1, display: { xs: 'flex', md: 'none' , justifyContent:"end"} }}>
            {selectedView === "Add Bookings" && 
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                <BsMenuButtonFill />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={()=>anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={()=>{ setSelectedForm(page) }}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            }
          </Box>

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
export default UserNavBar;
