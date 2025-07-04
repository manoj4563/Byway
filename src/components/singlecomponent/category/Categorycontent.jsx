import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Rating, Stack, FormGroup, FormControlLabel, Checkbox, Card, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimationControls } from 'framer-motion';

// Styled button styles
const styledbutton = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontSize: '16px',
  fontWeight: 500,
  color: 'black',
  padding: '10px 10px',
});

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// CourseCard component for individual card animations
const CourseCard = ({ data, index, handlenavigate, page }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const cardKey = data.courseid ? `${data.courseid}-${index}-${page}` : `${index}-${page}`;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      custom={index % 3}
      key={cardKey}
    >
      <Card
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
          src={`http://localhost:3000/coursethumbnail/${data.coursethumbnail}`}
          alt="img"
        />
        <Box
          onClick={() => handlenavigate(data)}
          sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '8px' }}
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
            {data.coursename}
          </Typography>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
            by {data.instructorname}
          </Typography>
          <Rating size="small" value={data.rating} readOnly />
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#334155' }}>
            22 Total Hours. 155 Lectures. Beginner
          </Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>
            ${data.price}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

const Categorycontent = (props) => {
  const data = useSelector((state) => state.userlearn);
  const filtervisible = props.filtervisible;
  const [ratingvisible, setratingvisible] = useState(false);
  const [chaptervisible, setchaptervisible] = useState(false);
  const [pricevisible, setpricevisible] = useState(false);
  const [categoryvisible, setcategoryvisible] = useState(false);
  const [chapterseemore, setchapterseemore] = useState(false);
  const [chapterarr, setchapterarr] = useState([]);
  const [tabledata, settabledata] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [rowcount, setrowcount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const arr = ['1-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', 'more than 50'];
  const navigate = useNavigate();

  // State for filter values
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const chaptercontrol = () => {
    const end = chapterseemore ? arr.length : 4;
    const data = arr.slice(0, end);
    setchapterarr(data);
  };

  useEffect(() => {
    chaptercontrol();
    axios
      .get('http://localhost:3000/course/coursedetail')
      .then((res) => {
        const originalData = res.data;
        const repeatedData = Array(20).fill(originalData).flat(); // Preserve original data
        setOriginalData(repeatedData);
        settabledata(repeatedData);
        setrowcount(Math.ceil(repeatedData.length / itemsPerPage));
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch course details.');
      });
  }, [chapterseemore]);

  // Apply filters
  useEffect(() => {
    let filteredData = [...originalData];

    if (selectedRating !== null) {
      filteredData = filteredData.filter(course => Math.round(course.rating) === selectedRating);
    }

    if (selectedPrice.length > 0) {
      filteredData = filteredData.filter(course => selectedPrice.includes(course.price));
    }

    if (selectedCategory.length > 0) {
      filteredData = filteredData.filter(course => 
        selectedCategory.some(cat => cat.toLowerCase() === (course.category || '').toLowerCase())
      );
    }

    if (selectedRating === null && selectedPrice.length === 0 && selectedCategory.length === 0) {
      filteredData = [...originalData]; // Revert to original data if no filters
    }

    settabledata(filteredData);
    setrowcount(Math.ceil(filteredData.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedRating, selectedPrice, selectedCategory, originalData]);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = tabledata.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(tabledata.length / itemsPerPage);

  const handlenavigate = (props) => {
    const courses = data.courses || [];
    const courseid = props.courseid;
    const acess = courses.find((data) => data.courseid === courseid);
    if (acess) {
      navigate('/indiviualcourse', { state: { data: props } });
    } else {
      navigate('/course', { state: { data: props } });
    }
  };

  // Handle rating filter (read-only selection)
  const handleRatingClick = (value) => {
    setSelectedRating(selectedRating === value ? null : value); // Toggle filter on/off
  };

  // Handle price filter
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setSelectedPrice((prev) =>
      prev.includes(value) ? prev.filter((price) => price !== value) : [...prev, value]
    );
  };

  // Handle category filter
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory((prev) =>
      prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
    );
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '20px', py: 2 }}>
      {filtervisible && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button 
              onClick={() => setratingvisible((prev) => !prev)} 
              sx={{ 
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography sx={{ textAlign: 'start' }}>Rating</Typography>
              {ratingvisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {ratingvisible && (
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }}>
                {[5, 4, 3, 2, 1].map((value) => (
                  <Box
                    key={value}
                    onClick={() => handleRatingClick(value)} // Handle click on the wrapper
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }} // Visual feedback
                  >
                    <Rating
                      name={`rating-${value}`}
                      value={value}
                      size="small"
                      readOnly // Make it read-only
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button 
              onClick={() => {
                chaptercontrol();
                setchaptervisible((prev) => !prev);
              }}
              sx={{ 
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Number of Chapters</Typography>
              {chaptervisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {chaptervisible && (
              <FormGroup sx={{ p: '10px' }}>
                {chapterarr.map((data, index) => (
                  <FormControlLabel key={index} control={<Checkbox />} label={data} />
                ))}
                {arr.length > 4 && (
                  <Button
                    onClick={() => {
                      const next = !chapterseemore;
                      setchapterseemore(next);
                      const end = next ? arr.length : 4;
                      setchapterarr(arr.slice(0, end));
                    }}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      borderBottom: '2px solid #000',
                    }}
                  >
                    <Typography>{chapterseemore ? 'See less' : 'See more'}</Typography>
                    {chapterseemore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </Button>
                )}
              </FormGroup>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button 
              onClick={() => setpricevisible((prev) => !prev)} 
              sx={{ 
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Price</Typography>
              {pricevisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {pricevisible && (
              <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }}>
                {['150', '200', '250', '300', '350', '400'].map((price) => (
                  <FormControlLabel
                    key={price}
                    control={<Checkbox size="small" value={price} onChange={handlePriceChange} />}
                    label={`$${price}`}
                  />
                ))}
              </FormGroup>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button 
              onClick={() => setcategoryvisible((prev) => !prev)} 
              sx={{ 
                ...styledbutton(),
                borderBottom: '2px solid #000',
              }}
            >
              <Typography>Category</Typography>
              {categoryvisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            {categoryvisible && (
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '10px', p: '10px' }} spacing={1}>
                {['Development', 'Artificial Intelligence'].map((category) => (
                  <FormControlLabel
                    key={category}
                    control={<Checkbox value={category} onChange={handleCategoryChange} />}
                    label={category}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      )}
      <Box sx={{ width: '100%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', width: '100%' }}>
          {paginatedData &&
            paginatedData.map((data, index) => (
              <CourseCard
                key={data.courseid ? `${data.courseid}-${index}-${currentPage}` : `${index}-${currentPage}`}
                data={data}
                index={index}
                handlenavigate={handlenavigate}
                page={currentPage}
              />
            ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                transition: 'all ease 0.3s, transform ease 0.3s',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  transform: 'scale(1.1)',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Categorycontent;