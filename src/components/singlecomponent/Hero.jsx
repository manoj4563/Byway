import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Heroimage from '../internalcomponent/Heroimage';
import { BackgroundLines } from '../styledcomponent/BackgroundLines';
import img from '../../Asstes/image.jpg'
const Hero = () => {
    return (
        <Box sx={{ width: '100vw', height: '85vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                <BackgroundLines
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '100%',
                        zIndex: 1,
                    }}
                />
                <Box
                    sx={{
                        width: '45%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 6,
                        zIndex: 2,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
                    >
                        <Box sx={{ height: 'fit-content', width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Typography sx={{ fontSize: '40px', fontWeight: 700, width: '80%' }}>
                                Unlock Your Potential with Byway
                            </Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#334155' }}>
                                Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal and professional growth, and we're here to guide you on your journey to success.
                            </Typography>
                            <Button sx={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', background: '#3B82F6', borderRadius: '8px', width: 'fit-content', padding: '8px 16px' }}>
                                Start your instructor journey
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
                <Box
                    sx={{
                        width: '55%',
                        height: '100%',
                        position: 'relative',
                        overflow: 'visible',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                    }}
                >
                    <Box component={'img'} style={{width:'100%',height:'90%'}} src={img} ></Box>
                    {/*<Heroimage />*/}
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;