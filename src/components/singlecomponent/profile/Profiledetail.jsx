import React,{useState,useEffect} from 'react'
import { Box, TextField, MenuItem, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Profiledetail = () => {
    const data=useSelector((state)=>state.userdetail);
    const [profiledetail,setprofiledetail]=useState();
    useEffect(()=>{
        axios.post("http://localhost:3000/message/profileget",{username:data.username})
        .then((res)=>setprofiledetail(res.data))
        .catch((res)=>alert(res))
    },[])
    return (
        <Box sx={{ width: '100%',py:4,display:'flex',flexDirection:'column',gap:'20px' }}>
            <Box sx={{ border: '1px solid  #e0e0e0',borderRadius:'3px', padding: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">First Name</Typography>
                        <TextField fullWidth variant="outlined" placeholder="Label" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">Last Name</Typography>
                        <TextField fullWidth variant="outlined" placeholder="Label" />
                    </Box>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Headline</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Description</Typography>
                    <TextField fullWidth variant="outlined" multiline rows={4} placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Language</Typography>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        defaultValue=""
                        placeholder="Label" // Note: Placeholder is not natively supported in select; using defaultValue instead
                    >
                        <MenuItem value="">Label</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                    </TextField>
                </Box>

            </Box>

            <Box sx={{ border: '1px solid #e0e0e0', padding: 2, borderRadius: 1 }}>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6">Image Preview</Typography>
                    <Box
                        sx={{
                            width: '300px',
                            height: '200px',
                            backgroundColor: '#e0eaff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                        }}
                    >
                        {/* Placeholder image icon can be added as an image or icon component */}
                        <Typography variant="body2" color="text.secondary">
                            [Image Placeholder]
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">Add/Change Image</Typography>
                        <TextField fullWidth variant="outlined" placeholder="Label" />
                    </Box>
                    <Button variant="contained" color="primary">
                        Upload Image
                    </Button>
                </Box>
            </Box>
            <Box sx={{ border: '1px solid #e0e0e0', padding: 2, borderRadius: 1 }}>
                <Typography variant="h6">Links</Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">Website</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">X (formerly twitter)</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">LinkedIn</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">Youtube</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="subtitle1">Facebook</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Label" />
                </Box>
            </Box>
        </Box>
    )
}

export default Profiledetail