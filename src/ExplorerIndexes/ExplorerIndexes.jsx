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
import StarIcon from '@mui/icons-material/StarBorder';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Loading from '../Components/Loading';

function PricingContent(props) {
  const { search, tiers } = props;
  const [filterTiers, setFilterTiers] = useState(tiers);

  useEffect(() => {
    const temp = tiers.filter((tier) => tier.title.toLocaleLowerCase().includes(search))
    setFilterTiers(temp)
  }, [search]);

  return (
    <Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      {/* <CssBaseline /> */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 1, pb: 4 }}>
        <Typography
          // component="h1"
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
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {(filterTiers || []).map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === '1 st' ? <StarIcon /> : null}
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
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {(tier.description || []).map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} href="/IndexPopUp">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {(footers || []).map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </Fragment>
  );
}

const propTypes = {
  userToken: PropTypes.String,
};

const defaultProps = {
  userToken: '',
};

function ExplorerIndexes(props) {
  const { userToken } = props;
  const navigate = useNavigate();
  const [tiers, setTiers] = useState();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    const response = await fetch('/api/content', { method: 'get' });
    const responseData = await response.json();
    setTiers(responseData)
    setIsLoading(false);
  }, []);

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
              <PricingContent search={search} tiers={tiers} />
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