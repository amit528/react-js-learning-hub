import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import ChildComponent from './ChildrenDemo';

const StateDemo = () => {
  const [count, setCount] = useState(0);
  const [childMessage, setChildMessage] = useState("");

  // Callback function to receive data from child
  const handleChildData = (message) => {
    setChildMessage(message);
  };

  return (
    <Box>
      <Typography variant="h4">State Management with Callback</Typography>
      <Typography variant="h6">Current Count: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>Increase</Button>
      <Button variant="outlined" onClick={() => setCount(count - 1)} sx={{ ml: 2 }}>Decrease</Button>

      <ChildComponent sendDataToParent={handleChildData} />
      {childMessage && <Typography variant="body1" sx={{ mt: 2 }}>Message from Child: {childMessage}</Typography>}
    </Box>
  );
};

export default StateDemo;
