import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Table } from "@mui/material";
import './HomePage.less';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';


function HomePage() {
  const [example, setExample] = useState(false);
  const [SymbolsData, setSymbolsData] = useState([]);
  const defaultMaterialTheme = createTheme();


  const columns = [
    {field: 'symbol', title: 'Symbol' },
    {field: 'price', title: 'Price'},
    {field: 'daysGain', title: 'Days gain(%)'},
    {field: 'dayLow',title: 'Day Low'},
    {field: 'dayHigh',title: 'Day High'},
    {field: 'marketCap',title: 'Market Cap'},
    {field: 'volume',title: 'Volume', type: "numeric" },
  ];

  const data = [
    {
      "symbol":"BTC",
      "price":"$40,038.60",
      "daysGain":"2.28%",
      "dayLow":"$40,028.60",
      "dayHigh":"$40,138.60",
      "marketCap":"$761,877,839,620",
      "volume":"$33,368,145,255"
    },
    {
      "symbol":"ETH",
      "price":"$2,956.03",
      "daysGain":"2.97%	",
      "dayLow":"$2,950.00",
      "dayHigh":"$2,986.03",
      "marketCap":"$356,678,709,989",
      "volume":"$18,253,003,101"
      }
  ];


  const handleGetSymbolsData = () => {
    //todo:
    //get the data from the backed
    // setSymbolsData(res);
  };



//  useEffect(() => {
//   console.log("aa");
//   handleGetSymbolsData();
//   console.log(SymbolsData);

// },[])


  return (
    <div>
      <h1>Home Page</h1>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="symbols Table" columns={columns} data={data} options={{exportButton:true}} />;
      </ThemeProvider>
    </div>
  );
}

export default HomePage; 