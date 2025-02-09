import React, { useState } from 'react';
import { Button,TextField,CssBaseline,Avatar,Link,Paper,Box,Grid,Typography, colors } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import login_img from '../../assets/login.svg';
import './Login.css';



const Login = () => {

   // State to manage a random value for the query parameter
   const [queryParam, setQueryParam] = useState(Date.now());

   // Function to generate a new query parameter value
   const generateQueryParam = () => {
     setQueryParam(Date.now());
   };

  const navigate = useNavigate();

  const { isLoggedIn,login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isLoggedIn) {
    navigate('/');
  }

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/login',
        {
          email,
          password,
        },
        config
      );
      
      // Update authentication state and navigate to home page
      login(data.user);

      if(data.user.isAdmin){
        navigate('/admin/home')
      }else{
        navigate("/");
    }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login_img}?${queryParam})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              type='email'
              id="filled-basic"
              fullWidth
              label="E-mail"
              value={email}
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
            type='password'
              id="filled-basic"
              fullWidth
              label="Password"
              value={password}
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={submitHandler}>
              Login
            </Button>
            <Grid container>
                <Grid item >
                  <Link href="/logintutor" variant="body2">
                    {"Are you a tutor? Login here"}
                  </Link>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item >
                  <Link href="/register" variant="body2">
                    {"Don't have an account?"}
                  </Link>
                </Grid>
            </Grid>
            </Box>
          {error && <p className='error'>{error}</p>}
          </Box>
        </Grid>
      </Grid>
  );
};

export default Login;
