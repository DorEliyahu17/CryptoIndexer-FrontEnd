import React, {useEffect, useState, Fragment} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function CreateNewIndex() {
  
  const [listSymbolPercentLine, setlistSymbolPercentLine] =  useState([{name: '', percent: 0}, {name: '', percent: 0}]);
  
  useEffect(() => {
    listSymbolPercentLine.map((symbol, index) => {
      console.log("symbol.name="+symbol.name+"symbol.percent="+symbol.percent+" index="+index);
    });

  }, [listSymbolPercentLine]);
  
  const renderSymbolPercentLine = (boxIndex, symbolName = '', percent = 0) => (
    <Box
      component="form"
      id={`box-${boxIndex}`}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id={`symbol-${boxIndex}`}
        label="Symbol Name"
        placeholder="Symbol Name"
        onChange={(event) => handleOnChangeSymbol(event, boxIndex)}
      />
      <TextField
        required
        id={`percent-${boxIndex}`}
        label="0"
        value={0}
        placeholder="Percent"
        onChange={(event) => handleOnChangePercent(event, boxIndex)}
      />
    </Box>
  );

  const handleOnClickAdd = () =>{
    let changedlistSymbolPercentLine = listSymbolPercentLine.map((listItem) => {
      return listItem;
    });
    changedlistSymbolPercentLine.push({name:'' , percent: 0})
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
    console.log("NewSymbol.name="+listSymbolPercentLine[index].name+" Symbol.percent="+listSymbolPercentLine[index].percent+" LineIndex="+index);
  };

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = listSymbolPercentLine;
    changedSymbolsList[index].percent = event.target.value;
    setlistSymbolPercentLine(changedSymbolsList);
    console.log("Symbol.name="+listSymbolPercentLine[index].name+" NewSymbol.percent="+listSymbolPercentLine[index].percent+" LineIndex="+index);
  };

  return (
    <div id="create-new-index-form">
      <div id="create-new-index-symbol-list">
          {listSymbolPercentLine.map((symbol, index) => {
            console.log("symbol.name="+symbol.name+"symbol.percent="+symbol.percent+" index="+index);
            return renderSymbolPercentLine(index, symbol.name, symbol.percent);
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
    </div>
  )
};
export default CreateNewIndex;
