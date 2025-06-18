import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useWish, mockMoods } from './WishContext';
import WishDialog from './WishDialog';

// TODO: 之後可改為 context 或 props 傳遞
const mockWish = {
  id: 1,
  title: 'World Peace',
  description: 'I wish for world peace, where all nations live in harmony and understanding, free from conflict and violence. May compassion and empathy guide our actions, fostering a world of cooperation and shared prosperity.',
  mood: 'hopeful',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
};

const WishDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { wishes, deleteWish } = useWish();
  const wish = wishes.find(w => w.id === Number(id));
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!wish) {
    return <Typography>願望不存在</Typography>;
  }

  const mood = mockMoods.find(m => m.value === wish.mood);

  const handleDelete = () => {
    deleteWish(wish.id);
    navigate('/wish');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
      <AppBar position="static" sx={{ height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 'none', borderBottom: 'none', width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 44, height: 44, px: 1, justifyContent: 'flex-start' }}>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, ml: 1 }}>
            Wish Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, pt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{wish.title}</Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>{wish.description}</Typography>
        {wish.image && (
          <Box sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <img src={wish.image} alt={wish.title} style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12 }} />
          </Box>
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Mood</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <span style={{ fontSize: 24 }}>{mood?.emoji}</span>
          <Typography variant="body1">{mood?.label}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="outlined" startIcon={<EditIcon />} color="inherit" onClick={() => setDialogOpen(true)}>Edit</Button>
          <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>Delete</Button>
        </Box>
      </Box>
      <WishDialog open={dialogOpen} onClose={() => setDialogOpen(false)} wish={wish} />
    </Box>
  );
};

export default WishDetail; 