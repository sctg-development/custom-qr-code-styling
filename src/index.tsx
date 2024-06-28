import React from 'react'
import ReactDOM from 'react-dom'
import ContextProvider from './Context'
import App from './App'
import './bootstrap.min.css'
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

