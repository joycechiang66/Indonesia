import { Box, Typography, AppBar, Toolbar, Paper, Tabs, Tab, Button, Divider, List, ListItem, ListItemText, Chip, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import dayjs from 'dayjs';

const pointRecords = [
  { id: 1, type: 'earn', title: '消費回饋', date: '2024-06-01', amount: 100, desc: '於 Makkah Halal Restaurant 消費獲得點數' },
  { id: 2, type: 'use', title: '點數折抵', date: '2024-06-03', amount: -50, desc: '於 Medina Food Court 折抵消費' },
  { id: 3, type: 'earn', title: '活動贈點', date: '2024-06-05', amount: 200, desc: '參加開幕活動獲得點數' },
  { id: 4, type: 'use', title: '點數兌換', date: '2024-06-07', amount: -80, desc: '兌換商品' },
  { id: 5, type: 'earn', title: '每日簽到', date: '2024-06-08', amount: 10, desc: '每日簽到獲得點數' },
];

const availablePoints = pointRecords.reduce((sum, r) => sum + r.amount, 0);

const PointHome = () => {
  const [tab, setTab] = useState(0);
  const [filterDialog, setFilterDialog] = useState(false);
  const [monthFilter, setMonthFilter] = useState('');
  const [ruleDialog, setRuleDialog] = useState(false);

  const filteredRecords = pointRecords.filter(r => {
    if (tab === 1 && r.type !== 'earn') return false;
    if (tab === 2 && r.type !== 'use') return false;
    if (monthFilter && !r.date.startsWith(monthFilter)) return false;
    return true;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', pb: 7 }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ height: 44, minHeight: 44, justifyContent: 'center', bgcolor: '#fff', color: '#000', boxShadow: 'none', borderBottom: 'none', width: '100vw', maxWidth: '100vw' }}>
        <Toolbar sx={{ minHeight: 44, height: 44, px: 2, justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mx: 'auto', textAlign: 'center', width: '100%' }}>
            Point
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 可用點數 */}
      <Paper elevation={2} sx={{ mx: 2, mt: 3, mb: 2, p: 3, borderRadius: 3, textAlign: 'center', bgcolor: '#f9f9f9' }}>
        <Typography sx={{ color: '#838383', fontSize: 15 }}>可用點數</Typography>
        <Typography sx={{ fontSize: 40, fontWeight: 700, color: '#009745', my: 1 }}>{availablePoints}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Chip label="點數到期提醒：2024-07-01" color="warning" size="small" />
          <Button size="small" startIcon={<InfoOutlinedIcon />} sx={{ color: '#009745', fontWeight: 700 }} onClick={() => setRuleDialog(true)}>點數規則</Button>
        </Box>
      </Paper>

      {/* 篩選與Tabs */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 1 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ flex: 1 }}>
          <Tab label="全部" />
          <Tab label="獲得" />
          <Tab label="使用" />
        </Tabs>
        <IconButton onClick={() => setFilterDialog(true)}><FilterListIcon /></IconButton>
      </Box>

      {/* 篩選條件顯示 */}
      {monthFilter && (
        <Box sx={{ px: 2, mb: 1 }}>
          <Chip label={`月份：${monthFilter}`} onDelete={() => setMonthFilter('')} />
        </Box>
      )}

      {/* 點數明細 */}
      <Paper elevation={0} sx={{ mx: 2, mb: 2, p: 0, bgcolor: 'transparent' }}>
        <List>
          {filteredRecords.length === 0 && (
            <ListItem><ListItemText primary="查無資料" /></ListItem>
          )}
          {filteredRecords.map(r => (
            <ListItem key={r.id} sx={{ borderBottom: '1px solid #f0f0f0' }}>
              <ListItemText
                primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{r.title}</Typography>
                  <Chip label={r.type === 'earn' ? '獲得' : '使用'} color={r.type === 'earn' ? 'success' : 'default'} size="small" />
                </Box>}
                secondary={<>
                  <Typography sx={{ color: '#838383', fontSize: 14 }}>{r.desc}</Typography>
                  <Typography sx={{ color: '#bdbdbd', fontSize: 13 }}>{r.date}</Typography>
                </>}
              />
              <Typography sx={{ fontWeight: 700, color: r.amount > 0 ? '#009745' : '#888', fontSize: 18, minWidth: 60, textAlign: 'right' }}>{r.amount > 0 ? `+${r.amount}` : r.amount}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 篩選 Dialog */}
      <Dialog open={filterDialog} onClose={() => setFilterDialog(false)}>
        <DialogTitle>篩選條件</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 1 }}>
            <Typography sx={{ mb: 1 }}>依月份</Typography>
            {[...new Set(pointRecords.map(r => r.date.slice(0, 7)))].map(month => (
              <Chip key={month} label={month} onClick={() => { setMonthFilter(month); setFilterDialog(false); }} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* 點數規則 Dialog */}
      <Dialog open={ruleDialog} onClose={() => setRuleDialog(false)}>
        <DialogTitle>點數規則</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 1 }}>1. 點數可用於消費折抵、兌換商品等。</Typography>
          <Typography sx={{ mb: 1 }}>2. 點數獲得與使用明細可於本頁查詢。</Typography>
          <Typography sx={{ mb: 1 }}>3. 點數有效期限依活動公告為主，逾期自動失效。</Typography>
        </DialogContent>
      </Dialog>

      <BottomNavBar />
    </Box>
  );
};

export default PointHome; 