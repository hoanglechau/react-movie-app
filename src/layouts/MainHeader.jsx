import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import MoreIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import MSearchBar from "../components/MSearchBar";
import { useAuth } from "../contexts/AuthContext";

export default function PrimarySearchAppBar() {
  let location = useLocation();
  let auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    console.log(location);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    handleMenuClose(); //menu close before signout so that login won't pop up.
    auth.signout();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth.user ? (
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/favorite"
            onClick={handleMenuClose}
          >
            {auth.user}
          </Button>
          <Button color="inherit" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/form"
          state={{ backgroundLocation: location, from: location }}
          onClick={handleMenuClose}
        >
          Login
        </Button>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/discovery/1">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<YouTubeIcon />}
        />
        <p>Discovery</p>
      </MenuItem>

      <MenuItem component={Link} to="/favorite">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<StarIcon />}
        />

        <p>Favorite</p>
      </MenuItem>
      <MenuItem component={Link} to="/form">
        <IconButton
          size="large"
          //cool styling ui props
          aria-label="account of current user"
          aria-controls={menuId}
          disableRipple={true}
          aria-haspopup="true"
          color="inherit"
          children={<AccountCircle />}
        />

        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 0.1 }} />
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/"
            color="inherit"
            sx={{ textDecoration: "none", p: 0 }}
          >
            HMDB
          </Button>
          <Box sx={{ flexGrow: 0.05 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              component={Link}
              to="/movie/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0, mr: 3 }}
            >
              Movies
            </Button>
            <Button
              component={Link}
              to="/tv/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0, mr: 3 }}
            >
              TV Shows
            </Button>
            <Button
              component={Link}
              to="/person/popular/1"
              variant="text"
              size="medium"
              color="inherit"
              sx={{ textDecoration: "none", p: 0 }}
            >
              People
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <MSearchBar />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              component={Link}
              to="/favorite"
              size="large"
              color="inherit"
              children={<AddIcon />}
            />

            <IconButton
              size="large"
              //cool styling ui props
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              children={<AccountCircle />}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0.1 }} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
