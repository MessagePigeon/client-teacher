import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './i18n';

if (import.meta.env.VITE_MOCK) {
  const { worker } = await import('./mocks/browser');
  const { generateMockDatabase } = await import('./mocks/database');
  generateMockDatabase();
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
