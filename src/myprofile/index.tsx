import { Box, Typography, AppBar, Toolbar, IconButton, Switch, Divider, Paper, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyProfileHome = () => {
  const [openSheet, setOpenSheet] = useState<'terms' | 'policy' | null>(null);
  const [notifDialogOpen, setNotifDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  // 讀取 localStorage user name
  const userName = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.name || 'Agus Wibowo';
    } catch {
      return 'Agus Wibowo';
    }
  })();
  // 讀取 localStorage user phone
  const userPhone = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.phone || '987657800298272829';
    } catch {
      return '987657800298272829';
    }
  })();
  const [name, setName] = useState(userName);
  const [editName, setEditName] = useState(userName);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // 根據 name 自動生成頭像
  useEffect(() => {
    if (name) {
      const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=240&background=e0e0e0&color=009745`;
      setAvatarUrl(url);
    }
  }, [name]);

  const handleEditSave = () => {
    setName(editName);
    setEditOpen(false);
  };

  // 日期顯示格式
  const formatDate = (date: Dayjs | null) => {
    return date ? date.format('MMM D, YYYY') : '';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
      {/* 頂部 AppBar */}
      <AppBar position="static" sx={{ height: 54, minHeight: 54, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 'none', width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 54, height: 54, px: 2, justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 個人資訊區塊 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Avatar
          src={avatarUrl || '/images/avatar-default.png'}
          sx={{ width: 120, height: 120, bgcolor: '#e0e0e0', mb: 2, fontSize: 64 }}
          imgProps={{ style: { objectFit: 'cover' } }}
        >
          {!avatarUrl && <PersonIcon sx={{ fontSize: 64, color: '#bdbdbd' }} />}
        </Avatar>
      </Box>
      <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, mt: 2, mb: 1, borderRadius: 3, bgcolor: '#f9f9f9' }}>
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#000' }}>Hi {name}</Typography>
          <Typography sx={{ color: '#838383', fontSize: 16 }}>{userPhone}</Typography>
        </Box>
        <IconButton color="primary" onClick={() => { setEditName(name); setEditOpen(true); }}>
          <EditIcon sx={{ color: '#009745' }} />
        </IconButton>
      </Paper>

      {/* My Hajj 分組 */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Typography sx={{ color: 'rgba(60,60,67,0.6)', fontSize: 14, mb: 0.5 }}>My Hajj</Typography>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Departure Day</Typography>
          </Box>
          <Box
            sx={{ bgcolor: 'rgba(120,120,128,0.12)', borderRadius: 1, px: 2, py: 0.5, cursor: 'pointer' }}
            onClick={() => setDateDialogOpen(true)}
          >
            <Typography sx={{ color: '#007aff', fontSize: 17 }}>{formatDate(departureDate)}</Typography>
          </Box>
        </Paper>
      </Box>
      <Dialog open={dateDialogOpen} onClose={() => setDateDialogOpen(false)}>
        <Box sx={{ p: 3, minWidth: 320 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Departure Day"
              value={departureDate}
              minDate={dayjs().add(1, 'day')}
              onChange={newValue => setDepartureDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: '#009745', color: '#fff', borderRadius: 2 }}
            onClick={() => setDateDialogOpen(false)}
            fullWidth
          >
            確認
          </Button>
        </Box>
      </Dialog>
      <Divider />

      {/* Notifications 分組 */}
      <Box sx={{ px: 3, mb: 2, mt: 2 }}>
        <Typography sx={{ color: 'rgba(60,60,67,0.6)', fontSize: 14, mb: 0.5 }}>Notifications</Typography>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>New message</Typography>
          </Box>
          <Switch
            checked={false}
            onChange={() => {
              setNotifDialogOpen(true);
            }}
            color="success"
          />
        </Paper>
      </Box>
      <Divider />

      {/* System 分組 */}
      <Box sx={{ px: 3, mb: 2, mt: 2 }}>
        <Typography sx={{ color: 'rgba(60,60,67,0.6)', fontSize: 14, mb: 0.5 }}>System</Typography>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GTranslateIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Change language</Typography>
          </Box>
          <Typography sx={{ color: 'rgba(60,60,67,0.6)', fontSize: 17, mr: 2 }}>Coming soon</Typography>
        </Paper>
      </Box>
      <Divider />

      {/* General 分組 */}
      <Box sx={{ px: 3, mb: 2, mt: 2 }}>
        <Typography sx={{ color: 'rgba(60,60,67,0.6)', fontSize: 14, mb: 0.5 }}>General</Typography>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HelpOutlineIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Help center</Typography>
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent', cursor: 'pointer' }} onClick={() => setOpenSheet('terms')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Terms of service</Typography>
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent', cursor: 'pointer' }} onClick={() => setOpenSheet('policy')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WalletIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Privacy Policy</Typography>
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, px: 0, bgcolor: 'transparent' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WalletIcon sx={{ color: '#000', mr: 1 }} />
            <Typography sx={{ fontSize: 17, color: '#000' }}>Version</Typography>
          </Box>
          <Typography sx={{ color: '#838383', fontSize: 14, mr: 2 }}>V1.1.0</Typography>
        </Paper>
      </Box>

      {/* Bottom Sheet 條款與隱私 */}
      <Slide direction="up" in={!!openSheet} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2001,
            display: 'flex',
            alignItems: 'flex-end',
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(16px)',
            height: '100vh',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(255,255,255,0.95)',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: 'flex',
              flexDirection: 'column',
              pb: 2,
              boxShadow: 3,
            }}
          >
            <Box sx={{ width: 40, height: 5, bgcolor: '#ccc', borderRadius: 3, mx: 'auto', mt: 1, mb: 1.5 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', mb: 1 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{openSheet === 'terms' ? 'Terms of service' : 'Privacy Policy'}</Typography>
              <Button
                onClick={() => setOpenSheet(null)}
                sx={{ position: 'absolute', right: 8, top: '50%', minWidth: 'auto', p: 1, transform: 'translateY(-50%)', color: '#000' }}
              >
                <img src={import.meta.env.BASE_URL + 'images/icons/Close=25.svg'} alt="close" style={{ width: 25, height: 25 }} />
              </Button>
            </Box>
            {/* 你可以在這裡加入條款或隱私內容 */}
          </Box>
        </Box>
      </Slide>

      {/* 底部導航欄 */}
      <BottomNavBar />

      {/* 編輯姓名 Dialog */}
      <Dialog
        fullScreen
        open={editOpen}
        onClose={() => setEditOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{ sx: { bgcolor: '#fff' } }}
      >
        {/* 上方導航欄 */}
        <Box sx={{ position: 'relative', height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #eee' }}>
          <IconButton onClick={() => setEditOpen(false)} sx={{ position: 'absolute', left: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>My Profile</Typography>
        </Box>
        {/* 內容區 */}
        <Box sx={{ pt: 8, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 396, mb: 4 }}>
            <Typography sx={{ color: '#000', fontSize: 14, mb: 1 }}>
              Name <span style={{ color: '#ff0000' }}>*</span>
            </Typography>
            <Box sx={{ borderBottom: '1px solid #d9d9d9', mb: 3 }}>
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  color: '#000',
                  background: 'transparent',
                  padding: '8px 0',
                  fontFamily: 'inherit',
                }}
                maxLength={30}
              />
            </Box>
          </Box>
          <Box sx={{ width: '100%', maxWidth: 396 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#009745',
                color: '#fff',
                borderRadius: 40,
                fontWeight: 700,
                fontSize: 16,
                py: 1.5,
                boxShadow: 'none',
                mt: 2,
                '&:hover': { bgcolor: '#007a3d' },
              }}
              onClick={handleEditSave}
              disabled={!editName.trim()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* 通知權限 Dialog */}
      <Dialog open={notifDialogOpen} onClose={() => setNotifDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18 }}>MakkahGo wants to send a notification</DialogTitle>
        <DialogContent sx={{ fontSize: 16, color: '#333' }}>
          Please enable notification permission
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotifDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={() => { setNotifDialogOpen(false); /* 可在此導向設定頁 */ }} color="primary">Settings</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyProfileHome; 