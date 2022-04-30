import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Table } from "@mui/material";
import './HomePage.less';
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';
import { ButtonUnstyled } from "@mui/base";

//mu-icons
// import AddBox from '@material-ui/icons/AddBox';
// import ArrowDownward from '@material-ui/icons/ArrowDownward';
// import Check from '@material-ui/icons/Check';
// import ChevronLeft from '@material-ui/icons/ChevronLeft';
// import ChevronRight from '@material-ui/icons/ChevronRight';
// import Clear from '@material-ui/icons/Clear';
 //import DeleteOutline from '@material-ui/icons/DeleteOutline';
// import Edit from '@material-ui/icons/Edit';
// import FilterList from '@material-ui/icons/FilterList';
// import FirstPage from '@material-ui/icons/FirstPage';
// import LastPage from '@material-ui/icons/LastPage';
 import Remove from '@material-ui/icons/Remove';
import { Delete } from "@material-ui/icons";
import { Payment } from "@material-ui/icons";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
// import ViewColumn from '@material-ui/icons/ViewColumn';
// import Refresh from '@material-ui/icons/Refresh';
// import Delete from '@material-ui/icons/Delete';

function HomePage() {
  const [example, setExample] = useState(false);
  const [SymbolsData, setSymbolsData] = useState([]);
  const defaultMaterialTheme = createTheme();

 //  const tableIcons = {
  //   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  //   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  //   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
   //  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  //   DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  //   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  //   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  //   //Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  //   //FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  //   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  //   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  //   PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  //   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  //   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  //   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  //   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    
  // };

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

  const indexData = [
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
  }
  const HandleSellRow = (event, rowData) => {
    console.log(rowData.indexName);
  }


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
        <MaterialTable title="Symbols Table" columns={symbolColumns} data={symbolData} options={{exportButton:true}} />;
      </ThemeProvider>


      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="Best Indexes Table" columns={indexColumns} data={indexData} actions={[
          {
            icon:Payment,
            tooltip:'pay to buy it',
            onClick:(event, rowData) => HandlePaymentRow(event, rowData)
        }
        ]} />;
      </ThemeProvider>

      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable title="My Own Indexes Table" columns={indexColumns} data={indexData} actions={[
          {
            icon: HighlightOffIcon,
            tooltip:'sell this index',
            onClick:(event, rowData) => HandleSellRow(event, rowData)
        }
        ]} />;
      </ThemeProvider>

    </div>
  );
}

export default HomePage; 