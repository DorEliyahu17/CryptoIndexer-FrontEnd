import React, { useEffect, useState, Fragment } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import InputMask from "react-input-mask";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { unstable_composeClasses } from "@mui/material";
import { ClassNames } from "@emotion/react";
import Charts from '../Components/Charts'

import 'react-toastify/dist/ReactToastify.css';

const propTypes = {
  userToken: PropTypes.String,
};

const defaultProps = {
  userToken: '',
};

function CreateNewIndex(props) {
  const { userToken } = props;
  const [listSupportedSymbols, setListSupportedSymbols] = useState([]);
  const [indexName, setIndexName] = useState('');
  const [listSymbolPercentLine, setListSymbolPercentLine] = useState([{ name: '', percent: 0 }, { name: '', percent: 0 }]);
  const [disableButtomBackTestSymbol, setDisableButtomBackTestSymbol] = useState(true);
  const [disableButtomBackTestPercent, setDisableButtomBackTestPercent] = useState(true);
  const [showBacktest, setShowBacktest] = useState(false);
  const [backtestPrices, setBacktestPrices] = useState([]);
  const [backtestDates, setBacktestDates] = useState([]);

  useEffect(async () => {
    const response = await fetch('/api/supported-symbols-list', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success && responseData.data.count > 0) {
      console.log(responseData)
      console.log(responseData.success)
      console.log(responseData.data)
      let tempSymbolsNameArr = [];
      responseData.data.result.map(symbolObject => {
        tempSymbolsNameArr.push(symbolObject.sym);
      });
      setListSupportedSymbols(tempSymbolsNameArr);
    } else {
      console.log(responseData.data);
      toast(responseData.data);
    }
  }, []);

  const renderSymbolPercentLine = (boxIndex) => (
    <Box
      component="form"
      id={`box-${boxIndex}`}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <InputMask
        mask="aaa"
        disabled={false}
        maskChar=" "
        id={`symbol-${boxIndex}`}
        onChange={(event) => handleOnChangeSymbol(event, boxIndex)}
      >
        {() => <TextField
          required
          label="Symbol Name"
          placeholder="Symbol Name" />}
      </InputMask>
      <InputMask
        mask="99"
        disabled={false}
        maskChar=" "
        pattern="[0-9]*"
        id={`percent-${boxIndex}`}
        onChange={(event) => handleOnChangePercent(event, boxIndex)}>
        {() => <TextField
          required
          label="Percent"
          placeholder="Percent" />}
      </InputMask>
    </Box>
  );

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
    // console.log("disableButtomBackTestSymbol state is: " + disableButtomBackTestSymbol)
  };

  const handleOnChangeSymbol = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].name = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    // console.log("NewSymbol.name= " + listSymbolPercentLine[index].name + " Symbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    validateSymbolComplete()
  };

  const handleOnChangeIndexName = (event) => {
    setIndexName(event.target.value);
    // setListSymbolPercentLine(changedSymbolsList);
    // console.log("NewSymbol.name= " + listSymbolPercentLine[index].name + " Symbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    // validateSymbolComplete()
  };

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].percent = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    // console.log("Symbol.name=" + listSymbolPercentLine[index].name + " NewSymbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    validatePercentComplete()
  };



  //example of POST request
  const createNewIndexRequest = () => {
    let dataToEncode = {};
    let symbolToPrice = [];
    let dataToPass = [];
    let dataValid = true;
    listSymbolPercentLine.forEach(record => {
      let symbolName = record.name.toUpperCase();
      let weight = record.percent / 100;
      if (listSupportedSymbols.findIndex(supportedSymbol => supportedSymbol === symbolName) === -1) {
        dataValid = false;
      }
      symbolToPrice.push({ symbol: symbolName, weight: weight });
    })
    if (dataValid) {
      // TODO: change later is private field
      dataToEncode = { indexName: indexName, symbolToPrice: symbolToPrice, isPrivate: false }
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
      }).then(response => {
        console.log(response.json())
      }).catch((e) => {
        console.log(e);
      })
    }
  };

  //example of GET request
  const backTestRequest = async () => {
    let symbolToPrice = {};
    let dataValid = true;
    listSymbolPercentLine.forEach(record => {
      let symbolName = record.name.toUpperCase();
      // debugger
      if (listSupportedSymbols.findIndex(supportedSymbol => supportedSymbol === symbolName) === -1) {
        dataValid = false;
      }
      symbolToPrice[symbolName] = record.percent / 100;
    })
    if (dataValid) {
      console.log(listSymbolPercentLine);
      const response = await fetch('/api/backtest-new-index?' + new URLSearchParams({ data: JSON.stringify(symbolToPrice) }), { method: 'get' });
      const responseData = await response.json();
      // debugger
      if (responseData.success) {
        setBacktestPrices(responseData.data.balance_progress);
        setBacktestDates(responseData.data.dates);
        setShowBacktest(true);
        console.log(responseData)
        console.log(responseData.success)
        console.log(responseData.data)
        console.log(responseData.data.balance_progress)
        console.log(responseData.data.dates)
      } else {
        setShowBacktest(false);
        console.log(responseData.data);
        toast(responseData.data);
      }
    } else {
      toast('One or more coins symbols are not exist or not supported');
    }
  };

  const renderTable = () => {
    return (<Charts type='line' labels={backtestDates} firstIndexName={indexName} firstIndexPrices={backtestPrices} />);
  };

  return (
    <div id="create-new-index-form" style={{ display: 'flex', marginRight: '40px' }}>
      <div id="create-new-index-symbol-list" style={{ display: 'flex', minWidth: '575px' }}>
        <div>
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
            console.log("Symbol.name=" + symbol.name + "Symbol.percent=" + symbol.percent + " LineIndex=" + index);
            return renderSymbolPercentLine(index);
          })}
        </div>
      </div>
      <div id="create-new-index-actions" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start' }}>
        <div style={{ marginTop: '5px', marginLeft: '10px' }}>
          <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent} variant="contained" id="BackTestButtom" onClick={backTestRequest}>
            Backtest
          </Button>
          <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent || indexName === ''} variant="contained" id="CreateNewIndextButtom" onClick={createNewIndexRequest} style={{ marginLeft: '5px' }}>
            Create New Index
          </Button>
        </div>
        {showBacktest && renderTable()}
      </div>
    </div>
  );
};

CreateNewIndex.defaultProps = defaultProps;
CreateNewIndex.propTypes = propTypes;
export default CreateNewIndex;
