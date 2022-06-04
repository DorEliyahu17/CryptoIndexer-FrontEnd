import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import StarIcon from '@mui/icons-material/StarBorder';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


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

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        CryptoIndexer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: '2 nd',
    price: '0',
    description: [
      'This is an example of a description written by the author of the index',
    ],
  },

];


function PricingContent() {
  return (
    <React.Fragment>
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
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Index Name Example
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
                label="Type an amount to check using a reverse checks"
                name="number"
                autoFocus
              />
        <Button
        type="submit"
        fullWidth
        color = "primary"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}

        href="/explorer-indexes"
      >
        Test
      </Button>
      <Button
        type="submit"
        fullWidth
        color = "secondary"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}

        href="/explorer-indexes"
      >
        Invest this amount
      </Button>
      </Typography>


      {/* End hero unit */}

    </React.Fragment>

  );
}


function Content() {
  return (

    <Paper sx={{ maxWidth: 1300, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <PricingContent />
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
    
  );
}

// Content.defaultProps = defaultProps;
// Content.propTypes = propTypes;
export default Content;