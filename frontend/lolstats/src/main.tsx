import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import ChampBuilder from './pages/ChampBuilder.tsx';
import Nav from './components/Nav.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/champ-builder" element={<ChampBuilder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
