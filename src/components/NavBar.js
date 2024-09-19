import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          React Learning Hub
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/state">State</Button>
        <Button color="inherit" component={Link} to="/props">Props</Button>
        <Button color="inherit" component={Link} to="/hooks">Hooks</Button>
        <Button color="inherit" component={Link} to="/context">Context</Button>
        <Button color="inherit" component={Link} to="/form">Form</Button>
        <Button color="inherit" component={Link} to="/propscallback">PropsDemoCallback</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
