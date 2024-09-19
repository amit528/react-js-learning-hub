import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const withLoading = (Component) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
    return <Component {...props} />;
  };
};

export default withLoading;
