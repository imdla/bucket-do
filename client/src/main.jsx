import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 기본 css 리셋
import './styles/reset.css';
// 전역상태 css
import './styles/index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
