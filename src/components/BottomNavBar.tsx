import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExploreIcon from '@mui/icons-material/Explore';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Chat', icon: <ChatIcon />, path: '/chat' },
  { label: 'Wish', icon: <FavoriteIcon />, path: '/wish' },
  { label: 'Journey', icon: <ExploreIcon />, path: '/journey' },
  { label: 'Point', icon: <StarIcon />, path: '/point' },
  { label: 'MyProfile', icon: <PersonIcon />, path: '/myprofile' },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = navItems.findIndex(item => location.pathname.startsWith(item.path));
  const [value, setValue] = useState(currentIndex === -1 ? 0 : currentIndex);

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
    navigate(navItems[newValue].path);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300, width: '100vw', maxWidth: '100vw' }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        {navItems.map((item, idx) => (
          <BottomNavigationAction key={item.label} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar; 