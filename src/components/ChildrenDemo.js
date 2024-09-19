import React from 'react';
import { Button } from '@mui/material';

const ChildComponent = ({ sendDataToParent }) => {
  const sendMessageToParent = () => {
    sendDataToParent("Hello from the Child Component!");
  };

  return (
    <Button variant="contained" color="secondary" onClick={sendMessageToParent} sx={{ mt: 2 }}>
      Send Message to Parent
    </Button>
  );
};

export default ChildComponent;
