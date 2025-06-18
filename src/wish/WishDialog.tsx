import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useWish, Wish, mockMoods } from './WishContext';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface WishDialogProps {
  open: boolean;
  onClose: () => void;
  wish?: Wish;
}

const WishDialog: React.FC<WishDialogProps> = ({ open, onClose, wish }) => {
  const { addWish, updateWish } = useWish();
  const [formData, setFormData] = useState<Omit<Wish, 'id'>>({ title: '', description: '', mood: '', image: '' });

  useEffect(() => {
    if (wish) {
      setFormData({ title: wish.title, description: wish.description, mood: wish.mood, image: wish.image });
    } else {
      setFormData({ title: '', description: '', mood: '', image: '' });
    }
  }, [wish, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSave = () => {
    if (wish) {
      updateWish(wish.id, formData);
    } else {
      addWish(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.25rem', pt: 3 }}>
        {wish ? '編輯願望' : '新增願望'}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3 }}>
        <TextField
          fullWidth
          label="願望標題"
          variant="filled"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          sx={{ mb: 2, mt: 1 }}
        />
        <TextField
          fullWidth
          label="詳細描述"
          variant="filled"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Typography sx={{ mb: 1, fontWeight: 'medium' }}>選擇心情</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2, flexWrap: 'wrap' }}>
          {mockMoods.map(m => (
            <Box key={m.value} sx={{ textAlign: 'center', m: 0.5 }}>
              <IconButton
                onClick={() => setFormData({ ...formData, mood: m.value })}
                sx={{
                  bgcolor: formData.mood === m.value ? 'primary.main' : '#f0f0f0',
                  color: formData.mood === m.value ? 'white' : 'inherit',
                  width: 48, height: 48,
                  '&:hover': { bgcolor: formData.mood === m.value ? 'primary.dark' : '#e0e0e0' }
                }}
              >
                <span style={{ fontSize: 24 }}>{m.emoji}</span>
              </IconButton>
              <Typography variant="caption">{m.label}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            cursor: 'pointer',
            bgcolor: formData.image ? 'transparent' : '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 150
          }}
          component="label"
        >
          {formData.image ? (
            <img src={formData.image} alt="預覽" style={{ width: '100%', maxHeight: 150, borderRadius: 8, objectFit: 'cover' }} />
          ) : (
            <>
              <PhotoCamera sx={{ fontSize: 40, color: 'gray' }} />
              {/* <Typography>點擊上傳圖片</Typography> */}
            </>
          )}
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, px: 3 }}>
        <Button onClick={handleSave} color="error" variant="contained" fullWidth sx={{ borderRadius: 2, py: 1.5 }}>儲存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WishDialog; 