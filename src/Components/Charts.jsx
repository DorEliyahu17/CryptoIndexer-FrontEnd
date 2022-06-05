import * as React from 'react';
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

const propTypes = {
  type: PropTypes.string,
  firstIndexName: PropTypes.string,
  firstIndexPrices: PropTypes.array,
  otherSymbols: PropTypes.array,
  labels: PropTypes.array,
  isMultiAxios: PropTypes.bool,
};

const defaultProps = {
  type: 'line',
  firstIndexName: 'Not Passed',
  firstIndexPrices: [],
  otherSymbols: [],
  labels: [],
  isMultiAxios: false,
};

function Charts(props) {
  const { type, firstIndexName, firstIndexPrices, otherSymbols, labels, isMultiAxios } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let scales = {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
  };

  let datasets = [
    {
      label: firstIndexName,
      data: firstIndexPrices,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ];

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: scales,
  };

  const data = {
    labels,
    datasets: datasets,
  };

  const renderChartByType = () => {
    if (isMultiAxios) {
      otherSymbols.map((symbolObject, index) => {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        datasets.push({
          label: symbolObject.symbol,
          data: symbolObject.balance_progress,
          borderColor: `rgb(${red}, ${green}, ${blue})`,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        });
      });
    }

    switch (type) {
      case 'line':
        return <Line
          options={options}
          data={data}
        />
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {renderChartByType()}
    </div>
  );
};

Charts.defaultProps = defaultProps;
Charts.propTypes = propTypes;
export default Charts;