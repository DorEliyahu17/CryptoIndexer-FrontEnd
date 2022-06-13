import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Loading from '../Components/Loading';

function PricingContent(props) {
  const { search, indexes, handleMoreDetails } = props;
  const [filterIndexes, setFilterIndexes] = useState(indexes);

  useEffect(() => {
    if (indexes) {
      const temp = indexes.filter((indexObject) => indexObject.indexName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
      setFilterIndexes(temp);
    }
  }, [search]);

  return (
    <Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
      </AppBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 1, pb: 4 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Explorer Indexes
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Take a look at the community indexes
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {(filterIndexes || []).map((indexObject, i) => (
            <Grid
              item
              key={indexObject.indexName}
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={indexObject.indexName}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h5" color="text.primary">
                      Weekly Gain: {indexObject.weeklyGain.toFixed(5)}%
                    </Typography>
                  </Box>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={indexObject.creatorName}
                    >
                      Created By: {indexObject.creatorName}
                    </Typography>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={indexObject.investingCount}
                    >
                      {indexObject.investingCount} users investing this index
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleMoreDetails(indexObject)}
                  >
                    See More Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
}

const propTypes = {
  userToken: PropTypes.String,
  userName: PropTypes.String,
  setIndexToSee: PropTypes.func,
};

const defaultProps = {
  userToken: '',
  userName: '',
  setIndexToSee: () => { },
};

function ExplorerIndexes(props) {
  const { userToken, userName, setIndexToSee } = props;
  const navigate = useNavigate();
  const [indexes, setIndexes] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    setIndexToSee(null);
    const response = await fetch('/api/all-indexes-list?' + new URLSearchParams({
      data: JSON.stringify({
        userToken: (userToken || window.localStorage.getItem('authorization')),
        userName: (userName || window.localStorage.getItem('userName')),
        includeSelf: false
      })
    }), { method: 'get' });
    const responseData = await response.json();
    setIndexes(responseData.data.result);
    setIsLoading(false);
  }, []);

  const handleMoreDetails = (indexObject) => {
    let jsonObject = JSON.stringify({ indexHash: indexObject.indexHash, indexName: indexObject.indexName, creatorId: indexObject.creatorId });
    setIndexToSee(jsonObject);
    navigate("/index-details");
  }

  return (
    <Paper sx={{ maxWidth: 1300, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        {isLoading ?
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <Loading />
          </div>
          :
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'flex-end', flexDirection: 'row' }}>
                <Grid item>
                  <SearchIcon color="inherit" sx={{ display: 'block' }} />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by Symbol name"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: 'default' },
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="standard"
                  />
                </Grid>
              </div>
              <PricingContent
                search={search}
                indexes={indexes}
                handleMoreDetails={handleMoreDetails}
              />
            </Grid>
          </Toolbar>
        }
      </AppBar>
    </Paper>
  );
}

ExplorerIndexes.defaultProps = defaultProps;
ExplorerIndexes.propTypes = propTypes;
export default ExplorerIndexes;