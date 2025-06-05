import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { StagewiseToolbar } from '@stagewise/toolbar-react'

const stagewiseConfig = {
  plugins: []
};

// Create root for main app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

// Initialize Stagewise toolbar in development mode
if (process.env.NODE_ENV === 'development') {
  const toolbarRoot = document.createElement('div');
  toolbarRoot.id = 'stagewise-root';
  document.body.appendChild(toolbarRoot);
  
  ReactDOM.createRoot(toolbarRoot).render(
    <StagewiseToolbar config={stagewiseConfig} />
  );
}
