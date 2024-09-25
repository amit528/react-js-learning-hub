import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavBar = (props) => {

  const handleLogout = () =>{
    props.setIsLoggedIn(false)
    props.handleMenu("logout")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          React Learning Hub
        </Typography>
        {!props.isLoggedIn ?
          <>
            <Button color="inherit" onClick={() => props.handleMenu("home")}>Home</Button>
            <Button color="success" variant='contained' onClick={() => props.handleMenu("login")}>Login</Button>
          </>
          :
          <>
            <Button color="inherit" onClick={() => props.handleMenu("product")}>Product</Button>
            <Button color="inherit" onClick={() => props.handleMenu("village")}>Village</Button>
            <Button color="inherit" onClick={() => props.handleMenu("props")}>Props</Button>
            <Button color="inherit" onClick={() => props.handleMenu("hooks")}>Hooks</Button>
            <Button color="inherit" onClick={() => props.handleMenu("context")}>Context</Button>
            <Button color="inherit" onClick={() => props.handleMenu("form")}>Form</Button>
            <Button color="inherit" onClick={() => props.handleMenu("pdc")}>PropsDemoCallback</Button>
            <Button color="error" variant='contained' onClick={() => handleLogout()}>Logout</Button>
          </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
