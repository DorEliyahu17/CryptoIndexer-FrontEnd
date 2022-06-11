import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const propTypes = {
  userToken: PropTypes.string,
  userName: PropTypes.string,
  userAdmin: PropTypes.bool,
  pages: PropTypes.array.isRequired,
  adminPages: PropTypes.array.isRequired,
  settings: PropTypes.array.isRequired,
  setUserToken: PropTypes.func,
  setUserName: PropTypes.func,
  setUserAdmin: PropTypes.func,
};

const defaultProps = {
  userToken: '',
  userName: '',
  userAdmin: false,
  pages: [],
  adminPages: [],
  settings: [],
  setUserToken: () => { },
  setUserName: () => { },
  setUserAdmin: () => { },
};

function Navbar(props) {
  const { userToken, userName, userAdmin, pages, adminPages, settings, setUserToken, setUserName, setUserAdmin } = props;
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    setUserToken(window.localStorage.getItem('authorization'));
    setUserName(window.localStorage.getItem('userName'));
    let isAdmin = window.localStorage.getItem('admin')
    if (isAdmin === "true") {
      setUserAdmin(true);
    } else {
      setUserAdmin(false);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar id='navbar' position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href='/'>
            <img src='logo.png' width='100' />
          </a>
          <Box id='pages-list' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                href={page.href}
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography
                  variant="p"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  {page.name}
                </Typography>
              </Button>
            ))}
            {userAdmin !== null && userAdmin !== 'null' && userAdmin !== undefined && userAdmin !== 'undefined' && (userAdmin === 'true' || userAdmin === true) && adminPages.map((page) => (
              <Button
                href={page.href}
                key={page.name}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography
                  variant="p"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                  {page.name}
                </Typography>
              </Button>
            ))}
          </Box>
          {userToken !== null && userToken !== 'null' && userToken !== undefined && userToken !== 'undefined' && userToken !== '' && (
            <Typography
              variant="p"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Hi {userName},
            </Typography>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
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
              {userToken !== null && userToken !== 'null' && userToken !== undefined && userToken !== 'undefined' && userToken === '' && settings.map((setting) => (
                <a href={setting.href}>
                  <MenuItem href={setting.href} key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </a>
              ))}
              {userToken !== null && userToken !== 'null' && userToken !== undefined && userToken !== 'undefined' && userToken !== '' && (
                <a href="/logout">
                  <MenuItem href="/logout" key="Logout" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </a>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.defaultProps = defaultProps;
Navbar.propTypes = propTypes;
export default Navbar;