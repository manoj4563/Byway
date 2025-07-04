import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../../Asstes/logo.svg';
import search from '../../Asstes/headersearch.svg';
import cart from '../../Asstes/cart.svg';
import { useNavigate } from 'react-router-dom';

const Landingheader = (props) => {
    const navigate=useNavigate();
     const {loginvisible,setloginvisible}=props
    const handlenav=(props)=>{
          if(props==='login'){
            setloginvisible(true);
            navigate('/auth')
          }
          else{
            
            setloginvisible(false);
            navigate('/auth')
          
          }
    }
  return (
    <>
      {/* Embedded styles */}
      <style>{`
        .fancy-btn {
          position: relative;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline-offset: 4px;
          transition: filter 250ms;
          user-select: none;
          touch-action: manipulation;
          font-size: 14px;
          font-weight: 500;
        }

        .fancy-btn .shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: hsl(0deg 0% 0% / 0.25);
          will-change: transform;
          transform: translateY(2px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }

        .fancy-btn .edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          background: linear-gradient(
            to left,
            hsl(340deg 100% 16%) 0%,
            hsl(340deg 100% 32%) 8%,
            hsl(340deg 100% 32%) 92%,
            hsl(340deg 100% 16%) 100%
          );
        }

        .fancy-btn .front {
          display: block;
          position: relative;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: inherit;
          font-weight: inherit;
          color: white;
          background: hsl(345deg 100% 47%);
          will-change: transform;
          transform: translateY(-4px);
          transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
        }

        .fancy-btn:hover {
          filter: brightness(110%);
        }

        .fancy-btn:hover .front {
          transform: translateY(-6px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .fancy-btn:active .front {
          transform: translateY(-2px);
          transition: transform 34ms;
        }

        .fancy-btn:hover .shadow {
          transform: translateY(4px);
          transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5);
        }

        .fancy-btn:active .shadow {
          transform: translateY(1px);
          transition: transform 34ms;
        }

        .fancy-btn:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>

      <Box sx={{ width: '100vw', height: '14vh', display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
        <Box sx={{ width: '100%', py: 2, px: 8, display: 'flex', flexDirection: 'row', gap: '20px', position: 'relative' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', alignItems: 'center' }}>
            <img src={logo} style={{ width: '31px', height: '40px' }} alt='img' />
            <Typography sx={{ height: 'fit-content', fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' }, color: '#64748B', fontWeight: '500' }}>Byway</Typography>
          </Box>

          <Typography sx={{ width: 'fit-content', my: 'auto', textAlign: 'center', fontSize: { xs: '10px', sm: '12px', lg: '14px' }, fontWeight: '500', color: '#334155' }}>Categories</Typography>

          <Box sx={{ width: '40vw', border: '1px solid #334155', borderRadius: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={search} style={{ width: '20px', height: '20px' }} alt='img' />
            <input placeholder='search course' style={{ width: '90%', border: 'none', height: '90%', fontSize: '14px', fontWeight: '500', color: '#64748B',outline:'none' }} />
          </Box>

          <Typography sx={{ width: 'fit-content', textAlign: 'center', my: 'auto', fontSize: { lg: '14px' }, fontWeight: 500, color: '#334155' }}>Teach on Byway</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', position: 'absolute', right: '64px' }}>
           

            {/* Fancy Log In Button */}
            <button className="fancy-btn" onClick={()=>handlenav('login')}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Log In</span>
            </button>

            {/* Fancy Sign Up Button */}
            <button className="fancy-btn" onClick={()=>handlenav('sign')}>
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front text">Sign Up</span>
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Landingheader;
