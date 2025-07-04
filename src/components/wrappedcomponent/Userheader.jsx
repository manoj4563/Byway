import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../Asstes/logo.svg';
import search from '../../Asstes/headersearch.svg';
import cart from '../../Asstes/cart.svg';
import bell from '../../Asstes/bell.svg';
import heart from '../../Asstes/heart.svg';

const Userheader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = useSelector((state) => state.userdetail);

    useEffect(() => {
        console.log(data, "redux data");
    }, []);

    // Base style for icon containers
    const iconBoxStyle = {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.2) translateY(-5px)',
            zIndex: 2,
        },
    };

    // Determine active route
    const isActive = (path) => location.pathname === path;

    return (
        <Box sx={{ width: '100vw', height: '14vh', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
            <Box sx={{ width: '100%', py: 2, px: 8, display: 'flex', flexDirection: 'row', gap: '20px', position: 'relative' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                    <img src={logo} style={{ width: '31px', height: '40px' }} alt='img' />
                    <Typography sx={{ height: 'fit-content', fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, color: '#64748B', fontWeight: '500' }}>
                        Byway
                    </Typography>
                </Box>
                <Typography sx={{ width: 'fit-content', my: 'auto', textAlign: 'center', fontSize: { xs: '10px', sm: '12px', lg: '14px' }, fontWeight: '500', color: '#334155' }}>
                    Categories
                </Typography>
                <Box sx={{ width: '40vw', border: '1px solid #334155', borderRadius: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src={search} style={{ width: '20px', height: '20px' }} alt='img' />
                    <input
                        placeholder='search course'
                        style={{ width: '90%', border: 'none', height: '90%', fontSize: '14px', fontWeight: '500', color: '#64748B', outline: 'none' }}
                    />
                </Box>
                <Typography sx={{ width: 'fit-content', textAlign: 'center', my: 'auto', fontSize: { lg: '14px' }, fontWeight: 500, color: '#334155' }}>
                    Teach on Byway
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', position: 'absolute', right: '64px', justifyContent: 'center', alignItems: 'center', mt: '7px' }}>
                    <Box
                        onClick={() => navigate('/whisliste')}
                        sx={{
                            ...iconBoxStyle,
                            backgroundColor: isActive('/whisliste') ? '#D3D3D3' : 'transparent',
                            '&:hover': {
                                ...iconBoxStyle['&:hover'],
                                backgroundColor: isActive('/whisliste') ? '#D3D3D3' : 'transparent',
                            },
                        }}
                    >
                        <img style={{ width: '24px', height: '24px' }} src={heart} alt='wishlist' />
                    </Box>
                    <Box
                        onClick={() => navigate('/shopingcart')}
                        sx={{
                            ...iconBoxStyle,
                            backgroundColor: isActive('/shopingcart') ? '#D3D3D3' : 'transparent',
                            '&:hover': {
                                ...iconBoxStyle['&:hover'],
                                backgroundColor: isActive('/shopingcart') ? '#D3D3D3' : 'transparent',
                            },
                        }}
                    >
                        <img style={{ width: '24px', height: '24px' }} src={cart} alt='cart' />
                    </Box>
                    <Box
                        sx={{
                            ...iconBoxStyle,
                            backgroundColor: isActive('/notifications') ? '#D3D3D3' : 'transparent',
                            '&:hover': {
                                ...iconBoxStyle['&:hover'],
                                backgroundColor: isActive('/notifications') ? '#D3D3D3' : 'transparent',
                            },
                        }}
                    >
                        <img style={{ width: '24px', height: '24px' }} src={bell} alt='notifications' />
                    </Box>
                    <Box
                        onClick={() => navigate('/user')}
                        sx={{
                            ...iconBoxStyle,
                            backgroundColor: isActive('/user') ? '#D3D3D3' : 'green',
                            '&:hover': {
                                ...iconBoxStyle['&:hover'],
                                backgroundColor: isActive('/user') ? '#D3D3D3' : 'green',
                            },
                        }}
                    >
                        <Typography>{data.firstname ? data.firstname[0] : ''}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Userheader;