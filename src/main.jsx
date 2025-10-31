import React from 'react'
import { createRoot } from 'react-dom/client'
import NyayBuddyApp from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NyayBuddyApp />
  </React.StrictMode>
)
