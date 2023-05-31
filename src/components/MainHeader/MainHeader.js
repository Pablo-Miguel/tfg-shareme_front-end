import React, { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./MainHeader.module.css";
import shareme_blue_logo from "../../assets/imgs/logos/shareme_blue_logo.png";
import { logout } from "../../store/auth-store/auth-actions";
import useUser from "../../hooks/useUser";
import SideMenu from "../SideMenu/SideMenu";
import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUser();

  const navigateProfileHandler = () => {
    navigate(`/profile/${user._id}`, { replace: true });
  };

  const logoutHandler = (isAll = false) => {
    dispatch(logout(isAll));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const sideMenuOnClickHandler = () => {
    setOpenSideMenu((prevState) => !prevState);
  };

  const pages = [
    {
      title: 'Create stuff',
      handler: () => {
        navigate('/create-stuff', { replace: true });
      }
    },
    {
      title: 'Create collection',
      handler: () => {
        navigate('/create-collection', { replace: true });
      }
    },
    {
      title: 'Search profiles',
      handler: () => {
        navigate('/search-profiles', { replace: true });
      }
    }
  ];

  const settings = [
    {
      title: 'Profile',
      handler: navigateProfileHandler
    }, 
    {
      title: 'Logout',
      handler: logoutHandler
    },
    {
      title: 'Logout all',
      handler: () => {
        logoutHandler(true);
      }
    }
  ];

  return (
    <>
      <header>
        <AppBar position="static" className={classes.header}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                <img src={shareme_blue_logo} alt='ShareMe blue logo' />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Link to="/"
                  className={classes.header__title}
                >
                  ShareMe
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={sideMenuOnClickHandler}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
                <img src={shareme_blue_logo} alt='ShareMe blue logo' />
              </Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1
                }}
              >
                <Link to="/"
                  className={classes.header__title}
                >
                  ShareMe
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => { page.handler(); }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={user.avatar} alt={user.name} sx={{ backgroundColor: 'white' }}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                  }}>
                    <Typography level="body2">Signed up as</Typography>
                    <Typography fontWeight="lg" level="body2" style={{ fontWeight: 'bold' }}>
                      {user.nickName}
                    </Typography>
                  </div>
                  <Divider />
                  {settings.map((setting) => (
                    <MenuItem key={setting.title} onClick={() => {setting.handler(); handleCloseUserMenu();}}>
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <SideMenu showMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu}/>
    </>
  );
};

export default MainHeader;
