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
  const [investedIndexesData, setInvestedIndexesData] = useState([]);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [buyIndexInput, setBuyIndexInput] = useState({ indexName: "", countToBuy: 0 });
  const [showSellDialog, setShowSellDialog] = useState(false);
  const [sellIndexInput, setSellIndexInput] = useState({ indexName: "", countToSell: 0 });

  const symbolColumns = ['Symbol', 'Price', 'Weekly gain(%)', 'Week Low', 'Week High'];
  const mostSuccessfulUsers = [
    // {
    //   name: "Payment", options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <button onClick={() => { HandlePaymentRow(tableMeta, false) }}>
    //           <Payment color="primary" />
    //         </button>
    //       );
    //     }
    //   }
    // },
    // {
    //   name: "Sell", options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <button onClick={() => { HandleSellRow(tableMeta, false) }}>
    //           <HighlightOffIcon color="secondary" />
    //         </button>
    //       );
    //     }
    //   }
    // },
    'Creator Name',
    'Index Name',
    'Weekly gain(%)',
    'Users Count'
  ];
  const investedIndexes = [
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
    'invested Amount',
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
    'invested Amount',
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
    if (!window.localStorage.getItem('authorization') && window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    await getSupportedSymbol();
    await sleep(10).then(async () => {
      await getCommunityIndexes();
      await sleep(10).then(async () => {
        await getOwnIndexes();
        await sleep(10).then(async () => {
          await getInvestedIndexes();
          setShowLoading(false);
        });
      });
    });
  }, []);

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

  const getCommunityIndexes = async () => {
    const response = await fetch('/api/all-indexes-list?' + new URLSearchParams({
      data: JSON.stringify({
        userToken: (userToken || window.localStorage.getItem('authorization')),
        userName: (window.localStorage.getItem('userName')),
        includeSelf: false
      })
    }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {

      let tempSymbolsNameArr = [];
      responseData.data.result.map(successfulUser => {
        // tempSymbolsNameArr.push([, , successfulUser.creatorName, successfulUser.indexName, successfulUser.weeklyGain.toFixed(5), successfulUser.investingCount]);
        tempSymbolsNameArr.push([successfulUser.creatorName, successfulUser.indexName, successfulUser.weeklyGain.toFixed(5), successfulUser.investingCount]);
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
          investingUsersCount = indexObject.investingUsers;
        } else {
          if (indexObject.canBePublic) {
            investingUsersCount = "You can share your index with the community :)";
          } else {
            investingUsersCount = "You can't share your index with the community :(";
          }
        }
        tempSymbolsNameArr.push([, , indexObject.indexName, responseData.data.weeklyGains[indexNumber].toFixed(5), indexObject.investedAmount, investingUsersCount]);
      });
      setOwnIndexesData(tempSymbolsNameArr);
    } else {
      toast(responseData.data);
    }
  };

  const getInvestedIndexes = async () => {
    const response = await fetch('/api/all-invested-indexes-list?' + new URLSearchParams({ data: (userToken || window.localStorage.getItem('authorization')) }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success) {
      let tempSymbolsNameArr = [];
      responseData.data.result.map((indexObject, indexNumber) => {
        let investingUsersCount = 0;
        if (!indexObject.isPrivate) {
          //public index
          investingUsersCount = indexObject.investingUsers;
        } else {
          if (indexObject.canBePublic) {
            investingUsersCount = "You can share your index with the community :)";
          } else {
            investingUsersCount = "You can't share your index with the community :(";
          }
        }
        tempSymbolsNameArr.push([, , indexObject.creatorName, indexObject.indexName, responseData.data.weeklyGains[indexNumber].toFixed(5), indexObject.investedAmount, investingUsersCount]);
      });
      setInvestedIndexesData(tempSymbolsNameArr);
    } else {
      toast(responseData.data);
    }
  };

  const HandlePaymentRow = (rowData, isOwn) => {
    buyIndexInput.indexName = isOwn ? rowData.rowData[2] : rowData.rowData[3];
    buyIndexInput.isOwn = isOwn;
    setShowBuyDialog(true);
  };

  const buyOrSellIndex = async (countToInvest, isBuy) => {
    let dataToEncode = {};
    let dataToPass = [];
    const curDate = getDate();
    dataToEncode = isBuy ? {
      userToken: (userToken || window.localStorage.getItem('authorization')),
      indexName: buyIndexInput.indexName,
      transactionData: { amount: countToInvest, date: curDate },
      isOwnIndex: buyIndexInput.isOwn
    } : {
      userToken: (userToken || window.localStorage.getItem('authorization')),
      indexName: sellIndexInput.indexName,
      transactionData: { amount: -countToInvest, date: curDate },
      isOwnIndex: sellIndexInput.isOwn
    }
    let encodedKey = encodeURIComponent('data');
    let encodedValue = encodeURIComponent(JSON.stringify(dataToEncode));
    dataToPass.push(encodedKey + "=" + encodedValue);
    dataToPass = dataToPass.join("&");
    fetch('/api/buy-or-sell-index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataToPass
    }).then(async (response) => {
      if (!response.ok) {
        toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
      } else {
        toast('The money invested successfully!');
        await getOwnIndexes();
      }
    }).catch((response) => {
      toast(`An error has occured: ${response.status} - ${response.statusText}${(response.status === 500) ? '. Please try again later.' : ''}`);
    })
    return Promise.resolve();
  };

  const HandleSellRow = (rowData, isOwn) => {
    sellIndexInput.indexName = isOwn ? rowData.rowData[2] : rowData.rowData[3];
    sellIndexInput.isOwn = isOwn;
    setShowSellDialog(true);
  };

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
              title={"Community Indexes Table"}
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
          <MUIDataTable
            title={"Invested Indexes Table"}
            data={investedIndexesData}
            columns={investedIndexes}
            options={ownIndexesOptions}
          />
          {showBuyDialog && (
            <BuyOrSellModal
              isBuyModal={true}
              setShowBuyDialog={setShowBuyDialog}
              buyIndexInput={buyIndexInput}
              setBuyIndexInput={setBuyIndexInput}
              BuyIndex={buyOrSellIndex}
            />
          )}
          {showSellDialog && (
            <BuyOrSellModal
              isBuyModal={false}
              setShowSellDialog={setShowSellDialog}
              sellIndexInput={sellIndexInput}
              setSellIndexInput={setSellIndexInput}
              SellIndex={buyOrSellIndex}
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