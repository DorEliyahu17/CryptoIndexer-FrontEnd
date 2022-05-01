import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import PropTypes from 'prop-types';
import { Table } from "@mui/material";
import './HomePage.less';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import { ButtonUnstyled } from "@mui/base";

import {BuyModalContainer,SellModalContainer} from "../ModalComponent/ModalComponent";

//mu-icons

//import Remove from '@material-ui/icons/Remove';
//import { Delete } from "@material-ui/icons";
import { Payment } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';




function HomePage() {
  const [example, setExample] = useState(false);
  const [SymbolsData, setSymbolsData] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyIndexInput, setBuyIndexInput] = useState({countToBuy: 0});
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellIndexInput, setSellIndexInput] = useState({countToSell: 0});

  const tableRef = React.createRef();
  
  const symbolColumns = [
    {field: 'symbol', title: 'Symbol' },
    {field: 'price', title: 'Price'},
    {field: 'daysGain', title: 'Days gain(%)'},
    {field: 'dayLow',title: 'Day Low'},
    {field: 'dayHigh',title: 'Day High'},
    {field: 'marketCap',title: 'Market Cap'},
    {field: 'volume',title: 'Volume', type: "numeric" },
  ];


// const symbolData = (query) => (
//   new Promise((resolve,reject)=> {
//     let url = "https://server/api/get/symbols?";
//       //  url += "per_page=" + query.pageSize;
//        // url += "&page=" + (query.page + 1);
//        fetch(url)
//         .then((response) => response.json())
//         .then((result) => {
//           resolve({
//             data: result.data,
//             page: result.page - 1,
//             totalCount: result.total
//           });
//         });
//   }));



  const symbolData = [
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


  const indexColumns = [
    {field: 'indexName', title: 'Index Name' },
    {field: 'recommendedRating', title: 'Recommended rating'},
    {field: 'daysGain', title: 'Days gain(%)'},
    {field: 'usersCount',title: 'Users Count'}
  ];


  // const commonIndexData = (query) => (
  //   new Promise((resolve,reject)=> {
  //     let url = "https://server/api/get/index?";
  //       //  url += "per_page=" + query.pageSize;
  //        // url += "&page=" + (query.page + 1);
  //        fetch(url)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           resolve({
  //             data: result.data,
  //             page: result.page - 1,
  //             totalCount: result.total
  //           });
  //         });
  //   }));


  const commonIndexesData = [
    {
      "indexName":"index1",
      "recommendedRating":"High",
      "daysGain":"2.28%",
      "usersCount":"50"
    },
    {
      "indexName":"index2",
      "recommendedRating":"Low",
      "daysGain":"2.97%	",
      "usersCount":"2"
      }
  ];



  // const ownIndexData = (query) => (
  //   new Promise((resolve,reject)=> {
  //     let url = "https://server/api/get/index?";
  //       //  url += "per_page=" + query.pageSize;
  //        // url += "&page=" + (query.page + 1);
  //        fetch(url)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           resolve({
  //             data: result.data,
  //             page: result.page - 1,
  //             totalCount: result.total
  //           });
  //         });
  //   }));


  const ownIndexesData = [
    {
      "indexName":"index1",
      "recommendedRating":"High",
      "daysGain":"2.28%",
      "usersCount":"50"
    },
    {
      "indexName":"index2",
      "recommendedRating":"Low",
      "daysGain":"2.97%	",
      "usersCount":"2"
      }
  ];

  const HandlePaymentRow = (event, rowData) => {
    console.log(rowData.indexName);
    setShowBuyDialog(true);
    console.log(buyIndexInput);

  }
  const HandleSellRow = (event, rowData) => {
    console.log(rowData.indexName);
    setShowSellDialog(true);
    console.log(buyIndexInput);
  }


  const handleGetSymbolsData = () => {
    //todo:
    //get the data from the backed
    // setSymbolsData(res);
  };



 useEffect(() => {
  console.log("aa");
  //handleGetSymbolsData();
  //console.log(SymbolsData);

},[showBuyDialog]);


  return (
    <div>
      <div>

      <h1>Home Page</h1>

      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="Symbols Table" columns={symbolColumns} data={symbolData} options={{exportButton:true}} />;
      </ThemeProvider>


      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="Best Indexes Table" columns={indexColumns} data={commonIndexesData} actions={[
          {
            icon:Payment,
            tooltip:'pay to buy it',
            onClick:(event, rowData) => HandlePaymentRow(event, rowData)
        }
        ]} />;
      </ThemeProvider>

      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="My Own Indexes Table" columns={indexColumns} data={ownIndexesData} actions={[
          {
            icon: HighlightOffIcon,
            tooltip:'sell this index',
            onClick:(event, rowData) => HandleSellRow(event, rowData)
        }
        ]} />;
      </ThemeProvider>

    </div>
    {showBuyDialog && (
        <BuyModalContainer
//        {...props}
        setShowBuyDialog={setShowBuyDialog}
        buyIndexInput={buyIndexInput}
        setBuyIndexInput={setBuyIndexInput}
      />
      )
  }

{showSellDialog && (
        <SellModalContainer
//        {...props}
        setShowSellDialog={setShowSellDialog}
        sellIndexInput={sellIndexInput}
        setSellIndexInput={setSellIndexInput}
      />
      )
  }
    </div>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage />);

export default HomePage; 