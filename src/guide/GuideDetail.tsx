import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import guideContent from './guideContent'; // We'll extract guideContent to a separate file for reuse

const allDetails = [
  ...guideContent.rituals,
  ...guideContent.requirements,
  ...guideContent.tips,
];

const GuideDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = allDetails.find((item) => item.id === id);

  if (!detail) {
    return <Box p={3}><Typography>Not found.</Typography></Box>;
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5', p: 0, width: '100vw', maxWidth: '100vw', m: 0 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ m: 2 }}>Back</Button>
      <Box sx={{ width: '100vw', maxWidth: '100vw', bgcolor: 'white', borderRadius: 0, boxShadow: 2, p: 0, m: 0 }}>
        <img src={detail.image} alt={detail.title} style={{ width: '100vw', height: 220, objectFit: 'cover', borderRadius: 0, marginBottom: 16, display: 'block' }} />
        <Box sx={{ px: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{detail.title}</Typography>
          <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>{detail.description}</Typography>
          {/* Placeholder for detailed content */}
          <Typography variant="body2" sx={{ color: '#666' }}>
            詳細內容將放在這裡。請根據網路搜尋結果填入每個單元的詳細說明。
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GuideDetail; 