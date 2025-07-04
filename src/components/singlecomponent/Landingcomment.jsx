import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import jane from '../../Asstes/janeimg.jpg';
import quotes from '../../Asstes/quotes.jpg';

const LandingComment = () => {
  const comment = "Byways tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.";
  const [data, setData] = useState(Array(20).fill(comment));
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        setScrollPosition((prev) => {
          const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
          if (prev >= maxScroll) {
            return 0; // Loop back to start
          }
          return prev + 1; // Smooth scroll speed
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleLeftClick = () => {
    setScrollPosition((prev) => {
      const cardWidth = carouselRef.current.scrollWidth / data.length;
      return Math.max(0, prev - cardWidth * 3); // Move three cards left
    });
  };

  const handleRightClick = () => {
    setScrollPosition((prev) => {
      const cardWidth = carouselRef.current.scrollWidth / data.length;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      return Math.min(maxScroll, prev + cardWidth * 3); // Move three cards right
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#F8FAFC',
        pt: 5,
        pb: 5,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px', // Added maxWidth for better control
          mx: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ width: '300px' }}>
          What Our Customers Say About Us
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mx: 1, minWidth: '40px',background:'#94A3B8',borderRadius:'10px' }}
            onClick={handleLeftClick}
          >
            <ArrowBackIosIcon sx={{color:"white"}}/>
          </Button>
          <Button
            variant="outlined"
            sx={{ minWidth: '40px',background:'#94A3B8',borderRadius:'10px' }}

            onClick={handleRightClick}
          >
            <ArrowForwardIosIcon sx={{color:"white"}} />
          </Button>
        </Box>
      </Box>

      <Box
        ref={carouselRef}
        sx={{
          width: '90%',
          maxWidth: '1200px', // Match header width
          mx: 'auto',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.3s ease',
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {data.map((comment, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 calc(33.33% - 16px)', // Reduced width, adjusted for margin
                mx: 1,
                background: '#fff',
                borderRadius: 2,
                p: 3, // Reduced padding
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                minWidth: 'calc(33.33% - 16px)', // Ensure exactly 3 cards
                maxWidth: 'calc(33.33% - 16px)', // Prevent stretching
              }}
            >
              <Box component="img" src={quotes} alt="quote" sx={{ width: 32 }} />
              <Typography variant="body2" sx={{ color: '#333' }}>
                {comment}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Avatar src={jane} alt="Jane Doe" sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Jane Doe
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Designer
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LandingComment;