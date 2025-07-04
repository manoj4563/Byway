import React from 'react'
import { Box, Button, Typography } from '@mui/material'

import img1 from '../../Asstes/ladingbottom1.jpg'
import img2 from '../../Asstes/landingbottom2.jpg'

const Landindlast = () => {
    const styledhead=()=>{
        return({
            fontSize:'20px',
            fontWeight:600,
            color:'#000000'
        })
    }
    const styledtext=()=>{
        return({
            fontSize:'16px',
            fontWeight:400,
            color:'#1D2939'
        })
    }
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ width: '80%', height: '47%', display: 'flex', flexDirection: 'row',justifyContent:'space-between',alignItems:'center' }}>
                <Box sx={{ width: '30%', height: '100%' }}>
                    <img src={img2} style={{ width: '100%', height: '100%' }}></img>
                </Box>
                <Box sx={{width:'50%',height:'fit-content',display:'flex',flexDirection:'column',gap:'8px'}}>
                    <Typography sx={{...styledhead()}}>Become an Instructor</Typography>
                    <Typography sx={{...styledtext()}}>Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love.</Typography>
                    <Button sx={{fontSize:'14px',fontWeight:500,color:'#FFFFFF',background:'#3B82F6',borderRadius:'8px',width:'fit-content'}}>Start Your Instructor Journey</Button>
                </Box>
            </Box>
            <Box sx={{ width: '80%', height: '47%',display:"flex",flexDirection:'row',justifyContent:'space-between',alignItems:'center' }}>
                <Box sx={{width:"40%",height:'fit-content',display:'flex',flexDirection:'column',gap:'8px'}}>
                    <Typography sx={{...styledhead()}}>Transform your life through education</Typography>
                    <Typography sx={{...styledtext()}}>Learners around the world are launching new careers, advancing in their fields, and enriching their lives.</Typography>
                    <Button sx={{fontSize:'14px',fontWeight:500,color:'#FFFFFF',background:'#3B82F6',borderRadius:'8px',width:'fit-content'}}>Checkout Courses</Button>
                </Box>
                <Box sx={{ width: '30%', height: '100%' }}>
                    <img src={img1} style={{ width: '100%', height: '100%' }}></img>
                </Box>

            </Box>
        </Box>
    )
}

export default Landindlast