import React from 'react'
import { Box, Typography } from '@mui/material'


import logo from '../../Asstes/logo.svg'
import facebook from '../../Asstes/facebook.svg'
import google from '../../Asstes/google.svg'
import microsoft from '../../Asstes/microsoft.svg'
import twitter from '../../Asstes/twitter.png'
import github from '../../Asstes/github.png'


const Footer = () => {
  const imgboxstyle = () => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
  });
  const typostyle=()=>{
    return(
      {
        fontSize:'14px',
        fontWeight:'400',
        color:'#CBD5E1'
      }
    )
  }
  const typoheadstyle=()=>{
    return(
      {
        fontSize:'18px',
        fontWeight:'600',
        color:'#F1F5F9'
      }
    )
  }

  return (
    <Box sx={{ width: '100vw', height: '50vh', background: '#1E293B' }}>
      <Box sx={{ pl: 7, pr: 7, pb: 4, pt: 6, display: 'flex', flexDirection: 'row',justifyContent:'space-between' }}>
        <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column',gap:'10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
            <img src={logo} style={{ width: '31px', height: '40px' }} alt='img'></img>
            <Typography sx={{ height: 'fit-content', fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, color: 'white', fontWeight: '500' }}>Byway</Typography>
          </Box >
          <Box >
            <Typography sx={{...typostyle()}}>Empowering learners through accessible and engaging online education. </Typography>
            <Typography sx={{...typostyle()}}>Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.</Typography>
          </Box>
        </Box>
        <Box sx={{ width: '10%',display:'flex',flexDirection:'column',gap:'8px' }}>
          <Typography  sx={{...typoheadstyle()}}>Get Help</Typography>
          <Typography sx={{...typostyle()}}>Contact Us</Typography>
          <Typography sx={{...typostyle()}}>Latest Articles</Typography>
          <Typography sx={{...typostyle()}}>FAQ</Typography>

        </Box>
        <Box sx={{ width: '10%',display:'flex',flexDirection:'column',gap:'8px' }}>
          <Typography  sx={{...typoheadstyle()}}>Programs</Typography>
          <Typography sx={{...typostyle()}}>Art & Design</Typography>
          <Typography sx={{...typostyle()}}>Business</Typography>
          <Typography sx={{...typostyle()}}>IT & Software</Typography>
          <Typography sx={{...typostyle()}}>Languages</Typography>
          <Typography sx={{...typostyle()}}>Programming</Typography>

        </Box>
        <Box sx={{display:'flex',flexDirection:'column',gap:'8px'}}>
          <Typography  sx={{...typoheadstyle()}}>Contact Us</Typography>
          <Typography sx={{...typostyle()}}>Address: 123 Main Street, Anytown, CA 12345</Typography>
          <Typography sx={{...typostyle()}}>Tel: +(123) 456-7890</Typography>
          <Typography sx={{...typostyle()}}>Mail: bywayedu@webkul.in</Typography>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row',display:'flex',justifyContent:'space-between' }}>
            <Box sx={{ ...imgboxstyle() }} ><img style={{ width: '24px', height: '24px', borderRadius: '50%', }} src={facebook}></img></Box>
            <Box sx={{ ...imgboxstyle() }}> <img style={{ width: '24px', height: '24px', borderRadius: '50%', }} src={github}></img></Box>
            <Box sx={{ ...imgboxstyle() }}> <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={google}></img></Box>
            <Box sx={{ ...imgboxstyle() }}> <img style={{ width: '24px', height: '24px', borderRadius: '50%' }} src={twitter}></img></Box>
            <Box sx={{ ...imgboxstyle() }}> <img style={{ width: '24px', height: '24px' }} src={microsoft}></img></Box>

          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Footer