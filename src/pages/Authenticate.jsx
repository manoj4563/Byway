import React, { useState } from 'react'
import { Box } from '@mui/material'
import Landingheader from '../components/wrappedcomponent/Landingheader'
import Signup from '../components/singlecomponent/Signup'
import Login from '../components/singlecomponent/Login'
const Authenticate = (props) => {
  const {loginvisible,setloginvisible}=props
  return (
    <Box sx={{width:'100vw',height:'100vh'}}>
        <Landingheader loginvisible={loginvisible} setloginvisible={setloginvisible}/>
        <Box sx={{width:'100vw',height:'85.1vh'}}>
            {loginvisible?
              (<Login/>):(<Signup setloginvisible={setloginvisible}/>)}
        </Box>
    </Box>
  )
}

export default Authenticate