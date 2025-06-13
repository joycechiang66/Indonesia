import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';

const ChatHome = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
    <AppBar position="static" sx={{ height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 1, width: '100vw', maxWidth: '100vw' }}>
      <Toolbar sx={{ minHeight: 44, height: 44, px: 2 }}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>
          Chat
        </Typography>
      </Toolbar>
    </AppBar>
    <Typography variant="h4" sx={{ p: 2 }}>Chat Home</Typography>
    <BottomNavBar />
  </Box>
);

export default ChatHome; 