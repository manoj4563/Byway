import React, { useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import category from '../../Asstes/category.jpg';

const Topcategory = () => {
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
    cursor: 'pointer'
  });

  // Generate 20 categories
  const initialCategories = Array.from({ length: 20 }, (_, index) => ({
    name: `Category ${index + 1}`,
    count: Math.floor(Math.random() * 20) + 5
  }));

  const [totalcat, setTotalcat] = useState(initialCategories);
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? totalcat : totalcat.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Box sx={{ width: '90vw', ml: '5vw', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={styledhead()}>Top Categories</Typography>
        <Typography sx={styledsee()} onClick={toggleShowAll}>
          {showAll ? 'See Less' : 'See All'}
        </Typography>
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: showAll ? 'repeat(4, 1fr)' : 'repeat(4, 1fr)',
        gap: '20px',
        mt: 2
      }}>
        {displayedCategories.map((cat, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              padding: '20px',
              height: '180px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#E0F2FE'
              }}
            >
              <img
                style={{ width: '40px', height: '40px' }}
                src={category}
                alt={`category-${index}`}
              />
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>{cat.name}</Typography>
            <Typography sx={{ fontSize: '14px', color: '#64748B' }}>{cat.count} Items</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Topcategory;