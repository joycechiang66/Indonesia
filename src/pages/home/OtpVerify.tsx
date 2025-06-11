import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Link, Dialog, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const OTP_LENGTH = 6;
const CORRECT_OTP = '222222';

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [touched, setTouched] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  // 錯誤判斷
  const otpValue = otp.join('');
  const isError = touched && otpValue.length === OTP_LENGTH && otpValue !== CORRECT_OTP;
  const isValid = otpValue === CORRECT_OTP;
  const isNameValid = name.trim().length > 0;
  const canContinue = isValid && isNameValid;

  // 處理 OTP 輸入
  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setTouched(true);
    if (value && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // 處理刪除
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // 處理 Resend 倒數
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <Box sx={{ px: 3, pt: 4, pb: 2, minHeight: '100vh', bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button sx={{ minWidth: 0, p: 0 }} onClick={() => navigate(-1)}>
          {/* 返回箭頭可自行加上 */}
          <span style={{ fontSize: 24 }}>{'←'}</span>
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h3" sx={{ fontFamily: 'serif', color: '#009745', fontWeight: 700, fontSize: 32, mb: 0.5 }}>MakkahGo</Typography>
        <Typography sx={{ color: '#009745', fontSize: 16, mb: 1 }}>Panduan Perjalanan Suci</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Welcome to join us</Typography>
      <Typography sx={{ fontSize: 16, mb: 1 }}>
        OTP <span style={{ color: '#FF0000' }}>*</span>
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {otp.map((digit, idx) => (
          <TextField
            key={idx}
            inputRef={el => inputRefs.current[idx] = el}
            value={digit}
            onChange={e => handleChange(e.target.value, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            inputProps={{ maxLength: 1, style: { textAlign: 'center', fontSize: 28, width: 40, height: 48 } }}
            error={isError}
            sx={{ '& .MuiOutlinedInput-root': { p: 0, borderRadius: 1, width: 48, height: 48 } }}
          />
        ))}
      </Box>
      <TextField
        label="Name"
        required
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="How should I call you"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Button disabled sx={{ minWidth: 0, color: '#888', fontWeight: 500, fontSize: 16, bgcolor: '#eee', borderRadius: 2, px: 2 }}>
          Resend
        </Button>
        <Typography sx={{ color: '#888', fontWeight: 500 }}>{resendTimer}</Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        disabled={!canContinue}
        sx={{
          bgcolor: canContinue ? '#009745' : '#aaaaaa',
          color: '#fff',
          borderRadius: 4,
          height: 48,
          fontSize: 18,
          fontWeight: 700,
          mb: 2,
          '&.Mui-disabled': { color: '#fff' },
        }}
        onClick={() => setShowTerms(true)}
      >
        Continue
      </Button>
      {isError && (
        <Typography color="error" sx={{ mb: 2, fontSize: 14 }}>
          驗證碼錯誤，請重新輸入
        </Typography>
      )}
      <Dialog open={showTerms} onClose={() => setShowTerms(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
        <Box sx={{ textAlign: 'center', p: 2, position: 'relative' }}>
          <IconButton onClick={() => setShowTerms(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <img src="/Indonesia/images/terms-illustration.png" alt="terms" style={{ width: 180, margin: '0 auto', display: 'block' }} />
          <Typography sx={{ fontWeight: 700, mt: 2, fontSize: 18 }}>
            To continue,please agree to our terms and policies first.
          </Typography>
          <Typography sx={{ mt: 1, mb: 2, fontSize: 15 }}>
            Read the <Link href="#" sx={{ color: '#009745' }}>Terms of Service</Link> & <Link href="#" sx={{ color: '#009745' }}>Privacy Policy</Link>.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: '#009745', color: '#fff', borderRadius: 999, fontWeight: 700, fontSize: 18 }}
            onClick={() => setShowTerms(false)}
          >
            I agree
          </Button>
        </Box>
      </Dialog>
      <Typography sx={{ fontSize: 13, color: '#888', mt: 2 }}>
        I agree to MakkahGo{' '}
        <Link href="#" sx={{ color: '#009745' }}>Terms of service</Link> &amp;{' '}
        <Link href="#" sx={{ color: '#009745' }}>Privacy Policy</Link>.
      </Typography>
    </Box>
  );
};

export default OtpVerify; 