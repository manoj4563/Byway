import React, { useEffect, useState } from 'react'
import { Box, Card, Typography, Rating, Button } from '@mui/material'
import axios from 'axios'

const Popularmentors = () => {
    const [topinstructor, setInstructor] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/instructor/allinstructor")
            .then((res) => {
                const data = res.data;
                // Create an array with exactly 10 items by repeating the data
                const duplicatedData = [];
                while (duplicatedData.length < 10) {
                    duplicatedData.push(...data);
                }
                setInstructor(duplicatedData.slice(0, 10)); // Ensure exactly 10 items
            })
            .catch((err) => alert(err.message));
    }, []);

    useEffect(() => {
        console.log(topinstructor);
    }, [topinstructor]);

    const styledhead = () => ({
        fontSize: '24px',
        fontWeight: 600,
        color: '#0F172A',
        p: 1
    });

    const styledsee = () => ({
        fontSize: '14px',
        fontWeight: 500,
        height: 'fit-content',
        color: '#3B82F6',
        p: 1,
        cursor: 'pointer',
        textDecoration: 'underline'
    });

    const handleToggleView = () => {
        setShowAll(!showAll);
    };
    return (
        <Box sx={{ width: '90vw', ml: '5vw', py: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={styledhead()}>Top Instructors</Typography>
                {!showAll && (
                    <Typography sx={styledsee()} onClick={handleToggleView}>
                        See All
                    </Typography>
                )}
            </Box>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px',
                mt: 2
            }}>
                {topinstructor && topinstructor.slice(0, showAll ? 10 : 4).map((data, index) => (
                    <Card
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'center',
                            gap: '16px',
                            py: 2,
                            borderRadius: '20px',
                            transition: 'all ease 0.3s, transform ease 0.3s',
                            border: '1px solid rgba(255, 255, 255, 0.222)',
                            '&:hover': {
                                boxShadow: '0px 0px 20px 1px #ffbb763f',
                                border: '1px solid rgba(255, 255, 255, 0.454)',
                                transform: 'scale(1.05)',
                            },
                            cursor: 'pointer',
                        }}
                        elevation={1}
                    >
                        <img
                            style={{ width: '90%', height: '139px', borderRadius: '20px' }}
                            src={`http://localhost:3000/instructorprofile/${data.image}`}
                            alt="instructor thumbnail"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '8px' }}>
                            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
                                {data.name}
                            </Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
                                UI/UX Designer
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <Rating size="small" value={data.rating} readOnly />
                                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
                                    2400 students
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
            {showAll && (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                        variant="text"
                        sx={{ color: '#3B82F6', textTransform: 'none' }}
                        onClick={handleToggleView}
                    >
                        See Less
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Popularmentors