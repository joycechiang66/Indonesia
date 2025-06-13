import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OTP_LENGTH = 6;
const CORRECT_OTP = '111111';

const OtpOld = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [touched, setTouched] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const otpValue = otp.join('');
  const isError = touched && otpValue.length === OTP_LENGTH && otpValue !== CORRECT_OTP;
  const isValid = otpValue === CORRECT_OTP;

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <Box sx={{ px: 3, pt: 4, pb: 2, minHeight: '100vh', bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button sx={{ minWidth: 0, p: 0 }} onClick={() => navigate(-1)}>
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
      <Button
        fullWidth
        variant="contained"
        disabled={!isValid}
        sx={{
          bgcolor: isValid ? '#009745' : '#aaaaaa',
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
    </Box>
  );
};

export default OtpOld; 