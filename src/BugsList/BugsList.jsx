import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MUIDataTable from "mui-datatables";
import Loading from '../Components/Loading';
import Charts from '../Components/Charts';
import { Clear, Check } from "@material-ui/icons";

import 'react-toastify/dist/ReactToastify.css';

function BugsList() {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [bugsList, setBugsList] = useState([]);
  const [doneBugsCount, setDoneBugsCount] = useState([]);

  const fetchBugs = async () => {
    setShowLoading(true);
    const response = await fetch('/api/reported-bugs', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success && responseData.data.result.length > 0) {
      setBugsList(responseData.data.result);
      setDoneBugsCount(responseData.data.doneBugsCount);
    } else {
      toast('Error fetching bugs list data: ' + responseData.data);
    }
    setShowLoading(false);
  };

  useEffect(async () => {
    setShowLoading(true);
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    if (!window.localStorage.getItem('admin')) {
      navigate("/");
    }
    await fetchBugs();
  }, []);

  const handleChangeStatus = async (rowData) => {
    let dataToPass = {
      title: rowData.rowData[4],
      description: rowData.rowData[5],
      insertDate: rowData.rowData[1],
      isDone: rowData.rowData[0],
      reporterName: rowData.rowData[3]
    }
    const response = await fetch('/api/update-bug?' + new URLSearchParams({ data: JSON.stringify(dataToPass) }), { method: 'get' });
    const responseData = await response.json();
    if (responseData.success && responseData.data.modifiedCount > 0) {
      await fetchBugs();
    } else {
      toast('Error fetching bugs list data: ' + (!responseData.success ? responseData.data : 'There was an error with the DB, please report it as a bug.'));
    }
  }

  const renderTable = () => {
    const statisticsOptions = {
      rowsPerPage: [3],
      rowsPerPageOptions: [3, 5, 10, 15],
      selectableRowsHideCheckboxes: true,
    };
    const statisticsColumns = [
      {
        name: 'Change Status', options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={async () => { await handleChangeStatus(tableMeta) }}>
                {!value ? <Check color="primary" /> : <Clear color="secondary" />}
              </button>
            );
          }
        }
      },
      'Reported Date',
      'Status',
      'Reporter Name',
      'Title',
      'Description',
    ];
    let statisticsData = [];
    bugsList.map((bugObject) => {
      statisticsData.push([
        bugObject.isDone,
        bugObject.insertDate,
        bugObject.isDone ? 'Done' : 'Pending',
        bugObject.reportedName,
        bugObject.title,
        bugObject.description,
      ]);
    });

    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end', marginTop: '16px' }}>
        <div style={{ width: '15%', height: '15%' }}>
          <Charts type='doughnut' labels={['Done', 'Pending']} doughnutDataToShow={[doneBugsCount, bugsList.length - doneBugsCount]} doughnutColors={['rgb(212, 237, 218)', 'rgb(248, 215, 218)']} />
        </div>
        <div style={{ width: '100%', height: '100%', marginRight: '8px' }}>
          <MUIDataTable
            title={"Bugs List"}
            data={statisticsData}
            columns={statisticsColumns}
            options={statisticsOptions}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {showLoading ?
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Loading />
        </div>
        :
        renderTable()
      }
    </div>
  );
};

export default BugsList;