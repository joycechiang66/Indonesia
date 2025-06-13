import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Link, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 6;
const CORRECT_OTP = '222222';

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [touched, setTouched] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);
  const [isPrivacyDrawerOpen, setIsPrivacyDrawerOpen] = useState(false);

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
            onKeyDown={e => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, idx)}
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
        onClick={() => navigate('/wish')}
      >
        Continue
      </Button>
      {isError && (
        <Typography color="error" sx={{ mb: 2, fontSize: 14 }}>
          驗證碼錯誤，請重新輸入
        </Typography>
      )}
      <Typography sx={{ fontSize: 13, color: '#888', mt: 2 }}>
        I agree to MakkahGo{' '}
        <span onClick={() => setIsTermsDrawerOpen(true)} style={{ cursor: 'pointer' }}>
          <Link href="#" sx={{ color: '#009745' }}>Terms of service</Link>
        </span>
        {' '} &amp; {' '}
        <span onClick={() => setIsPrivacyDrawerOpen(true)} style={{ cursor: 'pointer' }}>
          <Link href="#" sx={{ color: '#009745' }}>Privacy Policy</Link>
        </span>.
      </Typography>
      <Slide direction="up" in={isTermsDrawerOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1300,
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
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Terms of service</Typography>
              <Button
                onClick={() => setIsTermsDrawerOpen(false)}
                sx={{ position: 'absolute', right: 8, top: '50%', minWidth: 'auto', p: 1, transform: 'translateY(-50%)', color: '#000' }}
              >
                <img src={`${import.meta.env.BASE_URL}images/icons/Close=25.svg`} alt="close" style={{ width: 25, height: 25 }} />
              </Button>
            </Box>
            {/* 你可以在这里添加更多内容 */}
          </Box>
        </Box>
      </Slide>
      <Slide direction="up" in={isPrivacyDrawerOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1300,
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
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Privacy Policy</Typography>
              <Button
                onClick={() => setIsPrivacyDrawerOpen(false)}
                sx={{ position: 'absolute', right: 8, top: '50%', minWidth: 'auto', p: 1, transform: 'translateY(-50%)', color: '#000' }}
              >
                <img src={`${import.meta.env.BASE_URL}images/icons/Close=25.svg`} alt="close" style={{ width: 25, height: 25 }} />
              </Button>
            </Box>
            {/* 你可以在这里添加更多内容 */}
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default OtpVerify; 