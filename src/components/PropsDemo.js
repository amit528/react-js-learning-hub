import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserCard = ({ name, age }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2">Age: {age}</Typography>
    </CardContent>
  </Card>
);

const PropsDemo = () => {
  const users = [
    { name: 'John Doe', age: 28 },
    { name: 'Jane Smith', age: 34 }
  ];

  return (
    <div>
      <Typography variant="h4">Props Demo</Typography>
      {users.map((user, index) => <UserCard key={index} name={user.name} age={user.age} />)}
    </div>
  );
};

export default PropsDemo;
