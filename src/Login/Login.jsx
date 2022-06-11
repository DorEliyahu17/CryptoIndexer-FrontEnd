import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { validateEmail } from '../utils/utils';

const propTypes = {
  setUserToken: PropTypes.func,
};

const defaultProps = {
  setUserToken: () => { },
};

function Login(props) {
  const { setUserToken } = props;
  const [error, setError] = useState()
  const navigate = useNavigate();

  const handleLoginFunc = async (email, password) => {
    try {
      if (!validateEmail(email)) {
        setError('Email not valid')
      } else if (password.length < 5) {
        setError('password not valid min 5')
      } else {
        let dataToPass = [];
        let dataToEncode = { email: email, password: password }
        let encodedKey = encodeURIComponent('data');
        let encodedValue = encodeURIComponent(JSON.stringify(dataToEncode));
        dataToPass.push(encodedKey + "=" + encodedValue);
        dataToPass = dataToPass.join("&");
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: dataToPass
        }).then((response) => {
          if (!response.ok) {
            toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
          } else {
            setUserToken(response.headers.get('token'))
            toast('Login successfully!');
            navigate("/");
          }
        }).catch((response) => {
          toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    await handleLoginFunc(data.get('email'), data.get('password'));
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
          backgroundImage: 'url(https://source.unsplash.com/random)',
          // backgroundImage: 'url(${process.env.PUBLIC_URL + '/Back.png'})',
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
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div>{error}</div>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

Login.defaultProps = defaultProps;
Login.propTypes = propTypes;
export default Login;