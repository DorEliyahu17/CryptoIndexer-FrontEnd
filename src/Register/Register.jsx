import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { validateEmail } from '../utils/utils';
import Loading from '../Components/Loading';

const propTypes = {
  setUserToken: PropTypes.func,
  setUserName: PropTypes.func,
  setUserAdmin: PropTypes.func,
};

const defaultProps = {
  setUserToken: () => { },
  setUserName: () => { },
  setUserAdmin: () => { },
};

function Register(props) {
  const { setUserToken, setUserName, setUserAdmin } = props;
  const navigate = useNavigate();
  const [showCreatingLoading, setShowCreatingLoading] = useState(false);

  const handleSubmit = (e) => {
    setShowCreatingLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if ((data.get('username') !== '') && (data.get('email') !== '') &&
      (data.get('password') !== '') && (data.get('passwordVal') !== '') &&
      (data.get('apiKey') !== '') && (data.get('password') === data.get('passwordVal')) &&
      (data.get('password').length >= 5) && (validateEmail(data.get('email')))) {
      const newUserData = {
        userName: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        apiKey: data.get('apiKey')
      }
      let dataToPass = [];
      let encodedKey = encodeURIComponent('data');
      let encodedValue = encodeURIComponent(JSON.stringify(newUserData));
      dataToPass.push(encodedKey + "=" + encodedValue);
      dataToPass = dataToPass.join("&");
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: dataToPass
      }).then((response) => {
        setShowCreatingLoading(false);
        setUserToken(response.headers.get('authorization'));
        setUserName(response.headers.get('name'));
        setUserAdmin(response.headers.get('admin'));
        if (!response.ok) {
          toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
        } else {
          toast('The user created successfully!');
          navigate("/");
        }
      }).catch((response) => {
        toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
      })
    } else {
      setShowCreatingLoading(false);
      toast('Please fill the form correctly or enter matching passwords!');
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box id="register-box"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="E-mail"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordVal"
              label="Re-Enter Password"
              type="password"
              id="passwordVal"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apiKey"
              label="Binance API Key"
              type="password"
              id="apiKey"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign UP
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container >
      {showCreatingLoading &&
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Loading label="Creating user..." />
        </div>}
    </Fragment>
  );
}

Register.defaultProps = defaultProps;
Register.propTypes = propTypes;
export default Register;