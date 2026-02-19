import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from "./App.jsx";
import './App.css'
import { ModeProvider } from "./context/ModeContext";
import { TitlesProvider } from "./context/TitlesContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <TitlesProvider>
        <App />
      </TitlesProvider>
    </ModeProvider>
  </StrictMode>
)
