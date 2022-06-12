import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuyOrSellModal from "../ModalComponent/BuyOrSellModal";
import MUIDataTable from "mui-datatables";
import { Payment } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Loading from '../Components/Loading';
import { getDate } from '../utils/utils';

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
  // const [page, setPage] = useState(0);
  // const [data, setData] = useState([]);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const symbolColumns = ['Symbol', 'Price', 'Weekly gain(%)', 'Week Low', 'Week High'];
  const mostSuccessfulUsers = [
    {
      name: "Payment", options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => { HandlePaymentRow(tableMeta, false) }}>
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
            <button onClick={() => { HandleSellRow(tableMeta, false) }}>
              <HighlightOffIcon color="secondary" />
            </button>
          );
        }
      }
    },
    'Creator Name',
    'Index Name',
    'Weekly gain(%)',
    'Users Count'
  ];
  const ownIndexColumns = [
    {
      name: "Payment", options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button onClick={() => { HandlePaymentRow(tableMeta, true) }}>
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
            <button onClick={() => { HandleSellRow(tableMeta, true) }}>
              <HighlightOffIcon color="secondary" />
            </button>
          );
        }
      }
    },
    'Index Name',
    'Weekly gain(%)',
    'Users Count',
  ];
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
  const mostSuccessfulUsersOptions = {
    rowsPerPage: [3],
    rowsPerPageOptions: [3, 5, 10, 15],
    selectableRowsHideCheckboxes: true
  };

  useEffect(async () => {
    setShowLoading(true);
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    await getSupportedSymbol();
    sleep(10).then(async () => {
      await getMostSuccessfulUsersList();
      sleep(10).then(async () => {
        await getOwnIndexes();
        setShowLoading(false);
      });
    })
  }, []);

  useEffect(() => {
    console.log("aa");
    //handleGetSymbolsData();
    //console.log(SymbolsData);

  }, [showBuyDialog]);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

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
        tempSymbolsNameArr.push([, , successfulUser.userName, successfulUser.indexName, successfulUser.weeklyGain, successfulUser.usersCount]);
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

  const HandlePaymentRow = (rowData, isOwn) => {
    debugger
    console.log(rowData.indexName);
    buyIndexInput.indexName = isOwn ? rowData.rowData[2] : rowData.rowData[3];
    buyIndexInput.isOwn = isOwn;
    setShowBuyDialog(true);
    console.log(buyIndexInput.countToBuy);
    //todo: send the rowData.indexName and buyIndexInput.countToBuy to BUY api
    //buyIndexInput.countToBuy = 0;
    //buyIndexInput.indexName = "";
  };

  const BuyIndex = async (countToBuy) => {
    console.log(buyIndexInput.indexName);
    console.log(countToBuy);
    let dataToEncode = {};
    let dataToPass = [];
    const curDate = getDate();
    dataToEncode = {
      userToken: (userToken || window.localStorage.getItem('authorization')),
      indexName: buyIndexInput.indexName,
      transactionData: { amount: countToBuy, date: curDate },
      isOwnIndex: buyIndexInput.isOwn
    }
    let encodedKey = encodeURIComponent('data');
    let encodedValue = encodeURIComponent(JSON.stringify(dataToEncode));
    dataToPass.push(encodedKey + "=" + encodedValue);
    dataToPass = dataToPass.join("&");
    //todo: send the indexName and countToBuy to BUY api
    debugger
    fetch('/api/buy-or-sell-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataToPass
      // { userToken: userToken, index_hash: "hash", indexName: sellIndexInput.indexName, transactionData: { funding: countToBuy, date: curDate } }
    }).then((response) => {
      if (!response.ok) {
        toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
      } else {
        toast('The money invested successfully!');
      }
    }).catch((response) => {
      toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
    })

    await getOwnIndexes();

    return Promise.resolve();
  };

  const HandleSellRow = (rowData) => {
    console.log(rowData.rowData);
    sellIndexInput.indexName = rowData[0];
    setShowSellDialog(true);
    console.log(sellIndexInput.countToSell);
    //todo: send the rowData.indexName and sellIndexInput.countToBuy to SELL api
    //sellIndexInput.countToSell = 0;
    //sellIndexInput.indexName = "";
  };

  const SellIndex = async (countToSell) => {
    console.log(sellIndexInput.indexName);
    console.log(countToSell);
    //todo: send the indexName and countToSell to SELL api

    fetch('/api//buy-or-sell-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: { userToken: userToken, index_hash: "hash", indexName: sellIndexInput.indexName, transactionData: { amount: -countToSell, date: Date.now } }
    }).then(response => {
      console.log(response.json())
    }).catch((e) => {
      console.log(e);
    })

    await getOwnIndexes();

    return Promise.resolve();
  };

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