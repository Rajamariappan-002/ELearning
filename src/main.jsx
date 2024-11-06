import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports'; // Ensure this path is correct
import './index.css';
import App from './App.jsx';

// Configure Amplify with the imported configuration
Amplify.configure(awsmobile);

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);