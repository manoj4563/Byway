import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initialdata as setUserDetail } from '../../slice/Userdetailslice';
import { initialdata as setUserLearn } from '../../slice/userlearnslice';
import login from '../../Asstes/login.jpg';
import arrow from '../../Asstes/arrow.svg';
import facebook from '../../Asstes/facebook.svg';
import google from '../../Asstes/google.svg';
import microsoft from '../../Asstes/microsoft.svg';
import Radarspinner from '../styledcomponent/Radarspinner';

const Login = () => {
  const [userdetail, setUserdetail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const styledtextarea = () => ({
    '& .MuiInputBase-root': {
      height: '42px',
    },
    '& input': {
      padding: '8px 12px',
    },
  });

  const stylebutton = (provider) => {
    switch (provider) {
      case 'facebook':
        return { color: '#0866FF', fontSize: '14px', fontWeight: 400 };
      case 'google':
        return { color: '#EA4335', fontSize: '14px', fontWeight: 400 };
      case 'microsoft':
        return { color: '#000000', fontSize: '14px', fontWeight: 400 };
      default:
        return { color: '#333333', fontSize: '14px', fontWeight: 400 };
    }
  };

  const stylebuttonpad = () => ({
    px: 7,
    py: 1,
    border: '1px solid #B2B5C4',
  });

  const handleSubmit = async () => {
    setErrors({});
    setShowSpinner(true); // Show the spinner immediately

    // Delay the submission process by 5 seconds
    setTimeout(async () => {
      setIsSubmitting(true);

      // Validate fields
      const newErrors = {};
      if (!userdetail) newErrors.userdetail = 'Username or Email is required';
      if (!password) newErrors.password = 'Password is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        setShowSpinner(false); // Hide spinner on error
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/user/login', {
          userdetail,
          password,
        });
        if (response.status === 200) {
          // Store user data in Redux
          dispatch(setUserDetail(response.data.data));
          if (response.data.datalearn) {
            dispatch(setUserLearn(response.data.datalearn));
          }

          setUserdetail('');
          setPassword('');
          navigate('/category');
        }
      } catch (error) {
        setErrors({ form: error.response?.data?.message || 'Login failed' });
      } finally {
        setIsSubmitting(false);
        setShowSpinner(false); // Hide spinner after process
      }
    }, 2000); // 5 seconds delay
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', position: 'relative' }}>
      {showSpinner && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, // Ensure it covers everything
          }}
        >
          <Radarspinner />
        </Box>
      )}
      <Box sx={{ width: '70%', height: '100%' }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ paddingLeft: 10, paddingRight: 5, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Typography sx={{ fontSize: { xs: '28px', sm: '30px', lg: '32px' }, fontWeight: 700, textAlign: 'center' }}>
              Sign in to your account
            </Typography>
            {errors.form && <Typography color="error">{errors.form}</Typography>}
            <Box>
              <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Email or Username</Typography>
              <TextField
                placeholder="Username or Email ID"
                value={userdetail}
                onChange={(e) => setUserdetail(e.target.value)}
                sx={{ width: '100%', ...styledtextarea() }}
                error={!!errors.userdetail}
                helperText={errors.userdetail}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Password</Typography>
              <TextField
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: '100%', ...styledtextarea() }}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>
            <Box sx={{ background: 'black', width: 'fit-content', height: 'fit-content', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer', px: 1 }}>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{ width: 'fit-content', height: 'fit-content', fontSize: '16px', fontWeight: 500, color: '#FFFFFF', px: 1 }}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
              <img style={{ width: '24px', height: '24px' }} src={arrow} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ height: '1px', width: '44%', background: '#94A3B8' }}></Box>
              <Typography sx={{ fontSize: '12px', p: 0, color: '#94A3B8', px: 1 }}>Sign up with</Typography>
              <Box sx={{ height: '1px', width: '44%', background: '#94A3B8' }}></Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button sx={{ ...stylebutton('facebook'), ...stylebuttonpad() }}>
                <img src={facebook} style={{ width: '24px', height: '24px' }} /> Facebook
              </Button>
              <Button sx={{ ...stylebutton('google'), ...stylebuttonpad() }}>
                <img src={google} style={{ width: '24px', height: '24px' }} /> Google
              </Button>
              <Button sx={{ ...stylebutton('microsoft'), ...stylebuttonpad() }}>
                <img src={microsoft} style={{ width: '24px', height: '24px' }} /> Microsoft
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '30%', height: '100%' }}>
        <img style={{ width: '100%', height: '100%' }} src={login} alt="login" />
      </Box>
    </Box>
  );
};

export default Login;