import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';

const StyledGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

const FeatureCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[1],
}));

const Home = () => {
  return (
    <Box className="container">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Your App
      </Typography>
      
      <Typography variant="h5" color="textSecondary" paragraph>
        This is a sample homepage for your React application. Customize it according to your needs.
      </Typography>

      <StyledGrid>
        <FeatureCard>
          <Typography variant="h6" gutterBottom>
            Feature 1
          </Typography>
          <Typography paragraph>
            Description of your first main feature. Explain what makes it special.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRight />}
            sx={{ mt: 'auto' }}
          >
            Learn More
          </Button>
        </FeatureCard>

        <FeatureCard>
          <Typography variant="h6" gutterBottom>
            Feature 2
          </Typography>
          <Typography paragraph>
            Description of your second main feature. Highlight its benefits.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRight />}
            sx={{ mt: 'auto' }}
          >
            Learn More
          </Button>
        </FeatureCard>

        <FeatureCard>
          <Typography variant="h6" gutterBottom>
            Feature 3
          </Typography>
          <Typography paragraph>
            Description of your third main feature. Emphasize its value.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRight />}
            sx={{ mt: 'auto' }}
          >
            Learn More
          </Button>
        </FeatureCard>
      </StyledGrid>
    </Box>
  );
};

export default Home; 