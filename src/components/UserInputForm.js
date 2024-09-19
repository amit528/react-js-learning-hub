import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const UserInputForm = ({ sendDataToParent }) => {
  const [formData, setFormData] = useState({ name: '', age: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToParent(formData); // Send form data to parent component
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit">Submit</Button>
    </Box>
  );
};

export default UserInputForm;
