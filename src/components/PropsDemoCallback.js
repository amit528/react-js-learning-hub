import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import UserInputForm from './UserInputForm';

const PropsDemoCallback = () => {
  const [userData, setUserData] = useState({ name: "", age: "" });

  // Callback function to handle data from the child form
  const handleFormData = (data) => {
    setUserData(data);
  };

  return (
    <Box>
      <Typography variant="h4">Props Demo with Callback</Typography>
      <Typography variant="h6">Data from Child Form:</Typography>
      <Typography variant="body1">Name: {userData.name || "N/A"}</Typography>
      <Typography variant="body1">Age: {userData.age || "N/A"}</Typography>

      <UserInputForm sendDataToParent={handleFormData} />
    </Box>
  );
};

export default PropsDemoCallback;
