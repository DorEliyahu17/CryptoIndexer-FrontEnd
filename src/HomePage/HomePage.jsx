import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
import { ThemeProvider, createTheme, IconButton } from '@mui/material';
import { ButtonUnstyled } from "@mui/base";
import BuyOrSellModal from "../ModalComponent/BuyOrSellModal";

//mui-table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';  
import TableContainer from '@material-ui/core/TableContainer';  
import TextField from  '@material-ui/core/TextField';


//MUIDataTable
import MUIDataTable from "mui-datatables";



//mu-icons

//import Remove from '@material-ui/icons/Remove';
import { Delete } from "@material-ui/icons";
import { Payment } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
//import MaterialTable from "material-table";

import './HomePage.less';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
});

function HomePage(props) {
  const [example, setExample] = useState(false);
  const [SymbolsData, setSymbolsData] = useState([]);
  const defaultMaterialTheme = createTheme();
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyIndexInput, setBuyIndexInput] = useState({ indexName: "", countToBuy: 0 });
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellIndexInput, setSellIndexInput] = useState({ indexName: "", countToSell: 0 });

  //const classes = useStyles();  
  const [page, setPage] = React.useState(0);  
  const [data, setData] = useState([]);  
  const [rowsPerPage, setRowsPerPage] = React.useState(5);  

  // const tableRef = React.createRef();




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

  //COLUMNS

  const symbolColumns = ['Symbol','Price','Days gain(%)','Day Low','Day High', 'Market Cap','Volume' ];

  const commonIndexColumns = [
    {name: "Payment",options: {customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <button onClick={() => {HandlePaymentRow(tableMeta)}}>
            <Payment color="primary" />
        </button>
      );
    } }},
  'Index Name','Recommended rating','Days gain(%)','Users Count'];

  const ownIndexColumns = [
    {name: "Payment",options: {customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <button onClick={() => {HandlePaymentRow(tableMeta)}}>
            <Payment color="primary" />
        </button>
      );
    } }},
    {name: "Sell",options: {customBodyRender: (value, tableMeta, updateValue) => {
      return (
        <button onClick={() => {HandleSellRow(tableMeta)}}>
          <HighlightOffIcon color="secondary"/>
        </button>
      );
    } }},
  'Index Name','Recommended rating','Days gain(%)','Users Count'];


  //OPTIONS
  const symbolOptions = {
    //filterType: "checkbox",        
    rowsPerPage:[3],
    rowsPerPageOptions:[3,5,10,15],
    selectableRowsHideCheckboxes: true,
    onChangePage (currentPage) {
      console.log({currentPage});
    },
    onChangeRowsPerPage (numberOfRows) {
      console.log({numberOfRows});
    }
  };

  const ownIndexesOptions = {
    //filterType: "checkbox",        
    rowsPerPage:[3],
    rowsPerPageOptions:[3,5,10,15],
    selectableRowsHideCheckboxes: true,
    onChangePage (currentPage) {
      console.log({currentPage});
    },
    onChangeRowsPerPage (numberOfRows) {
      console.log({numberOfRows});
    }
  };

  const commonIndexesOptions = {
    //filterType: "checkbox",        
    rowsPerPage:[3],
    rowsPerPageOptions:[3,5,10,15],
    selectableRowsHideCheckboxes: true,
    onChangePage (currentPage) {
      console.log({currentPage});
    },
    onChangeRowsPerPage (numberOfRows) {
      console.log({numberOfRows});
    }
  };

//DATA

  const symbolData = [
    ["BTC", "$40,038.60","2.28%", "$40,028.60", "$40,138.60","$761,877,839,620","$33,368,145,255"],
    ["ETH", "$2,956.03","2.97%", "$2,950.00", "$2,986.03","$356,678,709,989","$18,253,003,101"]
  ];


const commonIndexesData = [
  [,"index1", "High","2.28%", "50"],
  [,"index2", "Low","2.97%", "2"]
];

const ownIndexesData = [
  [,,"index1", "High","2.28%", 50],
  [,,"index2", "Low","2.97%", 2]
];



  const HandlePaymentRow = (rowData) => {
    console.log(rowData.indexName);
    buyIndexInput.indexName = rowData.indexName;
    setShowBuyDialog(true);
    console.log(buyIndexInput.countToBuy);
    //todo: send the rowData.indexName and buyIndexInput.countToBuy to BUY api
    //buyIndexInput.countToBuy = 0;
    //buyIndexInput.indexName = "";
  }

  const BuyIndex = (countToBuy) => {
    console.log(buyIndexInput.indexName);
    console.log(countToBuy);
    //todo: send the indexName and countToBuy to BUY api
    return Promise.resolve();
  }


  const HandleSellRow = (rowData) => {
    console.log(rowData.rowData);
    sellIndexInput.indexName = rowData[0];
    setShowSellDialog(true);
    console.log(sellIndexInput.countToSell);
    //todo: send the rowData.indexName and sellIndexInput.countToBuy to SELL api
    //sellIndexInput.countToSell = 0;
    //sellIndexInput.indexName = "";
  }

  const SellIndex = (countToSell) => {
    console.log(sellIndexInput.indexName);
    console.log(countToSell);
    //todo: send the indexName and countToSell to SELL api
    return Promise.resolve();
  }

  // const handleGetSymbolsData = () => {
  //   //todo:
  //   //get the data from the backed
  //   // setSymbolsData(res);
  // };

  // const handleChangePage = (event, newPage) => {  
  //   setPage(newPage);  
  // };  
  
  // const handleChangeRowsPerPage = event => {  
  //   setRowsPerPage(+event.target.value);  
  //   setPage(0);  
  // }; 

// const handleChangePaymentRow = (event, buyIndexRow) => {  
//   setBuyIndexInput(buyIndexRow);  
// };  



  useEffect(() => {
    console.log("aa");
    //handleGetSymbolsData();
    //console.log(SymbolsData);

  }, [showBuyDialog]);


  return (
    <div>
      <div>
        <h1>Home Page</h1>


        <MUIDataTable
          title={"Symbols Table"}
          data={symbolData}
          columns={symbolColumns}
          options={symbolOptions}
        />

        <MUIDataTable
          title={"Best Indexes Table"}
          data={commonIndexesData}
          columns={commonIndexColumns}
          options={commonIndexesOptions}
        />

        <MUIDataTable
          title={"Own Indexes Table"}
          data={ownIndexesData}
          columns={ownIndexColumns}
          options={ownIndexesOptions}
        />


      </div>
      {showBuyDialog && (
        <BuyOrSellModal
          //        {...props}
          isBuyModal={true}
          setShowBuyDialog={setShowBuyDialog}
          buyIndexInput={buyIndexInput}
          setBuyIndexInput={setBuyIndexInput}
          BuyIndex={BuyIndex}
        />
      )}
      {showSellDialog && (
        <BuyOrSellModal
          //        {...props}
          isBuyModal={false}
          setShowSellDialog={setShowSellDialog}
          sellIndexInput={sellIndexInput}
          setSellIndexInput={setSellIndexInput}
          SellIndex={SellIndex}
        />
      )}
    </div>
  );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<HomePage />);

export default HomePage; 