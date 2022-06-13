import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MUIDataTable from "mui-datatables";
import Loading from '../Components/Loading';
import Charts from '../Components/Charts';
import { getDate } from '../utils/utils';


const propTypes = {
  userToken: PropTypes.String,
  indexHash: PropTypes.String,
  indexName: PropTypes.String,
};

const defaultProps = {
  userToken: '',
  indexHash: '',
  indexName: 'No Index Name',
};
function IndexDetails(props) {
  const { userToken, indexToSee, setIndexToSee } = props;
  const navigate = useNavigate();
  const [initialCash, setInitialCash] = useState(1000);
  const [showBacktestLoading, setShowBacktestLoading] = useState(false);
  const [showCreatingLoading, setShowCreatingLoading] = useState(false);
  const [showBacktest, setShowBacktest] = useState(false);
  const [backtestPrices, setBacktestPrices] = useState([]);
  const [backtestDates, setBacktestDates] = useState([]);
  const [backtestIndexData, setBacktestIndexData] = useState({});

  useEffect(() => {
    if (window.localStorage.getItem('authorization') === '') {
      setIndexToSee(null);
      navigate("/login");
    }
    if (window.localStorage.getItem('indexToSee')) {
      setIndexToSee(window.localStorage.getItem('indexToSee'));
    }
  }, [])

  const backTestRequest = async () => {
    setShowBacktestLoading(true);
    const response = await fetch('/api/backtest-exist-index?' + new URLSearchParams({ data: indexToSee.indexHash, initialCash }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      setBacktestPrices(responseData.data.index.balance_progress);
      setBacktestDates(responseData.data.index.dates);
      setBacktestIndexData(responseData.data.index);
      setShowBacktestLoading(false);
      setShowBacktest(true);
    } else {
      setShowBacktest(false);
      toast(responseData.data);
    }
  };

  const handleInvestRequest = async () => {
    setShowCreatingLoading(true);
    let dataToEncode = {};
    let dataToPass = [];
    const curDate = getDate();
    dataToEncode = {
      userToken: (userToken || window.localStorage.getItem('authorization')),
      indexName: indexToSee.indexName,
      creatorId: indexToSee.creatorId,
      transactionData: { amount: initialCash, date: curDate },
      isOwnIndex: false
    }
    let encodedKey = encodeURIComponent('data');
    let encodedValue = encodeURIComponent(JSON.stringify(dataToEncode));
    dataToPass.push(encodedKey + "=" + encodedValue);
    dataToPass = dataToPass.join("&");
    fetch('/api/buy-or-sell-index', {
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
        toast('The money invested successfully!');
        navigate("/");
      }
    }).catch((response) => {
      toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
    })
  };

  const handleBackToExplorer = () => {
    setIndexToSee(null);
    navigate("/explorer-indexes");
  };

  const renderTable = () => {
    const statisticsOptions = {
      rowsPerPage: [3],
      rowsPerPageOptions: [3, 5, 10, 15],
      selectableRowsHideCheckboxes: true,
    };
    const statisticsColumns = ['Symbol', 'ROI', 'Max-DrawDown', 'Sharp Ratio', 'Weekly Returns Average', 'Weekly Returns Standard Deviation'];
    let statisticsData = [];
    statisticsData.push([
      indexToSee.indexName,
      backtestIndexData.roi.toFixed(5),
      backtestIndexData.max_drawdown.toFixed(5),
      backtestIndexData.sharpe_ratio.toFixed(5),
      backtestIndexData.weekly_return_avg.toFixed(5),
      backtestIndexData.weekly_return_std.toFixed(5)
    ]);

    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
        <Charts type='line' labels={backtestDates} firstIndexName={indexToSee.indexName} firstIndexPrices={backtestPrices} />
        <div style={{ width: '100%', height: '100%', marginTop: '16px' }}>
          <MUIDataTable
            title={"Statistics"}
            data={statisticsData}
            columns={statisticsColumns}
            options={statisticsOptions}
          />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div style={{ display: 'flex', marginTop: '36px' }}>
        <div style={{ marginRight: '8px', marginLeft: '8px', width: '30%' }}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Typography align='center'>
                <h2>{indexToSee.indexName}</h2>
                <TextField
                  margin="normal"
                  required
                  id="number"
                  label="Invest cash to backtest and invest"
                  name="number"
                  autoFocus
                  value={initialCash}
                  onChange={(e) => setInitialCash(e.target.value)}
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
                  onClick={handleInvestRequest}
                >
                  Invest this amount
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleBackToExplorer}
                >
                  Back To Community
                </Button>
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                {showBacktestLoading && <Loading label="Fetching data..." />}
                {showCreatingLoading && <Loading label="Investing..." />}
              </div>
            </Grid>
          </Toolbar>
        </div>
        <div style={{ marginRight: '8px', width: '70%' }}>
          {showBacktest && renderTable()}
        </div>
      </div>
    </Fragment>
  );
}

IndexDetails.defaultProps = defaultProps;
IndexDetails.propTypes = propTypes;
export default IndexDetails;