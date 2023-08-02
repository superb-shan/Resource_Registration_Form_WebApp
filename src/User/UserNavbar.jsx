
import * as React from 'react';
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
import { UserContext } from '../Context/User.Context';
import ViewSelector from './ViewSelector';

import { useState, useEffect, useContext} from 'react';

const pages = ['Seminar Hall', 'Guest House', 'Transport','Events/poster','Items','Food & Beverages'];


function UserNavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { selectedForm, setSelectedForm} = useContext(UserContext);


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
            {pages.map((page) => (
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
                <MenuItem key={page} onClick={()=>{ setSelectedForm(page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserNavBar;
