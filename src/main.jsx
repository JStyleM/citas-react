import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Borra el StrictMode para no visualizar el doble renderizado que aparece en la Consola
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
)
