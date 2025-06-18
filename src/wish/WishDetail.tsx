import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useParams } from 'react-router-dom';
import { useWish, mockMoods } from './WishContext';
import WishDialog from './WishDialog';

const WishDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { wishes, deleteWish } = useWish();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const wish = wishes.find(w => w.id === Number(id));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (wish) {
      deleteWish(wish.id);
      navigate('/wish');
    }
  };

  if (!wish) {
    return <Typography>願望不存在</Typography>;
  }

  const mood = mockMoods.find(m => m.value === wish.mood);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', position: 'relative' }}>
      <AppBar position="static" sx={{ mt: '24px', backgroundColor: 'transparent', color: '#000', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            {wish.title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { setDialogOpen(true); handleMenuClose(); }}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => { handleDelete(); handleMenuClose(); }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
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
      </Box>
      {wish && <WishDialog open={dialogOpen} onClose={() => setDialogOpen(false)} wish={wish} />}
    </Box>
  );
};

export default WishDetail; 