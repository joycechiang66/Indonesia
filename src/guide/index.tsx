import { Box, Typography, Paper, Dialog, IconButton } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import TopBanner from '../components/TopBanner';
import { useNavigate } from 'react-router-dom';
import guideContent from './guideContent';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
// import TermsOfServiceLink from '../components/TermsOfServiceLink';

// Define a type for guide card
interface GuideCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const GuideHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<GuideCard | null>(null);

  const handleOpen = (detail: GuideCard) => {
    setSelectedDetail(detail);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDetail(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 7, position: 'relative', background: '#f5f5f5', width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <TopBanner
        username="Hi Agus Wibowo"
        cardIcon={<img src="/Indonesia/images/icons/wallet50.svg" alt="guide" style={{ width: 48, height: 48, background: '#fff3e0', borderRadius: 24 }} />}
        cardTitle="Points"
        cardValue={590}
      />
      
      <Box sx={{ p: 2, pt: 4 }}>
        {/* Rituals Section */}
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mb: 2, color: '#333' }}>
          Rituals
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {guideContent.rituals.map((ritual) => (
            <Paper key={ritual.id} elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', cursor: 'pointer' }} onClick={() => handleOpen(ritual)}>
              <Box sx={{ width: '100%', height: 120, borderRadius: 2, overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                <img 
                  src={ritual.image} 
                  alt={ritual.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/Indonesia/images/guide/default.jpg';
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#333', mb: 0.5 }}>
                  {ritual.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666' }}>
                  {ritual.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Requirements Section */}
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mb: 2, mt: 4, color: '#333' }}>
          Requirements
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {guideContent.requirements.map((req) => (
            <Paper key={req.id} elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', cursor: 'pointer' }} onClick={() => handleOpen(req)}>
              <Box sx={{ width: '100%', height: 120, borderRadius: 2, overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                <img 
                  src={req.image} 
                  alt={req.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/Indonesia/images/guide/default.jpg';
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#333', mb: 0.5 }}>
                  {req.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666' }}>
                  {req.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Practical Tips Section */}
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, mb: 2, mt: 4, color: '#333' }}>
          Practical Tips
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
          {guideContent.tips.map((tip) => (
            <Paper key={tip.id} elevation={2} sx={{ p: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%', cursor: 'pointer' }} onClick={() => handleOpen(tip)}>
              <Box sx={{ width: '100%', height: 120, borderRadius: 2, overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                <img 
                  src={tip.image} 
                  alt={tip.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/Indonesia/images/guide/default.jpg';
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#333', mb: 0.5 }}>
                  {tip.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#666' }}>
                  {tip.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
      <BottomNavBar />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 0 } }}>
        <Box sx={{ position: 'relative', width: '100%', p: 0 }}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
            <CloseIcon />
          </IconButton>
          {selectedDetail && (
            <Box sx={{ pt: 5, px: 2, pb: 2 }}>
              <Box sx={{ width: '100%', height: 180, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                <img src={selectedDetail.image} alt={selectedDetail.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{selectedDetail.title}</Typography>
              <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>{selectedDetail.description}</Typography>
              {/* 可放詳細內容區塊 */}
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default GuideHome; 