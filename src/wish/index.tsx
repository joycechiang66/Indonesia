import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { useWish, Wish, mockMoods } from './WishContext';
import WishDialog from './WishDialog';

const WishList: React.FC = () => {
  const { wishes } = useWish();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  // 點擊卡片跳轉詳情頁
  const handleCardClick = (wish: Wish) => {
    navigate(`/wish/${wish.id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f0f0', pb: 7, position: 'relative' }}>
      <AppBar position="static" sx={{ height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 'none', borderBottom: 'none', width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 44, height: 44, px: 2, justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mx: 'auto', textAlign: 'center', width: '100%' }}>
            My wish
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {wishes.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', mt: 8 }}>
            目前沒有願望，快來許下你的願望吧！
          </Typography>
        ) : (
          wishes.map((wish) => (
            <Box key={wish.id} sx={{ width: '100%', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#fff',
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  p: 2,
                  cursor: 'pointer',
                  width: '100%'
                }}
                onClick={() => handleCardClick(wish)}
              >
                {wish.image && (
                  <img src={wish.image} alt={wish.title} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', marginRight: 16 }} />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{wish.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    心情{mockMoods.find(m => m.value === wish.mood)?.label || ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
      <Fab aria-label="add" sx={{ position: 'fixed', right: 32, bottom: 62, backgroundColor: '#009745', color: 'white', '&:hover': { backgroundColor: '#009745' } }} onClick={() => setDialogOpen(true)}>
        <AddIcon />
      </Fab>
      <WishDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <BottomNavBar />
    </Box>
  );
};

export default WishList; 