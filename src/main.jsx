import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </React.StrictMode>,
)
