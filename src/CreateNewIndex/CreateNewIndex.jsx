import React, {useEffect, useState, Fragment} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import InputMask from "react-input-mask";
import PropTypes from 'prop-types';
import { unstable_composeClasses } from "@mui/material";
import { ClassNames } from "@emotion/react";

function CreateNewIndex() {
  
  const [listSymbolPercentLine, setlistSymbolPercentLine] =  useState([{name: '', percent: 0}, {name: '', percent:0}]);
  const [disableButtomBackTestSymbol,setdisableButtomBackTestSymbol] = useState({state: true});
  const [disableButtomBackTestPercent,setdisableButtomBackTestPercent] = useState({state: true});
  
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
            placeholder="Symbol Name"/>}
      </InputMask>
      <InputMask 
        mask="99" 
        disabled={false}
        maskChar=" "
        id={`percent-${boxIndex}`}
        onChange={(event) => handleOnChangePercent(event, boxIndex)}>
      {() => <TextField
        required
        label="0"
        placeholder="Percent"/>}
      </InputMask>
    </Box>
  );

  const handleOnClickAdd = () =>{
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.push({name: '', percent: 0})
    setlistSymbolPercentLine(changedlistSymbolPercentLine);
  };
  const handleOnClickRealse = () =>{
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.pop()
    setlistSymbolPercentLine(changedlistSymbolPercentLine);
  }
  const handleOnChangeSymbol = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].name = event.target.value; 
    setlistSymbolPercentLine(changedSymbolsList);
    console.log("NewSymbol.name= "+listSymbolPercentLine[index].name+" Symbol.percent="+listSymbolPercentLine[index].percent+" LineIndex="+index);
    check_if_all_symbol_complete()
  };
  const check_if_all_symbol_complete = () => {
    listSymbolPercentLine.map((stock,index) => {
      (stock.name !== '' && stock.name !== null) ? setdisableButtomBackTestSymbol({state:false}) : setdisableButtomBackTestSymbol({state:true});
    })
    console.log("disableButtomBackTestSymbol state is: " +disableButtomBackTestSymbol.state)
  }

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].percent = event.target.value;
    setlistSymbolPercentLine(changedSymbolsList);
    console.log("Symbol.name="+listSymbolPercentLine[index].name+" NewSymbol.percent="+listSymbolPercentLine[index].percent+" LineIndex="+index);
    check_if_all_percent_complete()
  };
  const check_if_all_percent_complete = () => {
    let sumPercent = 0;
    listSymbolPercentLine.map((stock, index) => {
      sumPercent += Number(stock.percent);
    })
    if(sumPercent === 100) {
      setdisableButtomBackTestPercent({state:false})}
    else {
      setdisableButtomBackTestPercent({state:true})}
    }

  return (
    <div id="create-new-index-form">
      <div id="create-new-index-symbol-list">
          {listSymbolPercentLine.map((symbol, index) => {
            console.log("Symbol.name="+symbol.name+"Symbol.percent="+symbol.percent+" LineIndex="+index);
            return renderSymbolPercentLine(index);
          })}
      </div>
        <Button variant="contained" id="add-new-SymbolPercentLine" onClick={handleOnClickAdd}>
          Add
        </Button>
         { listSymbolPercentLine.length > 2 
        ? 
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />} id="Relase-last-SymbolPercentLine" onClick={handleOnClickRealse}>
            Relase
            </Button>
          </Stack>
        : null
         }
         <div> 
         <Button disabled={disableButtomBackTestSymbol.state||disableButtomBackTestPercent.state} variant="contained" id="BackTestButtom" /*onClick={handleOnClickAdd}*/>
          Backtest
        </Button> 
         </div>
    </div>
    )
};
export default CreateNewIndex;
