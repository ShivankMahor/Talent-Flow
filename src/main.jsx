import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./app/providers/authProvider.jsx"
import { makeServer } from "./services/mirage/server";
import { seedDB } from "./db/seed";
import { BrowserRouter } from 'react-router-dom'

async function init() {
  makeServer();
  await seedDB();

  createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

init();