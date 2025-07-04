import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const Landingcount = () => {
  const styledcount = () => ({
    fontSize: '32px',
    fontWeight: 600,
    color: '#0F172A',
  });

  const styledtype = () => ({
    fontSize: '14px',
    fontWeight: 400,
    color: '#0F172A',
  });

  const styledline = () => ({
    height: '55px',
    width: '5px',
    borderRadius: '3px',
    backgroundColor: '#E2E8F0',
  });

  // Counter data with target values
  const counters = [
    { id: 1, target: 400, label: 'course by our best mentors' },
    { id: 2, target: 300, label: 'course by our mentors' },
    { id: 3, target: 30, label: 'Total Students' },
    { id: 4, target: 20, label: 'New Users' },
  ];

  // State to store the current count for each item
  const [counts, setCounts] = useState(counters.map(() => 0));

  // Ref to observe the component
  const counterRef = useRef(null);

  // Function to animate all counters simultaneously
  const animateCounters = () => {
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const incrementTime = 16; // Approximately 60fps
    const totalSteps = duration / incrementTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / totalSteps, 1); // Ensure progress doesn't exceed 1
      const newCounts = counters.map((counter) => Math.floor(counter.target * progress));
      setCounts(newCounts);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCounts(counters.map(counter => counter.target)); // Ensure exact target values
      }
    }, incrementTime);
  };

  // Use IntersectionObserver to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={counterRef}
      sx={{ width: '100%', height: '25vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', background: '#F8FAFC' }}
    >
      {counters.map((counter, index) => (
        <React.Fragment key={counter.id}>
          <Box>
            <Typography sx={{ ...styledcount() }}>{counts[index]}</Typography>
            <Typography sx={{ ...styledtype() }}>{counter.label}</Typography>
          </Box>
          {index < counters.length - 1 && <Box sx={{ ...styledline() }}></Box>}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Landingcount;