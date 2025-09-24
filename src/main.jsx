import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './app/providers/AuthProvider'
import { makeServer } from "./services/mirage/server";
import { seedDB } from "./db/seed";
import { BrowserRouter } from 'react-router-dom'

if (process.env.NODE_ENV === "development") {
  makeServer();
}
seedDB();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>,
)
