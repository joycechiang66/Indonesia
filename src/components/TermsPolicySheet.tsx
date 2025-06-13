import { Dialog, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface TermsPolicySheetProps {
  open: boolean;
  type: 'terms' | 'policy' | null;
  onClose: () => void;
}

const content = {
  terms: {
    title: 'Terms of Service',
    body: 'Here are the terms of service...'
  },
  policy: {
    title: 'Privacy Policy',
    body: 'Here is the privacy policy...'
  }
};

const TermsPolicySheet = ({ open, type, onClose }: TermsPolicySheetProps) => {
  if (!type) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
      <Box sx={{ textAlign: 'center', p: 2, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 700, mt: 2, fontSize: 18 }}>
          {content[type].title}
        </Typography>
        <Typography sx={{ mt: 1, mb: 2, fontSize: 15 }}>
          {content[type].body}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: '#009745', color: '#fff', borderRadius: 999, fontWeight: 700, fontSize: 18 }}
          onClick={onClose}
        >
          I agree
        </Button>
      </Box>
    </Dialog>
  );
};

export default TermsPolicySheet; 