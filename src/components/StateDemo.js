import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const StateDemo = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Typography variant="h4">State Management</Typography>
      <Typography variant="h6">Current Count: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>Increase</Button>
      <Button variant="outlined" onClick={() => setCount(count - 1)} sx={{ ml: 2 }}>Decrease</Button>
    </div>
  );
};

export default StateDemo;
