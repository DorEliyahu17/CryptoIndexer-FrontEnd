import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import Loading from '../Components/Loading';
import Charts from '../Components/Charts';

import 'react-toastify/dist/ReactToastify.css';

const propTypes = {
  userToken: PropTypes.String,
};

const defaultProps = {
  userToken: '',
};

function Top10ByMCIndex(props) {
  const { userToken } = props;
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [showCreatingLoading, setShowCreatingLoading] = useState(false);
  const [listSupportedSymbols, setListSupportedSymbols] = useState([]);
  const [indexName, setIndexName] = useState('');
  const [listSymbolPercentLine, setListSymbolPercentLine] = useState([{ name: '', percent: 0 }, { name: '', percent: 0 }]);
  const [initialCash, setInitialCash] = useState(1000);
  const [disableButtomBackTestSymbol, setDisableButtomBackTestSymbol] = useState(true);
  const [disableButtomBackTestPercent, setDisableButtomBackTestPercent] = useState(true);
  const [showBacktest, setShowBacktest] = useState(false);
  const [showBacktestLoading, setShowBacktestLoading] = useState(false);
  const [backtestPrices, setBacktestPrices] = useState([]);
  const [backtestDates, setBacktestDates] = useState([]);
  const [backtestOtherSymbols, setBacktestOtherSymbols] = useState([]);
  const [backtestIndexData, setBacktestIndexData] = useState({});

  useEffect(async () => {
    if (!window.localStorage.getItem('authorization') && window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
  }, []);

  const handleOnChangeInitialCash = (event) => {
    let initialCashFromEvent = event.target.value;
    if (initialCashFromEvent > 0) {
      setInitialCash(initialCashFromEvent);
    } else {
      toast('Initial cash cannot be less than 1$');
      setInitialCash(0);
    }
  };

  const renderInitialCashForBacktest = () => (
    <Box
      component="form"
      id={'box-initial-cash'}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="initial-cash">Initial Cash To Backtest</InputLabel>
        <OutlinedInput
          id="initial-cash"
          required
          onChange={(event) => handleOnChangeInitialCash(event)}
          value={initialCash}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Initial Cash To Backtest"
          placeholder="Initial Cash To Backtest"
        />
      </FormControl>
    </Box>
  );

  //example of POST request
  const investIndexRequest = () => {
    setShowCreatingLoading(true);
    let dataToEncode = {};
    let symbolToPrice = [];
    let dataToPass = [];
    let dataValid = true;
    listSymbolPercentLine.forEach(record => {
      let symbolName = record.name.toUpperCase();
      let weight = record.percent / 100;
      if (listSupportedSymbols.findIndex(supportedSymbol => supportedSymbol.symbol === symbolName) === -1) {
        dataValid = false;
      }
      symbolToPrice.push({ symbol: symbolName, weight: weight });
    })
    if (dataValid) {
      // TODO: change later is private field
      dataToEncode = { userToken: (userToken || window.localStorage.getItem('authorization')), indexName: indexName, symbolToPrice: symbolToPrice, isPrivate: false }
      let encodedKey = encodeURIComponent('data');
      let encodedValue = encodeURIComponent(JSON.stringify(dataToEncode));
      dataToPass.push(encodedKey + "=" + encodedValue);
      dataToPass = dataToPass.join("&");
      fetch('/api/create-new-index', {
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
          toast('The index created successfully!');
          navigate("/");
        }
      }).catch((response) => {
        toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
      })
    }
  };

  //example of GET request
  const backTestRequest = async () => {
    setShowBacktestLoading(true);
    const response = await fetch('/api/backtest-top-10-index?' + new URLSearchParams({ initialCash }), { method: 'get' });
    const responseData = await response.json();
    setShowBacktestLoading(false);
    if (responseData.success) {
      setBacktestPrices(responseData.data.balance_progress);
      setBacktestDates(responseData.data.dates);
      setBacktestOtherSymbols(responseData.data.current_components);
      setBacktestIndexData({
        max_drawdown: responseData.data.max_drawdown,
        roi: responseData.data.roi,
        sharpe_ratio: responseData.data.sharpe_ratio,
        weekly_return_avg: responseData.data.weekly_return_avg,
        weekly_return_std: responseData.data.weekly_return_std
      })
      setShowBacktest(true);
    } else {
      setShowBacktest(false);
      toast(responseData.data);
    }
  };

  const renderTable = () => {
    const indexSymbolsOptions = {
      rowsPerPage: [10],
      rowsPerPageOptions: [1],
      selectableRowsHideCheckboxes: true,
    };
    const statisticsOptions = {
      rowsPerPage: [3],
      rowsPerPageOptions: [3, 5, 10, 15],
      selectableRowsHideCheckboxes: true,
    };
    const indexSymbolsColumns = ['Rank', 'Name', 'Symbol', 'Market Cap', 'Price'];
    const statisticsColumns = ['Symbol', 'ROI', 'Max-DrawDown', 'Sharpe Ratio', 'Weekly Returns Average', 'Weekly Returns Standard Deviation'];
    let indexSymbolsData = [];
    backtestOtherSymbols.map((symbolObject) => {
      indexSymbolsData.push([
        symbolObject.Rank,
        symbolObject.Name,
        symbolObject.Symbol,
        `${symbolObject.Market_Cap}$`,
        `${symbolObject.Price}$`,
      ]);
    });

    let statisticsData = [[
      'Top 10 Cryptos By Market Cap',
      `${(backtestIndexData.roi * 100).toFixed(2)}%`,
      `${(backtestIndexData.max_drawdown * 100).toFixed(2)}%`,
      backtestIndexData.sharpe_ratio.toFixed(5),
      `${(backtestIndexData.weekly_return_avg * 100).toFixed(2)}%`,
      `${(backtestIndexData.weekly_return_std * 100).toFixed(2)}%`
    ]];

    return (
      <div>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
          <Charts type='line' labels={backtestDates} firstIndexName='Top 10 Cryptos By Market Cap' firstIndexPrices={backtestPrices} />
          <div style={{ width: '70%', marginLeft: '16px', height: '100%' }}>
            <MUIDataTable
              title={"Index Symbols"}
              data={indexSymbolsData}
              columns={indexSymbolsColumns}
              options={indexSymbolsOptions}
            />
          </div>
        </div>
        <div style={{ marginTop: '16px', width: '100%', height: '100%' }}>
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
    <div>
      {showLoading ?
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Loading />
        </div>
        :
        <Fragment>
          <h1 style={{ marginTop: '8px', marginBottom: '16px' }}>Top 10 Cryptos By Market Cap</h1>
          <div id="create-new-index-form" style={{ display: 'flex', marginRight: '40px' }}>
            <div id="create-new-index-actions" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '20%', height: '100%', alignItems: 'center' }}>
                  <div style={{ marginTop: '16px', marginLeft: '10px' }}>
                    <div>
                      {renderInitialCashForBacktest()}
                    </div>
                    <div>
                      <Button variant="contained" id="BackTestButtom" onClick={backTestRequest}>
                        Backtest
                      </Button>
                      <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent || indexName === '' || !showBacktest} variant="contained" id="CreateNewIndextButtom" onClick={investIndexRequest} style={{ marginLeft: '5px' }}>
                        Invest
                      </Button>
                    </div>
                  </div>
                </div>
                <div style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                  {showBacktestLoading && <Loading label="Fetching data..." />}
                  {showCreatingLoading && <Loading label="Investing money..." />}
                </div>
              </div>
              <div style={{ width: '100%', marginRight: '16px', marginLeft: '16px' }}>
                {showBacktest && renderTable()}
              </div>
            </div>
          </div>
        </Fragment>
      }
    </div>
  );
};

Top10ByMCIndex.defaultProps = defaultProps;
Top10ByMCIndex.propTypes = propTypes;
export default Top10ByMCIndex;
