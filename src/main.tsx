import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
