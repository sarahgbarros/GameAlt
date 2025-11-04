import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './main.css';

const root = ReactDom.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);