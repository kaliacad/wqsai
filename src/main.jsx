import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import TextProvider from './providers/TextProvider.jsx';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TextProvider>
    <App />
  </TextProvider>
);