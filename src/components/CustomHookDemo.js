import React from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { Typography } from '@mui/material';

const CustomHookDemo = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <Typography variant="h4">Custom Hook Demo: Window Size</Typography>
      <Typography variant="body1">Width: {width}px</Typography>
      <Typography variant="body1">Height: {height}px</Typography>
    </div>
  );
};

export default CustomHookDemo;
