import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import OtpVerify from './pages/home/OtpVerify';
import OtpOld from './pages/home/OtpOld';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/Indonesia">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/otp" element={<OtpVerify />} />
            <Route path="/otp-old" element={<OtpOld />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
