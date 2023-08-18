
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
// import ViewSelector from './ViewSelector';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import sriEshwarLogo from '../../Images/sriEshwarLogo.png'
import { Link } from 'react-router-dom';
import { Selector, DropDownSelector } from './InteractionFields';

import { useState, useEffect, useContext} from 'react';



const views = [{ name: 'Add Bookings' }, {name: 'My Bookings'}, {name: 'Check Availability'}];
const forms = ['Seminar Hall', 'Guest House', 'Transport','Events/poster','Items','Food & Beverages'];


function NavBar({...props}) {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const { selectedForm, setSelectedForm, selectedView, setSelectedView} = useContext(UserContext);
  const { userName, setIsLoggedIn } = useContext(LoginContext);


  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar position="relative" color='secondary'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{justifyContent:'end'}}>
          <Link to="/">
            <Box sx={{display: "flex", alignItems: "center"}}>
                <Box
                component="img"
                sx={{
                    height: 50,
                    width: 50,
                }}
                alt="Sri Eshwar Logo"
                src={sriEshwarLogo}
                />
                <Typography variant='h6' sx={{ml: 1, mr: 5, fontWeight: '600'}}>{props.title}</Typography>
            </Box>
          </Link>
          
          {/* <ViewSelector/> */}

          <Selector
            list={views}
            value={selectedView}
            setValue={setSelectedView}
            color="secondary"
          />


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' ,marginLeft:'auto',justifyContent:"end" } }}>
            {
                selectedView==="Add Bookings" 
                &&
                <DropDownSelector value={selectedForm} setValue={setSelectedForm} list={forms} />
            }
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
                  {forms.map((page) => (
                    <MenuItem key={page} onClick={()=>{ setSelectedForm(page) }}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            }
          </Box>

          <Box sx={{marginLeft: "20px"}}>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                sx={{borderRadius: "5px", border: "1px #374151 solid", padding: 1}}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
