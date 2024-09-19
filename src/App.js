import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import NavBar from './components/NavBar';
import StateDemo from './components/StateDemo';
import PropsDemo from './components/PropsDemo';
import HooksDemo from './components/HooksDemo';
import ContextDemo from './components/ContextDemo';
import FormDemo from './components/FormDemo';
import PropsDemoCallback from './components/PropsDemoCallback';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<h1>Welcome to React Learning Hub</h1>} />
          <Route path="/state" element={<StateDemo />} />
          <Route path="/props" element={<PropsDemo />} />
          <Route path="/hooks" element={<HooksDemo />} />
          <Route path="/context" element={<ContextDemo />} />
          <Route path="/form" element={<FormDemo />} />
          <Route path="/propscallback" element={<PropsDemoCallback />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
