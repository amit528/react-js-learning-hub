import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const FormDemo = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4">Form Handling Demo</Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit">Submit</Button>
      {submitted && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Submitted Data: {JSON.stringify(formData)}
        </Typography>
      )}
    </Box>
  );
};

export default FormDemo;
