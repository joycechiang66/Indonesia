import { useState, useMemo } from 'react';
import { Typography, TextField, Button, Box, Container, Link, InputBase, Slide } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false);
  const [isPrivacyDrawerOpen, setIsPrivacyDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Indonesia',
    code: '+62',
    flag: `${import.meta.env.BASE_URL}images/icons/Flag/indonesia.svg`
  });

  const countries = [
    { name: 'Indonesia', code: '+62', flag: `${import.meta.env.BASE_URL}images/icons/Flag/indonesia.svg` },
    { name: 'Afghanistan', code: '+93', flag: `${import.meta.env.BASE_URL}images/icons/Flag/afghanistan.svg` },
    { name: 'Albania', code: '+355', flag: `${import.meta.env.BASE_URL}images/icons/Flag/albania.svg` },
    { name: 'Algeria', code: '+213', flag: `${import.meta.env.BASE_URL}images/icons/Flag/algeria.svg` },
    { name: 'Andorra', code: '+376', flag: `${import.meta.env.BASE_URL}images/icons/Flag/andorra.svg` },
    { name: 'Angola', code: '+244', flag: `${import.meta.env.BASE_URL}images/icons/Flag/angola.svg` },
    { name: 'Argentina', code: '+54', flag: `${import.meta.env.BASE_URL}images/icons/Flag/argentina.svg` },
    { name: 'Armenia', code: '+374', flag: `${import.meta.env.BASE_URL}images/icons/Flag/armenia.svg` },
    { name: 'Australia', code: '+61', flag: `${import.meta.env.BASE_URL}images/icons/Flag/australia.svg` },
    { name: 'Austria', code: '+43', flag: `${import.meta.env.BASE_URL}images/icons/Flag/austria.svg` },
    { name: 'Azerbaijan', code: '+994', flag: `${import.meta.env.BASE_URL}images/icons/Flag/azerbaijan.svg` },
    { name: 'Bahrain', code: '+973', flag: `${import.meta.env.BASE_URL}images/icons/Flag/bahrain.svg` },
    { name: 'Bangladesh', code: '+880', flag: `${import.meta.env.BASE_URL}images/icons/Flag/bangladesh.svg` },
    { name: 'Belgium', code: '+32', flag: `${import.meta.env.BASE_URL}images/icons/Flag/belgium.svg` },
    { name: 'Brazil', code: '+55', flag: `${import.meta.env.BASE_URL}images/icons/Flag/brazil.svg` },
    { name: 'Canada', code: '+1', flag: `${import.meta.env.BASE_URL}images/icons/Flag/canada.svg` },
    { name: 'China', code: '+86', flag: `${import.meta.env.BASE_URL}images/icons/Flag/china.svg` },
    { name: 'Egypt', code: '+20', flag: `${import.meta.env.BASE_URL}images/icons/Flag/egypt.svg` },
    { name: 'France', code: '+33', flag: `${import.meta.env.BASE_URL}images/icons/Flag/france.svg` },
    { name: 'Germany', code: '+49', flag: `${import.meta.env.BASE_URL}images/icons/Flag/germany.svg` },
  ];

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    
    const query = searchQuery.trim().toLowerCase();
    const searchCode = query.startsWith('+') ? query : `+${query}`;
    
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.includes(searchCode) ||
      country.code.slice(1).includes(query)
    );
  }, [searchQuery]);

  const isValidIndonesianPhone = useMemo(() => {
    // Check if contains any English letters
    if (/[a-zA-Z]/.test(phoneNumber)) {
      return false;
    }

    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Indonesian phone number format: starts with 8 followed by 8-12 digits
    const indonesianRegex = /^8\d{8,12}$/;
    
    return indonesianRegex.test(cleanNumber);
  }, [phoneNumber]);

  return (
    <Box
      sx={{
        background: `url('${import.meta.env.BASE_URL}images/backgrounds/login-back.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 5 },
        '@media (max-height: 600px)': {
          py: 2,
          '& > *': {
            mt: '16px !important',
          },
        }
      }}
    >
      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center', 
        mt: '24%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        '@media (max-height: 600px)': {
          mt: '24%',
        }
      }}>
        <img 
          src={`${import.meta.env.BASE_URL}images/logos/logo_w.svg`} 
          alt="MakkahGo"
          style={{ 
            width: 'min(200px, 50vw)',
            marginBottom: '8px',
            height: 'auto'
          }}
        />
      </Box>

      <Container 
        id="container-root"
        maxWidth="sm" 
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          mt: '47%',
          width: '100%',
          maxWidth: { xs: '100%', sm: '440px' },
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          '@media (max-height: 600px)': {
            mt: '193px',
          }
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#000', 
            mb: '2px',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 700
          }}
        >
          Welcome to MakkahGo
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#838383', 
            mb: '6px',
            fontSize: '12px'
          }}
        >
          Enter or create an account in a few easy steps.
        </Typography>

        <Box component="form" sx={{ mt: 0 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#000', 
              mb: '6px',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              '& > span': {
                color: '#FF0000'
              }
            }}
          >
            Phone number <span>*</span>
          </Typography>
          <Box sx={{ display: 'flex', gap: '2px' }}>
            <Button
              onClick={() => setIsDrawerOpen(true)}
              sx={{ 
                minWidth: '63px',
                width: '63px',
                height: '35px',
                backgroundColor: '#fff',
                border: '1px solid #aaaaaa',
                borderRadius: '17px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                '& img': {
                  width: '20px',
                  height: '20px'
                }
              }}
            >
              <img 
                src={selectedCountry.flag}
                alt={selectedCountry.name} 
              />
              {selectedCountry.code}
            </Button>
            <TextField
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Type your phone number"
              error={phoneNumber.length > 0 && !isValidIndonesianPhone}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '35px',
                  '& input': {
                    height: '35px',
                    padding: '0'
                  },
                  backgroundColor: '#fff',
                  borderRadius: '0',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '& fieldset': {
                    border: 'none',
                    borderBottom: '1px solid #D9D9D9'
                  },
                  '&:hover fieldset': {
                    borderBottom: '1px solid #D9D9D9'
                  },
                  '&.Mui-focused fieldset': {
                    borderBottom: '1px solid #D9D9D9'
                  }
                },
                '& .MuiFormHelperText-root': {
                  margin: '4px 0 0',
                  fontSize: '12px'
                }
              }}
            />
          </Box>

          <Button 
            fullWidth 
            disabled={!isValidIndonesianPhone}
            sx={{ 
              mt: '15px',
              backgroundColor: isValidIndonesianPhone ? '#009745' : '#aaaaaa',
              color: '#ffffff',
              borderRadius: '21px',
              height: '43px',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              '&.Mui-disabled': {
                color: '#ffffff'
              },
              '&:hover': {
                backgroundColor: isValidIndonesianPhone ? '#008435' : '#999999',
              }
            }}
          >
            Continue
          </Button>

          <Box sx={{ 
            mt: '6px', 
            textAlign: 'left'
          }}>
                          <Typography variant="body2" sx={{
                fontSize: '14px',
                color: '#000',
                '& a': {
                  fontSize: 'inherit',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }
              }}>
              I agree to MakkahGo{' '}
              <Link component="span" onClick={() => setIsTermsDrawerOpen(true)}>Terms of service</Link>
              {' '}&{' '}
              <Link component="span" onClick={() => setIsPrivacyDrawerOpen(true)}>Privacy Policy</Link>
            </Typography>
          </Box>
        </Box>

      </Container>

      {/* Terms of Service Bottom Sheet */}
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
            <Box sx={{
              width: 40,
              height: 5,
              bgcolor: '#ccc',
              borderRadius: 3,
              mx: 'auto',
              mt: 1,
              mb: 1.5,
            }} />

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              mb: 1,
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Terms of service</Typography>
              <Button
                onClick={() => setIsTermsDrawerOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  minWidth: 'auto',
                  p: 1,
                  transform: 'translateY(-50%)',
                  color: '#000'
                }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/icons/Close=25.svg`} 
                  alt="close"
                  style={{
                    width: 25,
                    height: 25
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Slide>

      {/* Privacy Policy Bottom Sheet */}
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
            <Box sx={{
              width: 40,
              height: 5,
              bgcolor: '#ccc',
              borderRadius: 3,
              mx: 'auto',
              mt: 1,
              mb: 1.5,
            }} />

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              mb: 1,
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Privacy Policy</Typography>
              <Button
                onClick={() => setIsPrivacyDrawerOpen(false)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  minWidth: 'auto',
                  p: 1,
                  transform: 'translateY(-50%)',
                  color: '#000'
                }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/icons/Close=25.svg`} 
                  alt="close"
                  style={{
                    width: 25,
                    height: 25
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Slide>

      <Slide direction="up" in={isDrawerOpen} mountOnEnter unmountOnExit>
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
            {/* 頂部橫條 */}
            <Box sx={{
              width: 40,
              height: 5,
              bgcolor: '#ccc',
              borderRadius: 3,
              mx: 'auto',
              mt: 1,
              mb: 1.5,
              flexShrink: 0,
            }} />

            {/* 標題與關閉按鈕 */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              mb: 1,
              flexShrink: 0,
            }}>
              <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Search country code</Typography>
              <Button
                onClick={() => {
                  setIsDrawerOpen(false);
                  setSearchQuery('');
                }}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  minWidth: 'auto',
                  p: 1,
                  transform: 'translateY(-50%)',
                  color: '#000'
                }}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/icons/Close=25.svg`} 
                  alt="close"
                  style={{
                    width: 25,
                    height: 25
                  }}
                />
              </Button>
            </Box>

            {/* 搜尋框區域 */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              px: 0,
              mb: 1,
              flexShrink: 0,
            }}>
              {/* 搜尋框 */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                height: '36px',
                bgcolor: 'rgba(120, 120, 128, 0.12)',
                borderRadius: '8px',
                mx: 2,
              }}>
                <SearchIcon sx={{ color: '#888', ml: 1 }} />
                <InputBase
                  autoFocus
                  fullWidth
                  placeholder="Type country name or country code"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  sx={{
                    ml: 1,
                    height: '100%',
                    '& input': {
                      height: '100%',
                      fontSize: '14px',
                      width: '100%',
                      padding: 0,
                    }
                  }}
                />
                {searchQuery && (
                  <Button
                    size="small"
                    onClick={() => setSearchQuery('')}
                    sx={{
                      minWidth: 'auto',
                      p: 0.5,
                      mr: 1,
                      color: '#666'
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                )}
              </Box>
              
              {/* Cancel 按鈕 */}
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery('')}
                  sx={{
                    color: '#009745',
                    minWidth: 'auto',
                    px: 1,
                    mr: 2,
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'transparent'
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>

            {/* 標題 */}
            <Typography sx={{ px: 0, mx: 2, mb: 1, fontWeight: 500, fontSize: 15 }}>
              {searchQuery ? `Search Results (${filteredCountries.length})` : 'All countries'}
            </Typography>

            {/* 國家列表 */}
            <Box sx={{ 
              flex: 1,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px'
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888'
              }
            }}>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      px: 2, 
                      py: 1.2, 
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:active': {
                        bgcolor: 'rgba(0,0,0,0.05)'
                      }
                    }}
                    onClick={() => { 
                      setSelectedCountry(country); 
                      setIsDrawerOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <img 
                      src={country.flag} 
                      alt={country.name} 
                      style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: '50%', 
                        marginRight: 12,
                        objectFit: 'cover'
                      }} 
                    />
                    <Typography sx={{ 
                      flex: 1,
                      fontSize: '16px'
                    }}>
                      {country.name}
                    </Typography>
                    <Typography sx={{ 
                      color: '#666',
                      fontSize: '16px',
                      fontWeight: 500
                    }}>
                      {country.code}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 4,
                  color: '#666'
                }}>
                  <Typography sx={{ fontSize: '14px', mb: 1 }}>
                    No countries found
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    Try searching for another country or code
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Home; 