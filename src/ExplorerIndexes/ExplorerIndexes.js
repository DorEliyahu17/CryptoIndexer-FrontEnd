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
  {
    title: '1 st',
    subheader: 'Most popular',
    price: '15+',
    description: [
      'This is an example of a description written by the author of the index',
    ],

  },
  {
    title: '3 rd',
    price: '10+',
    description: [
      'This is an example of a description written by the author of the index',
    ],

  },
  {
    title: 'Nasdaq Crypto Index',
    price: '23+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'Crypto10',
    price: '12+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'Bitwise 10',
    price: '30',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'CRYPTO20',
    price: '22+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'SPBTC',
    price: '2.5+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'DeFi Pulse Index',
    price: '11+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'SPCMC',
    price: '7+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'All Crypto Index',
    price: '8+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
  {
    title: 'Major Crypto Index',
    price: '30+',
    description: [
      'This is an example of a description written by the author of the index',
    ],
    buttonText: 'See more details',
    buttonVariant: 'contained',
  },
];

const footers = [
 
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
          Community
        </Typography>
        
        <Typography variant="h5" align="center" color="text.secondary" component="p">
         Look in the community for indexes created by your friends..
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
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
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
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
                    {tier.description.map((line) => (
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
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
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
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}


export default function Content() {
  return (
    
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Search
              </Button>
            </Grid>
            <PricingContent />
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}