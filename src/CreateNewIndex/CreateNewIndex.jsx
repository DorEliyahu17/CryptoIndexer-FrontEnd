import React, { useEffect, useState, Fragment } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import InputMask from "react-input-mask";
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { unstable_composeClasses } from "@mui/material";
import { ClassNames } from "@emotion/react";
import Charts from '../Components/Charts'

import 'react-toastify/dist/ReactToastify.css';


function CreateNewIndex() {
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
    if (responseData.success) {
      console.log(responseData)
      console.log(responseData.success)
      console.log(responseData.data)
      let tempSymbolsNameArr = [];
      responseData.data.map(symbolObject => {
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
    setListSymbolPercentLine(changedlistSymbolPercentLine);
  };

  const handleOnClickRealse = () => {
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.pop()
    setListSymbolPercentLine(changedlistSymbolPercentLine);
  };

  const handleOnChangeSymbol = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].name = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    // console.log("NewSymbol.name= " + listSymbolPercentLine[index].name + " Symbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    check_if_all_symbol_complete()
  };

  const handleOnChangeIndexName = (event) => {
    setIndexName(event.target.value);
    // setListSymbolPercentLine(changedSymbolsList);
    // console.log("NewSymbol.name= " + listSymbolPercentLine[index].name + " Symbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    // check_if_all_symbol_complete()
  };

  const check_if_all_symbol_complete = () => {
    listSymbolPercentLine.map((stock, index) => {
      (stock.name !== '' && stock.name !== null) ? setDisableButtomBackTestSymbol(false) : setDisableButtomBackTestSymbol(true);
    })
    // console.log("disableButtomBackTestSymbol state is: " + disableButtomBackTestSymbol)
  };

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].percent = event.target.value;
    setListSymbolPercentLine(changedSymbolsList);
    // console.log("Symbol.name=" + listSymbolPercentLine[index].name + " NewSymbol.percent=" + listSymbolPercentLine[index].percent + " LineIndex=" + index);
    check_if_all_percent_complete()
  };

  const check_if_all_percent_complete = () => {
    let sumPercent = 0;
    listSymbolPercentLine.map((stock, index) => {
      sumPercent += Number(stock.percent);
    })
    if (sumPercent === 100) {
      setDisableButtomBackTestPercent(false)
    }
    else {
      setDisableButtomBackTestPercent(true)
    }
  };

  //example of POST request
  const createNewIndexRequest = () => {
    let symbolToPrice = {};
    let dataToPass = [];
    listSymbolPercentLine.forEach(record => {
      symbolToPrice[record.name] = record.percent
    })
    let encodedKey = encodeURIComponent('data');
    let encodedValue = encodeURIComponent(JSON.stringify(symbolToPrice));
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
  };

  //example of GET request
  const backTestRequest = async () => {
    let symbolToPrice = {};
    let dataValid = true;
    listSymbolPercentLine.forEach(record => {
      let symbolName = record.name.toLocaleUpperCase();
      if (listSupportedSymbols.findIndex(supportedSymbol => supportedSymbol === symbolName) === -1) {
        dataValid = false;
      }
      symbolToPrice[symbolName] = record.percent / 100;
    })
    if (dataValid) {
      console.log(listSymbolPercentLine);
      const response = await fetch('/api/backtest-new-index?' + new URLSearchParams({ data: JSON.stringify(symbolToPrice) }), { method: 'get' });
      const responseData = await response.json();
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
    <div id="create-new-index-form">
      <div id="create-new-index-symbol-list">
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
        {listSymbolPercentLine.map((symbol, index) => {
          console.log("Symbol.name=" + symbol.name + "Symbol.percent=" + symbol.percent + " LineIndex=" + index);
          return renderSymbolPercentLine(index);
        })}
      </div>
      <Button variant="contained" id="add-new-SymbolPercentLine" onClick={handleOnClickAdd}>
        Add
      </Button>
      {listSymbolPercentLine.length > 2
        ?
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />} id="Relase-last-SymbolPercentLine" onClick={handleOnClickRealse}>
            Relase
          </Button>
        </Stack>
        : null
      }
      <div>
        <Button disabled={disableButtomBackTestSymbol || disableButtomBackTestPercent} variant="contained" id="BackTestButtom" onClick={backTestRequest}>
          Backtest
        </Button>
        {showBacktest && renderTable()}
      </div>
      <ToastContainer />
    </div>
  );
};
export default CreateNewIndex;
