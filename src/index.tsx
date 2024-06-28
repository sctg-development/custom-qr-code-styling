import React from 'react'
import ReactDOM from 'react-dom/client'
import ContextProvider from './Context'
import App from './App'
import './bootstrap.min.css'
import './App.css'

const container = document.getElementById('root');
if (!container) throw new Error('Container not found');
const root = ReactDOM.createRoot(container); // Créez le root avec le conteneur
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
