import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface TopBannerProps {
  username?: string;
  cardIcon?: React.ReactNode;
  cardTitle: string;
  cardValue: React.ReactNode;
}

const TopBanner: React.FC<TopBannerProps> = ({
  username = '',
  cardIcon,
  cardTitle,
  cardValue,
}) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: 220, bgcolor: 'transparent', overflow: 'visible', mb: 2 }}>
      {/* 背景 */}
      <Box sx={{ position: 'absolute', inset: 0, width: '100%', height: 220, zIndex: 0 }}>
        <img src="/Indonesia/images/backgrounds/Top.svg" alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </Box>
      {/* 歡迎詞 */}
      {username && (
        <Typography sx={{ position: 'absolute', left: 32, top: 32, color: '#fff', fontSize: 28, fontWeight: 700, zIndex: 3, textShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>{username}</Typography>
      )}
      {/* 浮起卡片 */}
      <Paper elevation={3} sx={{ position: 'absolute', left: '50%', bottom: -40, transform: 'translateX(-50%)', minWidth: 320, maxWidth: 380, width: '80%', p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)', bgcolor: 'rgba(255,255,255,0.95)', zIndex: 4 }}>
        {cardIcon}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: '#838383', fontSize: 16, fontWeight: 500 }}>{cardTitle}</Typography>
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#009745', mt: 0.5 }}>{cardValue}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TopBanner; 