import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './services/firebase-services.ts';
import './index.css';
import RoutesConfig from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesConfig />
  </StrictMode>,
);
