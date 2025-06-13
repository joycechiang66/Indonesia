import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import TermsOfServiceLink from '../components/TermsOfServiceLink';
import PrivacyPolicyLink from '../components/PrivacyPolicyLink';
import TermsPolicySheet from '../components/TermsPolicySheet';

const MyProfileHome = () => {
  const [openSheet, setOpenSheet] = useState<'terms' | 'policy' | null>(null);
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
      <AppBar position="static" sx={{ height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 1, width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 44, height: 44, px: 2 }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ p: 2 }}>My Profile Home</Typography>
      <Typography sx={{ fontSize: 13, color: '#888', mt: 2 }}>
        <span onClick={() => setOpenSheet('terms')} style={{ cursor: 'pointer' }}>
          <TermsOfServiceLink />
        </span>
        {' '} &amp; {' '}
        <span onClick={() => setOpenSheet('policy')} style={{ cursor: 'pointer' }}>
          <PrivacyPolicyLink />
        </span>
      </Typography>
      <TermsPolicySheet open={!!openSheet} type={openSheet} onClose={() => setOpenSheet(null)} />
      <BottomNavBar />
    </Box>
  );
};

export default MyProfileHome; 