import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuyOrSellModal from "../ModalComponent/BuyOrSellModal";
import MUIDataTable from "mui-datatables";
import { Payment } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Loading from '../Components/Loading';

import 'react-toastify/dist/ReactToastify.css';
import './HomePage.less';

const propTypes = {
  userToken: PropTypes.String,
};

const defaultProps = {
  userToken: '',
};

function HomePage(props) {
  const { userToken } = props;
  const navigate = useNavigate();
  const [example, setExample] = useState(false);
  const [supportedSymbolsData, setSupportedSymbolsData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [mostSuccessfulUsersData, setMostSuccessfulUsersData] = useState([]);
  const [ownIndexesData, setOwnIndexesData] = useState([]);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyIndexInput, setBuyIndexInput] = useState({ indexName: "", countToBuy: 0 });
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellIndexInput, setSellIndexInput] = useState({ indexName: "", countToSell: 0 });

  //const classes = useStyles();  
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(async () => {
    setShowLoading(true);
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    await getSupportedSymbol();
    await sleep(20);
    await getMostSuccessfulUsersList();
    await sleep(20);
    await getOwnIndexes();
    setShowLoading(false);
  }, []);

  useEffect(() => {
    console.log('userToken=' + userToken);
    //handleGetSymbolsData();
    //console.log(SymbolsData);

  }, [userToken]);

  useEffect(() => {
    console.log("aa");
    //handleGetSymbolsData();
    //console.log(SymbolsData);

  }, [showBuyDialog]);

  //need to be fixed first in the api then here
  const getSupportedSymbol = async () => {
    const response = await fetch('/api/home-page-supported-symbols-list', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      let tempSymbolsNameArr = [];
      responseData.data.map(symbolObject => {
        tempSymbolsNameArr.push([
          `${symbolObject.Symbol} - ${symbolObject.Name}`,
          symbolObject.Price.toFixed(5),
          symbolObject.Weekly_Prc_Change.toFixed(5),
          symbolObject.Weekly_Low.toFixed(5),
          symbolObject.Weekly_High.toFixed(5)
        ]);
      });
      setSupportedSymbolsData(tempSymbolsNameArr);
    } else {
      toast(responseData.data);
    }
  };

  const getMostSuccessfulUsersList = async () => {
    const response = await fetch('/api/most-successful-users-list', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      console.log(responseData)
      console.log(responseData.success)
      console.log(responseData.data)
      let tempSymbolsNameArr = [];
      responseData.data.map(successfulUser => {
        tempSymbolsNameArr.push([, successfulUser.userName, successfulUser.indexName, successfulUser.weeklyGain, successfulUser.usersCount]);
      });
      setMostSuccessfulUsersData(tempSymbolsNameArr);
    } else {
      console.log(responseData.data);
      toast(responseData.data);
    }
  };

  const getOwnIndexes = async () => {
    const response = await fetch('/api/own-indexes?' + new URLSearchParams({ data: (userToken || window.localStorage.getItem('authorization')) }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      let tempSymbolsNameArr = [];
      responseData.data.result.map((indexObject, indexNumber) => {
        let investingUsersCount = 0;
        if (!indexObject.isPrivate) {
          //public index
          investingUsersCount = indexObject.inventingUsers;
        } else {
          if (indexObject.canBePublic) {
            investingUsersCount = "You can share your index with the community :)";
          } else {
            investingUsersCount = "You can't share your index with the community :(";
          }
        }
        tempSymbolsNameArr.push([, , indexObject.indexName, /*responseData.data.weeklyGains[indexNumber]*/'Change Me', investingUsersCount]);
      });
      setOwnIndexesData(tempSymbolsNameArr);
    } else {
      toast(responseData.data);
    }
  };

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

  const symbolColumns = ['Symbol', 'Price', 'Weekly gain(%)', 'Week Low', 'Week High'];
  /*
    const commonIndexColumns = [
      {
        name: "Payment", options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={() => { HandlePaymentRow(tableMeta) }}>
                <Payment color="primary" />
              </button>
            );
          }
        }
      },
      'Index Name', 'Recommended rating', 'Days gain(%)', 'Users Count'];
  */

  const mostSuccessfulUsers = [
    {
      name: "Payment", options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => { HandlePaymentRow(tableMeta) }}>
              <Payment color="primary" />
            </button>
          );
        }
      }
    },
    'Creator Name', 'Index Name', 'Weekly gain(%)', 'Users Count'];


  const ownIndexColumns = [
    {
      name: "Payment", options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => { HandlePaymentRow(tableMeta) }}>
              <Payment color="primary" />
            </button>
          );
        }
      }
    },
    {
      name: "Sell", options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => { HandleSellRow(tableMeta) }}>
              <HighlightOffIcon color="secondary" />
            </button>
          );
        }
      }
    },
    'Index Name', 'Weekly gain(%)', 'Users Count'];


  //OPTIONS
  const symbolOptions = {
    rowsPerPage: [3],
    rowsPerPageOptions: [3, 5, 10, 15],
    selectableRowsHideCheckboxes: true
  };

  const ownIndexesOptions = {
    rowsPerPage: [3],
    rowsPerPageOptions: [3, 5, 10, 15],
    selectableRowsHideCheckboxes: true
  };

  // const commonIndexesOptions = {
  //   //filterType: "checkbox",        
  //   //filterType: "checkbox",        
  //   //filterType: "checkbox",        
  //   rowsPerPage: [3],
  //   rowsPerPageOptions: [3, 5, 10, 15],
  //   selectableRowsHideCheckboxes: true,
  //   onChangePage(currentPage) {
  //     console.log({ currentPage });
  //   },
  //   onChangeRowsPerPage(numberOfRows) {
  //     console.log({ numberOfRows });
  //   }
  // };

  const mostSuccessfulUsersOptions = {
    rowsPerPage: [3],
    rowsPerPageOptions: [3, 5, 10, 15],
    selectableRowsHideCheckboxes: true
  };

  //DATA

  // const symbolsData = [
  //   ["BTC", "$40,038.60", "2.28%", "$40,028.60", "$40,138.60", "$761,877,839,620", "$33,368,145,255"],
  //   ["ETH", "$2,956.03", "2.97%", "$2,950.00", "$2,986.03", "$356,678,709,989", "$18,253,003,101"]
  // ];


  // const commonIndexesData = [
  //   [, "index1", "High", "2.28%", "50"],
  //   [, "index2", "Low", "2.97%", "2"]
  // ];

  // const mostSuccessfulUsersData = [
  //   [, "Tal Gavriel", "The best", "2.28%", "50"],
  //   [, "Matan kalili", "The second", "2.97%", "2"]
  // ];

  // const ownIndexesData = [
  //   [, , "index1", "High", "2.28%", 50],
  //   [, , "index2", "Low", "2.97%", 2]
  // ];



  const HandlePaymentRow = (rowData) => {
    console.log(rowData.indexName);
    buyIndexInput.indexName = rowData.indexName;
    setShowBuyDialog(true);
    console.log(buyIndexInput.countToBuy);
    //todo: send the rowData.indexName and buyIndexInput.countToBuy to BUY api
    //buyIndexInput.countToBuy = 0;
    //buyIndexInput.indexName = "";
  }

  const BuyIndex = async (countToBuy) => {
    console.log(buyIndexInput.indexName);
    console.log(countToBuy);
    //todo: send the indexName and countToBuy to BUY api

    fetch('/api//buy-or-sell-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: { userToken: userToken, index_hash: "hash", indexName: sellIndexInput.indexName, transactionData: { funding: -countToBuy, date: Date.now } }
    }).then(response => {
      console.log(response.json())
    }).catch((e) => {
      console.log(e);
    })

    await getOwnIndexes();

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

  const SellIndex = async (countToSell) => {
    console.log(sellIndexInput.indexName);
    console.log(countToSell);
    //todo: send the indexName and countToSell to SELL api

    fetch('/api//buy-or-sell-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: { userToken: userToken, index_hash: "hash", indexName: sellIndexInput.indexName, transactionData: { funding: -countToSell, date: Date.now } }
    }).then(response => {
      console.log(response.json())
    }).catch((e) => {
      console.log(e);
    })

    await getOwnIndexes();

    return Promise.resolve();
  }

  // const handleGetSymbolsData = () => {
  //   //todo:
  //   //get the data from the backed
  //   // setSymbolsData(res);
  // };

  // const handleChangePage = (event, newPage) => {  
  // const handleChangePage = (event, newPage) => {  
  // const handleChangePage = (event, newPage) => {  
  //   setPage(newPage);  
  //   setPage(newPage);  
  //   setPage(newPage);  
  // };  
  // };  
  // };  

  // const handleChangeRowsPerPage = event => {  
  // const handleChangeRowsPerPage = event => {  
  // const handleChangeRowsPerPage = event => {  
  //   setRowsPerPage(+event.target.value);  
  //   setRowsPerPage(+event.target.value);  
  //   setRowsPerPage(+event.target.value);  
  //   setPage(0);  
  //   setPage(0);  
  //   setPage(0);  
  // }; 
  // }; 
  // }; 

  // const handleChangePaymentRow = (event, buyIndexRow) => {  
  // const handleChangePaymentRow = (event, buyIndexRow) => {  
  // const handleChangePaymentRow = (event, buyIndexRow) => {  
  //   setBuyIndexInput(buyIndexRow);  
  //   setBuyIndexInput(buyIndexRow);  
  //   setBuyIndexInput(buyIndexRow);  
  // };  
  // };  
  // };  

  return (
    <div>
      {showLoading ?
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Loading />
        </div>
        :
        <div>
          <h1 style={{ marginBottom: '30px' }}>Home Page</h1>
          <div style={{ marginBottom: '30px' }}>
            <MUIDataTable
              title={"Symbols Table"}
              data={supportedSymbolsData}
              columns={symbolColumns}
              options={symbolOptions}
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <MUIDataTable
              style={{ marginBottom: '30px' }}
              title={"Best Indexes Table"}
              data={mostSuccessfulUsersData}
              columns={mostSuccessfulUsers}
              options={mostSuccessfulUsersOptions}
            />
          </div>
          <MUIDataTable
            title={"Own Indexes Table"}
            data={ownIndexesData}
            columns={ownIndexColumns}
            options={ownIndexesOptions}
          />
          {showBuyDialog && (
            <BuyOrSellModal
              isBuyModal={true}
              setShowBuyDialog={setShowBuyDialog}
              buyIndexInput={buyIndexInput}
              setBuyIndexInput={setBuyIndexInput}
              BuyIndex={BuyIndex}
            />
          )}
          {showSellDialog && (
            <BuyOrSellModal
              isBuyModal={false}
              setShowSellDialog={setShowSellDialog}
              sellIndexInput={sellIndexInput}
              setSellIndexInput={setSellIndexInput}
              SellIndex={SellIndex}
            />
          )}
        </div>
      }
    </div>
  );
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;
export default HomePage;