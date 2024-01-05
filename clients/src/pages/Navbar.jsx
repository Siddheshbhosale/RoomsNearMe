
//material UI import
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from "react";


//react import
import { NavLink } from 'react-router-dom';
import { isAuthenticated, signout } from "../services/authenticate";
import { useNavigate } from 'react-router-dom';


function Navbar() {
  // const [pages, setPages] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages,setPages] = useState([]);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [auth,setauth] = useState(isAuthenticated());
  const navigate = useNavigate();


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (e, setting) => {
    console.log(setting);
    if (setting == 'Logout') {
      signout(() => {
        navigate('/signin');
      })
    }
    setAnchorElUser(null);
  };


  useEffect(() => {
    if (isAuthenticated()) {
      setPages(["Dashboard","Home", "Roomate", "OnRent", "Buy"]);
    } else {
      setPages(["Home", "SignIn", "Signup"]);
    }
  },[isAuthenticated()]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* // mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center" onClick={handleCloseNavMenu}>
                    <NavLink to={`/${page.toLowerCase()}`} component={NavLink} style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active">
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>


          {/* // mobile view */}
          <HomeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RoomsNearMe
          </Typography>



          {/* Desport view */}
          <HomeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              //   letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <NavLink to={'/home'} component={NavLink} style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active">
              RoomsNearMe
            </NavLink>
          </Typography>


          {/* // Desktop view*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink to={`/${page.toLowerCase()}`} component={NavLink} style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active">
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>



          {/* Profile setting common */}
          <Box sx={{ flexGrow: 0, ml: 3 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {isAuthenticated() && 
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(e, setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            }
          
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
