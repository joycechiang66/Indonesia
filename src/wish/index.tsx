import React, { useState } from 'react';
import { Box, Typography, Fab, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import { useWish, Wish, mockMoods } from './WishContext';
import WishDialog from './WishDialog';
import TopBanner from '../components/TopBanner';

const WishList: React.FC = () => {
  const { wishes } = useWish();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  // 點擊卡片跳轉詳情頁
  const handleCardClick = (wish: Wish) => {
    navigate(`/wish/${wish.id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 14, position: 'relative', background: '#f5f5f5', width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <TopBanner
        username="Hi Agus Wibowo"
        cardIcon={<img src="/Indonesia/images/icons/wallet50.svg" alt="wish" style={{ width: 48, height: 48, background: '#fff3e0', borderRadius: 24 }} />}
        cardTitle="Points"
        cardValue={590}
      />
      <Box sx={{ p: 2, pt: 2.5, width: '100%', pb: 8 }}>
        {wishes.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', mt: 8 }}>
            目前沒有願望，快來許下你的願望吧！
          </Typography>
        ) : (
          wishes.map((wish) => (
            <Paper key={wish.id} elevation={3} sx={{ width: '100%', mt: 2, p: 2, borderRadius: 3, display: 'flex', gap: 2, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', bgcolor: 'rgba(255,255,255,0.95)' }} onClick={() => handleCardClick(wish)}>
              {wish.image && (
                <img src={wish.image} alt={wish.title} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', marginRight: 16 }} />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{wish.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  心情{mockMoods.find(m => m.value === wish.mood)?.label || ''}
                </Typography>
              </Box>
            </Paper>
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