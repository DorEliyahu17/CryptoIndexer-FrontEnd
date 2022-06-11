import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import InputMask from "react-input-mask";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
  OutlinedInput,
  Stack,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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

function CreateNewIndex(props) {
  const { userToken } = props;
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [showCreatingLoading, setShowCreatingLoading] = useState(false);
  const [listSupportedSymbols, setListSupportedSymbols] = useState([]);
  const [indexName, setIndexName] = useState('');
  const [listSymbolPercentLine, setListSymbolPercentLine] = useState([{ name: '', percent: 0 }, { name: '', percent: 0 }]);
  const [searchText, setSearchText] = useState('');
  const [initialCash, setInitialCash] = useState(1000);
  const [disableButtomBackTestSymbol, setDisableButtomBackTestSymbol] = useState(true);
  const [disableButtomBackTestPercent, setDisableButtomBackTestPercent] = useState(true);
  const [showBacktest, setShowBacktest] = useState(false);
  const [showBacktestLoading, setShowBacktestLoading] = useState(false);
  const [backtestColors, setBacktestColors] = useState([]);
  const [backtestPrices, setBacktestPrices] = useState([]);
  const [backtestDates, setBacktestDates] = useState([]);
  const [backtestOtherSymbols, setBacktestOtherSymbols] = useState([]);

  useEffect(async () => {
    setShowLoading(true);
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    const response = await fetch('/api/supported-symbols-list', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success && responseData.data.length > 0) {
      setListSupportedSymbols(responseData.data);
      setShowLoading(false);
    } else {
      toast('Error fetching supported symbols data: ' + responseData.data);
    }
  }, []);

  const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const handleOnClickAdd = () => {
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.push({ name: '', percent: 0 })
    setDisableButtomBackTestSymbol(true)
    setDisableButtomBackTestPercent(false)
    setListSymbolPercentLine(changedlistSymbolPercentLine);
  };

  const handleOnClickRealse = () => {
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.pop()
    validateSymbolComplete()
    validatePercentComplete()
    setListSymbolPercentLine(changedlistSymbolPercentLine);
  };

  const validatePercentComplete = () => {
    let sumPercent = 0;
    listSymbolPercentLine.map((stock, index) => {
      sumPercent += Number(stock.percent);
    });
    (sumPercent === 100) ? setDisableButtomBackTestPercent(false) : setDisableButtomBackTestPercent(true);
  };

  const validateSymbolComplete = () => {
    listSymbolPercentLine.map((stock, index) => {
      (stock.name !== '' && stock.name !== null) ? setDisableButtomBackTestSymbol(false) : setDisableButtomBackTestSymbol(true);
    });
  };

  const handleOnChangeSymbol = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].name = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    validateSymbolComplete();
  };

  const handleOnChangeIndexName = (event) => {
    setIndexName(event.target.value);
  };

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].percent = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    validatePercentComplete()
  };

  const handleOnChangeInitialCash = (event) => {
    let initialCashFromEvent = event.target.value;
    if (initialCashFromEvent > 0) {
      setInitialCash(initialCashFromEvent);
    } else {
      toast('Initial cash cannot be less than 1$');
      setInitialCash(0);
    }
  };

  const renderSymbolPercentLine = (boxIndex) => (
    <Box
      component="form"
      id={`box-${boxIndex}`}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      style={{ display: 'flex' }}
    >
      <div style={{ margin: '8px', marginRight: '0px', width: '100%', minWidth: '440px' }}>
        <FormControl fullWidth>
          <InputLabel id={`search-select-symbol-${boxIndex}-label`}>Symbol</InputLabel>
          <Select
            // Disables auto focus on MenuItems and allows TextField to be in focus
            MenuProps={{
              autoFocus: false,
              sx: {
                '.MuiPaper-root': {
                  maxHeight: '273px',
                  left: '8px !important',
                },
              },
            }}
            InputProps={{
              sx: {

              }
            }}
            labelId={`search-select-symbol-${boxIndex}-label`}
            id={`search-select-symbol-${boxIndex}`}
            value={() => {
              return listSymbolPercentLine[boxIndex].name;
            }}
            label="Symbol"
            onChange={(event) => handleOnChangeSymbol(event, boxIndex)}
            onClose={() => setSearchText("")}
            // This prevents rendering empty string in Select's value
            // if search text would exclude currently selected option.
            renderValue={() => {
              if (listSymbolPercentLine[boxIndex].name !== '') {
                return listSymbolPercentLine[boxIndex].name + ' - ' + listSupportedSymbols.find(symbolObject => symbolObject.symbol === listSymbolPercentLine[boxIndex].name).name;
              } else {
                return 'Select a symbol';
              }
            }}
          >
            {/* TextField is put into ListSubheader so that it doesn't
                act as a selectable item in the menu
                i.e. we can click the TextField without triggering any selection.*/}
            <ListSubheader>
              <TextField
                size="small"
                // Autofocus on textfield
                autoFocus
                placeholder="Symbol to search..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Escape") {
                    // Prevents autoselecting item while typing (default Select behaviour)
                    e.stopPropagation();
                  }
                }}
              />
            </ListSubheader>
            {listSupportedSymbols.filter((symbolObject) => containsText(symbolObject.symbol, searchText) || containsText(symbolObject.name, searchText)).map((symbolObject, i) => (
              <MenuItem key={i} value={symbolObject.symbol}>
                {symbolObject.symbol} - {symbolObject.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <InputMask
        mask="99"
        disabled={false}
        maskChar=" "
        pattern="[0-9]*"
        id={`percent-${boxIndex}`}
        onChange={(event) => handleOnChangePercent(event, boxIndex)}>
        {() => <TextField
          required
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          label="Percent"
          placeholder="Percent" />}
      </InputMask>
    </Box>
  );

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
  const createNewIndexRequest = () => {
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
    let symbolToPrice = {};
    let dataValid = true;
    const colorsObject = {};
    setShowBacktestLoading(true);
    listSymbolPercentLine.forEach(record => {
      let symbolName = record.name.toUpperCase();
      let color = {};
      let foundInSupportedSymbols = listSupportedSymbols.find(supportedSymbol => supportedSymbol.symbol === symbolName);
      if (!foundInSupportedSymbols) {
        dataValid = false;
      }
      color['red'] = foundInSupportedSymbols.red;
      color['green'] = foundInSupportedSymbols.green;
      color['blue'] = foundInSupportedSymbols.blue;
      symbolToPrice[symbolName] = record.percent / 100;
      colorsObject[symbolName] = color;
    })
    if (dataValid) {
      const response = await fetch('/api/backtest-new-index?' + new URLSearchParams({ data: JSON.stringify(symbolToPrice), initialCash }), { method: 'get' });
      const responseData = await response.json();
      setShowBacktestLoading(false);
      if (responseData.success) {
        setBacktestColors(colorsObject)
        setBacktestPrices(responseData.data.index.balance_progress);
        setBacktestDates(responseData.data.index.dates);
        setBacktestOtherSymbols(responseData.data.symbols);
        setShowBacktest(true);
      } else {
        setShowBacktest(false);
        toast(responseData.data);
      }
    } else {
      setShowBacktestLoading(false);
      toast('One or more coins symbols are not exist or not supported');
    }
  };

  const renderTable = () => {
    const statisticsOptions = {
      rowsPerPage: [3],
      rowsPerPageOptions: [3, 5, 10, 15],
      selectableRowsHideCheckboxes: true,
    };
    const statisticsColumns = ['Symbol', 'ROI', 'Max-DrawDown', 'Sharp Ratio', 'Standard Weekly Return', 'Average Weekly Return'];
    let statisticsData = [];
    backtestOtherSymbols.map((symbolObject) => {
      statisticsData.push([
        symbolObject.symbol,
        symbolObject.roi.toFixed(5),
        symbolObject.max_drawdown.toFixed(5),
        symbolObject.sharpe_ratio.toFixed(5),
        symbolObject.weekly_return_std.toFixed(5),
        symbolObject.weekly_return_avg.toFixed(5)
      ]);
    });

    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column', flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
        <Charts type='line' labels={backtestDates} firstIndexName={indexName} firstIndexPrices={backtestPrices} otherSymbols={backtestOtherSymbols} otherSymbolsColors={backtestColors} isMultiAxios={true} />
        <div style={{ width: '100%', height: '100%' }}>
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
        <div id="create-new-index-form" style={{ display: 'flex', marginRight: '40px' }}>
          <div id="create-new-index-symbol-list" style={{ display: 'flex', minWidth: '600px' }}>
            <div style={{ width: '100%' }}>
              <Box
                component="form"
                id={`box-index-name`}
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                autoComplete="off"
              >
                <TextField
                  required
                  label="Index Name"
                  placeholder="Index Name"
                  onChange={(event) => handleOnChangeIndexName(event)}
                />
              </Box>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button variant="contained" id="add-new-SymbolPercentLine" onClick={handleOnClickAdd}>
                  Add
                </Button>
                {listSymbolPercentLine.length > 2
                  ?
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<DeleteIcon />} id="Relase-last-SymbolPercentLine" onClick={handleOnClickRealse} style={{ marginLeft: '5px' }}>
                      Relase
                    </Button>
                  </Stack>
                  : null
                }
              </div>
              {listSymbolPercentLine.map((symbol, index) => {
                return renderSymbolPercentLine(index);
              })}
            </div>
          </div>
          <div id="create-new-index-actions" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '5px', marginLeft: '10px' }}>
                  <div>
                    {renderInitialCashForBacktest()}
                  </div>
                  <div>
                    <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent || indexName === ''} variant="contained" id="BackTestButtom" onClick={backTestRequest}>
                      Backtest
                    </Button>
                    <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent || indexName === '' || !showBacktest} variant="contained" id="CreateNewIndextButtom" onClick={createNewIndexRequest} style={{ marginLeft: '5px' }}>
                      Create New Index
                    </Button>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                {showBacktestLoading && <Loading label="Fetching data..." />}
                {showCreatingLoading && <Loading label="Creating index..." />}
              </div>
            </div>
            {showBacktest && renderTable()}
          </div>
        </div>
      }
    </div>
  );
};

CreateNewIndex.defaultProps = defaultProps;
CreateNewIndex.propTypes = propTypes;
export default CreateNewIndex;
