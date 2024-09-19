import React, { useState, useMemo } from 'react';
import { Typography, Button } from '@mui/material';

const ExpensiveComponent = React.memo(({ number }) => {
  console.log('Expensive component rendered');
  const computeFactorial = (n) => {
    if (n <= 1) return 1;
    return n * computeFactorial(n - 1);
  };

  const factorial = computeFactorial(number);

  return (
    <Typography variant="body1">Factorial of {number} is: {factorial}</Typography>
  );
});

const MemoDemo = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(5);

  // useMemo to optimize expensive calculation
  const squaredNumber = useMemo(() => {
    console.log('Squaring number');
    return number * number;
  }, [number]);

  return (
    <div>
      <Typography variant="h4">React Memo and useMemo</Typography>
      <Typography variant="body1">Squared Number: {squaredNumber}</Typography>
      <ExpensiveComponent number={number} />
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </Button>
      <Button variant="outlined" onClick={() => setNumber(number + 1)} sx={{ ml: 2 }}>
        Increment Number ({number})
      </Button>
    </div>
  );
};

export default MemoDemo;
