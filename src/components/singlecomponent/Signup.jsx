import React, { useState, useCallback } from 'react'
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'
import debounce from 'lodash/debounce'
import sign from '../../Asstes/sign.jpg'
import arrow from '../../Asstes/arrow.svg'
import facebook from '../../Asstes/facebook.svg'
import google from '../../Asstes/google.svg'
import microsoft from '../../Asstes/microsoft.svg'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    const {setloginvisible}=props;
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState('')
    const navigate=useNavigate();
    const styledtextarea = () => ({
        '& .MuiInputBase-root': {
            height: '42px',
        },
        '& input': {
            padding: '8px 12px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: passwordStrength === 'weak' ? 'red' : passwordStrength === 'strong' ? 'green' : 'inherit',
            },
            '&:hover fieldset': {
                borderColor: passwordStrength === 'weak' ? 'red' : passwordStrength === 'strong' ? 'green' : 'inherit',
            },
            '&.Mui-focused fieldset': {
                borderColor: passwordStrength === 'weak' ? 'red' : passwordStrength === 'strong' ? 'green' : 'inherit',
            }
        }
    })

    const stylebutton = (provider) => {
        switch (provider) {
            case 'facebook': return { color: '#0866FF', fontSize: '14px', fontWeight: 400 }
            case 'google': return { color: '#EA4335', fontSize: '14px', fontWeight: 400 }
            case 'microsoft': return { color: '#000000', fontSize: '14px', fontWeight: 400 }
            default: return { color: '#333333', fontSize: '14px', fontWeight: 400 }
        }
    }

    const stylebuttonpad = () => ({
        px: 7,
        py: 1,
        border: '1px solid #B2B5C4'
    })

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const checkPasswordStrength = (password) => {
        const hasLength = password.length >= 8
        const hasNumber = /[0-9]/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const strengthScore = [hasLength, hasNumber, hasSpecialChar].filter(Boolean).length

        if (strengthScore >= 3) return 'strong'
        if (strengthScore >= 1) return 'weak'
        return ''
    }

    const checkUsername = useCallback(debounce(async (value) => {
        if (value.length <= 5) {
            setErrors(prev => ({ ...prev, username: 'Username must be longer than 5 characters' }))
            return false
        }
        try {
            setIsCheckingUsername(true)
            const response = await axios.post('http://localhost:3000/user/username', { username: value })
            if (response.data.exists) {
                setErrors(prev => ({ ...prev, username: 'Username already exists' }))
                return false
            }
            setErrors(prev => ({ ...prev, username: '' }))
            return true
        } catch (error) {
            setErrors(prev => ({ ...prev, username: 'Error checking username availability' }))
            return false
        } finally {
            setIsCheckingUsername(false)
        }
    }, 500), [])

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setUsername(value)
        setErrors(prev => ({ ...prev, username: '' }))
        if (value) checkUsername(value)
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        if (value && !validateEmail(value)) {
            setErrors(prev => ({ ...prev, email: 'Invalid email format' }))
        } else {
            setErrors(prev => ({ ...prev, email: '' }))
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        const strength = checkPasswordStrength(value)
        setPasswordStrength(strength)
        if (value && !strength) {
            setErrors(prev => ({ ...prev, password: 'Password is too weak' }))
        } else if (value && strength === 'weak') {
            setErrors(prev => ({ ...prev, password: 'Password should include numbers and special characters' }))
        } else {
            setErrors(prev => ({ ...prev, password: '' }))
        }
        if (confirmPassword && value !== confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
        } else if (confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: '' }))
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        if (value !== password) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: '' }))
        }
    }

    const preventPaste = (e) => {
        e.preventDefault()
        setErrors(prev => ({ ...prev, confirmPassword: 'Pasting is not allowed' }))
    }

    const handleSubmit = async () => {
        setErrors({})
        setIsSubmitting(true)

        const newErrors = {}
        if (!firstname) newErrors.firstname = 'First name is required'
        if (!lastname) newErrors.lastname = 'Last name is required'
        if (!username) newErrors.username = 'Username is required'
        else if (username.length <= 5) newErrors.username = 'Username must be longer than 5 characters'
        if (!email) newErrors.email = 'Email is required'
        else if (!validateEmail(email)) newErrors.email = 'Invalid email format'
        if (!password) newErrors.password = 'Password is required'
        else if (checkPasswordStrength(password) !== 'strong') newErrors.password = 'Password must be strong (8+ characters, number, special character)'
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required'
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsSubmitting(false)
            return
        }

        try {
            const usernameResponse = await axios.post('http://localhost:3000/user/username', { username })
            if (usernameResponse.data.exists) {
                setErrors({ username: 'Username already exists' })
                setIsSubmitting(false)
                return
            }
        } catch (error) {
            setErrors({ form: 'Error verifying username' })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await axios.post('http://localhost:3000/user/register', {
                firstname,
                lastname,
                username,
                email,
                password
            })
            if (response.status === 200) {
                alert('Registration successful!')
                setFirstname('')
                setLastname('')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setPasswordStrength('')
                setloginvisible(true)
                

            }
        } catch (error) {
            setErrors({ form: error.response?.data?.error || 'Registration failed' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '30%', height: '100%' }}>
                <img style={{ width: '100%', height: '100%' }} src={sign} alt='img' />
            </Box>
            <Box sx={{ width: '70%' }}>
                <Box sx={{ width: '100%', height: '100%', overflowX: 'hidden' }}>
                    <Box sx={{ paddingLeft: 3, paddingRight: 6, paddingTop: 4, paddingBottom: 6, display: 'flex', gap: '15px', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: { xs: '28px', sm: '30px', lg: '32px' }, fontWeight: 700, textAlign: 'center' }}>
                            Create Your Account
                        </Typography>
                        {errors.form && <Typography color="error">{errors.form}</Typography>}
                        <Box>
                            <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Full Name</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextField
                                    placeholder='First name'
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    error={!!errors.firstname}
                                    helperText={errors.firstname}
                                    sx={{ width: '47%', ...styledtextarea() }}
                                />
                                <TextField
                                    placeholder='Last name'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    error={!!errors.lastname}
                                    helperText={errors.lastname}
                                    sx={{ width: '47%', ...styledtextarea() }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>User Name</Typography>
                            <TextField
                                placeholder='username'
                                value={username}
                                onChange={handleUsernameChange}
                                sx={{ width: '100%', ...styledtextarea() }}
                                error={!!errors.username}
                                helperText={errors.username}
                                InputProps={{
                                    endAdornment: isCheckingUsername && <CircularProgress size={20} />
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Email</Typography>
                            <TextField
                                placeholder='email'
                                type='email'
                                value={email}
                                onChange={handleEmailChange}
                                sx={{ width: '100%', ...styledtextarea() }}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '47%', display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Password</Typography>
                                <TextField
                                    placeholder='Enter Password'
                                    type='password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    sx={{ width: '100%', ...styledtextarea() }}
                                    error={!!errors.password}
                                    helperText={errors.password || (passwordStrength && `Password strength: ${passwordStrength}`)}
                                />
                            </Box>
                            <Box sx={{ width: '47%', display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: { lg: '18px' }, fontWeight: '600' }}>Confirm Password</Typography>
                                <TextField
                                    placeholder='Confirm Password'
                                    type='password'
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onPaste={preventPaste}
                                    sx={{ width: '100%', ...styledtextarea() }}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ background: 'black', width: 'fit-content', height: 'fit-content', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer', px: 1 }}>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting || isCheckingUsername}
                                sx={{ width: 'fit-content', height: 'fit-content', fontSize: '16px', fontWeight: 500, color: '#FFFFFF', px: 1 }}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Account'}
                            </Button>
                            <img style={{ width: '24px', height: '24px' }} src={arrow} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ height: '1px', width: '44%', background: '#94A3B8' }}></Box>
                            <Typography sx={{ fontSize: '12px', p: 0, color: '#94A3B8', px: 1 }}>Sign up with</Typography>
                            <Box sx={{ height: '1px', width: '44%', background: '#94A3B8' }}></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button sx={{ ...stylebutton('facebook'), ...stylebuttonpad() }}>
                                <img src={facebook} style={{ width: '24px', height: '24px' }} /> Facebook
                            </Button>
                            <Button sx={{ ...stylebutton('google'), ...stylebuttonpad() }}>
                                <img src={google} style={{ width: '24px', height: '24px' }} /> Google
                            </Button>
                            <Button sx={{ ...stylebutton('microsoft'), ...stylebuttonpad() }}>
                                <img src={microsoft} style={{ width: '24px', height: '24px' }} /> Microsoft
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup