import { Box, Typography, Paper, List, ListItem, ListItemText, Avatar } from '@mui/material';
import BottomNavBar from '../components/BottomNavBar';
import TopBanner from '../components/TopBanner';

const pointRecords = [
  { id: 1, type: 'earn', title: 'Points Deposited', date: '2025/02/20 hh:mm', amount: 100, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 2, type: 'use', title: 'Points Used', date: '2025/02/19 hh:mm', amount: -40, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 3, type: 'earn', title: 'Points Deposited', date: '2025/02/18 hh:mm', amount: 60, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 4, type: 'use', title: 'Points Used', date: '2025/02/17 hh:mm', amount: -40, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 5, type: 'earn', title: 'Points Deposited', date: '2025/02/16 hh:mm', amount: 50, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 6, type: 'use', title: 'Points Used', date: '2025/02/15 hh:mm', amount: -40, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
  { id: 7, type: 'earn', title: 'Points Deposited', date: '2025/02/14 hh:mm', amount: 500, desc: 'Reason for points issuanceReason for points issuanceReason for points issuanceReason' },
];

const availablePoints = pointRecords.reduce((sum, r) => sum + r.amount, 0);

const PointHome = () => {
  return (
    <Box sx={{ minHeight: '100vh', pb: 7, position: 'relative', background: '#f5f5f5', width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <TopBanner
        username="Hi Agus Wibowo"
        cardIcon={<img src="/Indonesia/images/icons/wallet50.svg" alt="wallet" style={{ width: 48, height: 48, background: '#fff3e0', borderRadius: 24 }} />}
        cardTitle="Points"
        cardValue={availablePoints}
      />

      {/* 點數明細 */}
      <Box sx={{ mx: 3, mt: 6.5, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 3, pb: 2 }}>
        <List sx={{ px: 2 }}>
          {pointRecords.map(r => (
            <ListItem key={r.id} alignItems="flex-start" sx={{ px: 0, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
              <ListItemText
                primary={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>{r.title}</Typography>
                  <Typography sx={{ color: '#bdbdbd', fontSize: 13 }}>{r.date}</Typography>
                </Box>}
                secondary={<>
                  <Typography sx={{ color: '#838383', fontSize: 14, mt: 0.5 }}>{r.desc}</Typography>
                </>}
              />
              <Typography sx={{ fontWeight: 700, fontSize: 20, minWidth: 60, textAlign: 'right', color: r.amount > 0 ? '#009745' : '#ff9800' }}>{r.amount > 0 ? `+${r.amount}` : r.amount}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <BottomNavBar />
    </Box>
  );
};

export default PointHome; 