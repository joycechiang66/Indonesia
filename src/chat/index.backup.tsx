import { Box, Typography, AppBar, Toolbar, Paper, Dialog, Slide, IconButton, Divider } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

const shops = [
  {
    id: 1,
    name: 'Makkah Halal Restaurant',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    description: '提供正宗印尼與中東料理，適合朝聖旅客用餐休息。',
    halal: true,
    pointDiscount: 20,
    tags: ['24小時', 'WiFi', '空調'],
    address: 'King Abdul Aziz Rd, Mecca, Saudi Arabia',
    phone: '+966 12 123 4567',
  },
  {
    id: 2,
    name: 'Medina Food Court',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80',
    description: '多樣化餐飲選擇，支持點數折抵，鄰近清真寺。',
    halal: true,
    pointDiscount: 15,
    tags: ['家庭友善', '近清真寺'],
    address: 'Al Haram, Medina, Saudi Arabia',
    phone: '+966 14 765 4321',
  },
  {
    id: 3,
    name: 'Desert Cafe',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: '咖啡、甜點與輕食，旅途中最佳休憩站。',
    halal: false,
    pointDiscount: 10,
    tags: ['咖啡', '甜點'],
    address: 'Jabal Al Nour, Mecca, Saudi Arabia',
    phone: '+966 12 987 6543',
  },
  {
    id: 4,
    name: 'Jakarta Sate House',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    description: '主打沙嗲串燒與印尼家常菜，適合團體聚餐。',
    halal: true,
    pointDiscount: 12,
    tags: ['沙嗲', '團體聚餐'],
    address: 'Jl. Thamrin No.10, Jakarta, Indonesia',
    phone: '+62 21 555 1234',
  },
  {
    id: 5,
    name: 'Bali Vegan Eatery',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
    description: '健康素食餐廳，提供多款蔬食與果汁。',
    halal: true,
    pointDiscount: 18,
    tags: ['素食', '健康', '果汁'],
    address: 'Jl. Raya Ubud No.88, Bali, Indonesia',
    phone: '+62 361 123 4567',
  },
  {
    id: 8,
    name: 'Yogyakarta Sweet Corner',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: '甜點、糕點與下午茶，適合休憩放鬆。',
    halal: true,
    pointDiscount: 16,
    tags: ['甜點', '下午茶'],
    address: 'Jl. Malioboro No.50, Yogyakarta, Indonesia',
    phone: '+62 274 123 7890',
  },
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShopHome = () => {
  const [openShop, setOpenShop] = React.useState(null as null | typeof shops[0]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
      <AppBar position="static" sx={{ mt: '24px', height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 'none', borderBottom: 'none', width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 44, height: 44, px: 2, justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mx: 'auto', textAlign: 'center', width: '100%' }}>
            Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, pt: 3 }}>
        {shops.map(shop => (
          <Paper key={shop.id} elevation={2} sx={{ mb: 3, p: 2, borderRadius: 3, display: 'flex', gap: 2, cursor: 'pointer' }} onClick={() => setOpenShop(shop)}>
            <Box sx={{ minWidth: 90, width: 90, height: 90, borderRadius: 2, overflow: 'hidden', bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={shop.image} alt={shop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.src = '/images/shops/default.jpg'; }} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>{shop.name}</Typography>
                  {shop.halal && <CheckCircleIcon sx={{ color: '#009745', fontSize: 20 }} titleAccess="清真認證" />}
                </Box>
                <Typography sx={{ color: '#666', fontSize: 15, mt: 0.5 }}>{shop.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                  {shop.tags.map(tag => (
                    <Box key={tag} sx={{ bgcolor: '#f0f0f0', color: '#009745', fontSize: 12, px: 1.2, py: 0.2, borderRadius: 1, mr: 0.5 }}>{tag}</Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <LocalOfferIcon sx={{ color: '#ff9800', fontSize: 18 }} />
                <Typography sx={{ fontSize: 14, color: '#ff9800' }}>點數折抵 {shop.pointDiscount}%</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      {/* Bottom Sheet 詳情 */}
      <Dialog
        fullScreen={false}
        open={!!openShop}
        onClose={() => setOpenShop(null)}
        TransitionComponent={Transition as any}
        PaperProps={{
          sx: {
            position: 'fixed',
            m: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: '100vw',
            maxWidth: '100vw',
            bgcolor: '#fff',
            boxShadow: 6,
            p: 0,
          }
        }}
        sx={{ zIndex: 2002 }}
      >
        {openShop && (
          <Box>
            <Box sx={{ width: 40, height: 5, bgcolor: '#ccc', borderRadius: 3, mx: 'auto', mt: 1.5, mb: 1.5 }} />
            <IconButton onClick={() => setOpenShop(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <Box sx={{ p: 3, pt: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <img src={openShop.image} alt={openShop.name} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20 }}>{openShop.name}</Typography>
                  {openShop.halal && <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}><CheckCircleIcon sx={{ color: '#009745', fontSize: 18 }} /><Typography sx={{ fontSize: 13, color: '#009745' }}>清真認證</Typography></Box>}
                </Box>
              </Box>
              <Typography sx={{ color: '#666', fontSize: 15, mb: 1 }}>{openShop.description}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                {openShop.tags.map(tag => (
                  <Box key={tag} sx={{ bgcolor: '#f0f0f0', color: '#009745', fontSize: 12, px: 1.2, py: 0.2, borderRadius: 1, mr: 0.5 }}>{tag}</Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalOfferIcon sx={{ color: '#ff9800', fontSize: 18 }} />
                <Typography sx={{ fontSize: 14, color: '#ff9800' }}>點數折抵 {openShop.pointDiscount}%</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 0.5 }}>地址</Typography>
              <Typography sx={{ fontSize: 15, color: '#333', mb: 1 }}>{openShop.address}</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 0.5 }}>電話</Typography>
              <Typography sx={{ fontSize: 15, color: '#333' }}>{openShop.phone}</Typography>
            </Box>
          </Box>
        )}
      </Dialog>
      <BottomNavBar />
    </Box>
  );
};

export default ShopHome; 