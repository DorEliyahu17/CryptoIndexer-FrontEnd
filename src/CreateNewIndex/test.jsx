// Matan and Dor write

import React, {useEffect, useState, Fragment} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function CreateNewIndex() {
  const [ symbolsList, setSymbolList ] = useState([{name: '', percent: 0}, {name: '', percent: 0}]);

  useEffect(() => {
    symbolsList.map((symbol, index) => {
      console.log("symbol.name="+symbol.name+"symbol.percent="+symbol.percent+" index="+index);
    });
  }, [symbolsList])

  const handleOnClickAddSymbol = () => {
    let changedSymbolsList = symbolsList;
    changedSymbolsList.push({name: '', percent: 0});
    setSymbolList(changedSymbolsList);
  };

  const handleOnChangeSymbol = (event, index) => {
    let changedSymbolsList = symbolsList;
    changedSymbolsList[index].name = event.target.value; 
    setSymbolList(changedSymbolsList);
  };

  const handleOnChangePercent = (event, index) => {
    let changedSymbolsList = symbolsList;
    changedSymbolsList[index].percent = event.target.value;
    setSymbolList(changedSymbolsList);
  };

  const renderNewSymbolPercentLine = (boxIndex, symbolName = '', percent = 0) => (
    <Box
      component="form"
      id={`box-${boxIndex}`}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          // id="outlined-required"
          id={`symbol-${boxIndex}`}
          label="Symbol Name"
          placeholder="Symbol Name"
          // value={symbolName}
          onChange={(event) => handleOnChangeSymbol(event, boxIndex)}
        />
        <TextField
          required
          // id="outlined-required"
          id={`percent-${boxIndex}`}
          label="Percent"
          placeholder="Percent"
          // value={percent}
          onChange={(event) => handleOnChangePercent(event, boxIndex)}
        />
      </div>
    </Box>
  );

  return (
    <div id="create-new-index-form">
      <div id="create-new-index-symbol-list">
        {/* {(symbolsList.length == 0) ?
          renderNewSymbolPercentLine(0)
        : */}
          {symbolsList.map((symbol, index) => {
            console.log("symbol.name="+symbol.name+"symbol.percent="+symbol.percent+" index="+index);
            return renderNewSymbolPercentLine(index, symbol.name, symbol.percent);
          })}
        {/* } */}
      </div>
      <Button variant="contained" id="add-new-symbol" onClick={handleOnClickAddSymbol}>
        Add
      </Button>
    </div>
  );
}
export default CreateNewIndex; ``