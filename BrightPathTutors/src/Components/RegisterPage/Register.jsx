import React, { useState } from 'react';
import axios from 'axios';
import { Button,TextField,CssBaseline,Avatar,Link,Paper,Box,Grid,Typography,Select,InputLabel,MenuItem} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import register_img from '../../assets/Register.svg';

function Register() {
  const navigate = useNavigate();
  const [queryParam, setQueryParam] = useState(Date.now());

  // Function to generate a new query parameter value
  const generateQueryParam = () => {
    setQueryParam(Date.now());
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role is student
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        errorMessage = /^[a-zA-Z][a-zA-Z0-9_]{5,29}$/.test(value)
          ? ''
          : 'Username must be 6 to 30 characters, start with a letter, and only contain letters, numbers, and underscores';
        break;
      case 'email':
        errorMessage = value.trim() ? (/\S+@\S+\.\S+/.test(value) ? '' : 'Email is not valid') : 'Email is required';
        break;
      case 'password':
        errorMessage = value.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
          ? ''
          : 'Password must be alphanumeric, have a capital letter, contain a special character, and be longer than 8 characters';
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const endpoint = formData.role === 'tutor' ? 'http://localhost:5000/tutor' : 'http://localhost:5000';
      const { data } = await axios.post(
        endpoint,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        config
      );
      console.log("User Created:", data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('User registered successfully!');
      formData.role === 'tutor' ? navigate('/logintutor') : navigate('/login');
      // Optionally, you can redirect the user to another page after successful registration
      // history.push('/dashboard');
    } catch (error) {
      console.log(error);
      alert('Registration failed. Please try again.');
    }
  };

  const onLoginHandler = async (e) => {
    const loginRoute = formData.role === 'tutor' ? "/logintutor" : "/login";
    navigate(loginRoute);
  }

  const isFieldValid = (field) => {
    return !errors[field] && formData[field];
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
          backgroundImage: `url(${register_img}?${queryParam})`,
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
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
            sx={{ mb: 1 }}
              type="text"
              id="name"
              name="name"
              fullWidth
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              //className={`Register-UI-form-control ${isFieldValid('name') ? 'Register-UI-is-valid' : ''} ${errors.name ? 'Register-UI-is-invalid' : ''}`}
            />
            {errors.name && <Typography variant="caption text" color="red">*{errors.name}</Typography>}
            <TextField
              sx={{ mb: 1 }}
              type="email"
              id="email"
              fullWidth
              label="E-mail"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              // className={`Register-UI-form-control ${isFieldValid('email') ? 'Register-UI-is-valid' : ''} ${errors.email ? 'Register-UI-is-invalid' : ''}`}
            />
            {errors.email && <Typography variant="caption text" color="red">*{errors.email}</Typography>}
            <TextField
              sx={{ mb: 1 }}
              type="password"
              id="password"
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              //className={`Register-UI-form-control ${isFieldValid('password') ? 'Register-UI-is-valid' : ''} ${errors.password ? 'Register-UI-is-invalid' : ''}`}
            />
            {errors.password && <Typography variant="caption text" color="red">*{errors.password}</Typography>}
          <InputLabel size='string' id="Role">Role</InputLabel>
            <Select
              labelId="Role"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="Register-UI-form-control"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="tutor">Tutor</MenuItem>
            </Select>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
            SIGN UP
            </Button>
            <Grid container>
                <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
                </Grid>
            </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

export default Register;
