import React, { useContext } from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { ThemeContext } from './Context';

const ContextDemo = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Paper sx={{ p: 2, bgcolor: darkMode ? 'grey.900' : 'grey.100', color: darkMode ? 'white' : 'black' }}>
      <Typography variant="h4">Context API Demo</Typography>
      <Button variant="contained" onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
    </Paper>
  );
};

export default ContextDemo;
