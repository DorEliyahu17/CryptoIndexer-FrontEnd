import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Loading from '../Components/Loading';
import Charts from '../Components/Charts';

const propTypes = {
  userToken: PropTypes.String,
  indexHash: PropTypes.String,
  indexName: PropTypes.String,
};

const defaultProps = {
  userToken: '',
  indexHash: '',
  indexName: '',
};
function IndexDetails(props) {
  const { userToken, indexHash, indexName } = props;
  const navigate = useNavigate();
  const [showBacktestLoading, setShowBacktestLoading] = useState(false);
  const [showBacktest, setShowBacktest] = useState(false);
  const [backtestPrices, setBacktestPrices] = useState([]);
  const [backtestDates, setBacktestDates] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
  }, [])

  const products = [
    {
      name: 'Coin 1',
      price: '50%',
    },
    {
      name: 'Coin 2',
      price: '5%',
    },
    {
      name: 'Coin 3',
      price: '20%',
    },
    {
      name: 'Coin 4',
      price: '25%',
    },

  ];

  const backTestRequest = async () => {
    setShowBacktestLoading(true);
    const response = await fetch('/api/backtest-exist-index?' + new URLSearchParams({ data: indexHash, /* TODO - change this value to the actual amount (initialCash) */ }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      setBacktestPrices(responseData.data.index.balance_progress);
      setBacktestDates(responseData.data.index.dates);
      setShowBacktestLoading(false);
      setShowBacktest(true);
    } else {
      setShowBacktest(false);
      toast(responseData.data);
    }
  };

  const renderTable = () => {
    return (
      <Charts type='line' labels={backtestDates} firstIndexName={indexName} firstIndexPrices={backtestPrices} />
    );
  };

  return (
    <Fragment>
      <Paper sx={{ height: '100%', width: '100%', margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
              <CssBaseline />
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
              >
              </AppBar>
              {/* Hero unit */}
              <Container disableGutters fullwidth component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {indexName}
                </Typography>

                <Typography variant="h5" align="center" color="text.secondary" component="p">
                  Explanation of the index.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Details of the composition of the currencies in the index
                </Typography>
                <List disablePadding>
                  {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={product.name} secondary={product.desc} />
                      <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                  ))}

                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Profit in 1Y" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      %34.06
                    </Typography>
                  </ListItem>
                </List>
                <Grid container spacing={2}>
                  <Grid item container direction="column" xs={12} sm={6}>
                  </Grid>
                </Grid>
              </Container>
              <Typography align='center'>
                <TextField
                  margin="normal"
                  required
                  id="number"
                  label="Invest cash to backtest"
                  name="number"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  color="primary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={backTestRequest}
                >
                  Backtest
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}

                  href="/explorer-indexes"
                >
                  Invest this amount
                </Button>
              </Typography>
            </Grid>
          </Toolbar>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 10, width: 300 }}
            href="/explorer-indexes"
          >
            Back To Community

          </Button>
        </AppBar>
      </Paper>
      <div style={{ width: '100%' }}>
        {showBacktestLoading && <Loading label="Fetching data..." />}
      </div>
      {showBacktest && renderTable()}
    </Fragment>
  );
}

IndexDetails.defaultProps = defaultProps;
IndexDetails.propTypes = propTypes;
export default IndexDetails;