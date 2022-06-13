import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getDate } from '../utils/utils';
import Loading from '../Components/Loading';

const propTypes = {
  userToken: PropTypes.string,
};

const defaultProps = {
  userToken: '',
};

function ReportBug(props) {
  const { userToken } = props;
  const navigate = useNavigate();
  const [showCreatingLoading, setShowCreatingLoading] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem('authorization') && window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
  }, []);

  const handleSubmit = (e) => {
    setShowCreatingLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if ((data.get('title') !== '') && (data.get('description') !== '')) {
      const curDate = getDate();
      const newBugData = {
        title: data.get('title'),
        description: data.get('description'),
        reporterToken: userToken,
        insertDate: curDate,
      }
      let dataToPass = [];
      let encodedKey = encodeURIComponent('data');
      let encodedValue = encodeURIComponent(JSON.stringify(newBugData));
      dataToPass.push(encodedKey + "=" + encodedValue);
      dataToPass = dataToPass.join("&");
      fetch('/api/insert-bug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: dataToPass
      }).then((response) => {
        setShowCreatingLoading(false);
        if (!response.ok) {
          toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
        } else {
          toast('The bug repported successfully!');
          navigate("/");
        }
      }).catch((response) => {
        toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
      })
    } else {
      setShowCreatingLoading(false);
      toast('Please fill the form correctly!');
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="l">
        <Box id="bug-box"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BugReportOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Report A Bug
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
              multiline
              rows={8}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container >
      {showCreatingLoading &&
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Loading label="Reporting your bug..." />
        </div>}
    </Fragment>
  );
}

ReportBug.defaultProps = defaultProps;
ReportBug.propTypes = propTypes;
export default ReportBug;