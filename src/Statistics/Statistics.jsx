import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Loading from '../Components/Loading';
import Charts from '../Components/Charts';

import 'react-toastify/dist/ReactToastify.css';

function Statistics() {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);
  const [bugsList, setBugsList] = useState([]);
  const [doneBugsCount, setDoneBugsCount] = useState([]);

  useEffect(async () => {
    setShowLoading(true);
    if (window.localStorage.getItem('authorization') === '') {
      navigate("/login");
    }
    if (!window.localStorage.getItem('admin')) {
      navigate("/");
    }
    const response = await fetch('/api/reported-bugs', { method: 'get' });
    const responseData = await response.json();
    if (responseData.success && responseData.data.result.length > 0) {
      setBugsList(responseData.data.result);
      setDoneBugsCount(responseData.data.doneBugsCount);
      setShowLoading(false);
    } else {
      toast('Error fetching bugs list data: ' + responseData.data);
    }
  }, []);

  const renderTable = () => {
    const statisticsOptions = {
      rowsPerPage: [3],
      rowsPerPageOptions: [3, 5, 10, 15],
      selectableRowsHideCheckboxes: true,
    };
    const statisticsColumns = ['Reported Date', 'Status', 'Reporter Name', 'Title', 'Description', 'Change Status'];
    let statisticsData = [];
    bugsList.map((bugObject) => {
      statisticsData.push([
        bugObject.insertDate,
        bugObject.isDone ? 'Done' : 'Pending',
        bugObject.reportedName,
        bugObject.title,
        bugObject.description
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

export default Statistics;