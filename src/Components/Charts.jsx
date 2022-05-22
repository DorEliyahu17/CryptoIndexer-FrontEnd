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
  secondIndexName: PropTypes.string,
  secondIndexPrices: PropTypes.array,
  labels: PropTypes.array,
  isMultiAxios: PropTypes.bool,
};

const defaultProps = {
  type: 'line',
  firstIndexName: 'Not Passed',
  firstIndexPrices: [],
  secondIndexName: 'Not Passed',
  secondIndexPrices: [],
  labels: [],
  isMultiAxios: false,
};

function Charts(props) {
  const { type, firstIndexName, firstIndexPrices, secondIndexName, secondIndexPrices, labels, isMultiAxios } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const scales = isMultiAxios ?
    {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    }
    :
    {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    };

  const datasets = isMultiAxios ?
    [
      {
        label: firstIndexName,
        data: firstIndexPrices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: secondIndexName,
        data: secondIndexPrices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
    :
    [
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
    debugger
    switch (type) {
      case 'line':
        return <Line
          options={options}
          data={data}
        />
    }
  }

  return (
    <React.Fragment>
      {renderChartByType()}
    </React.Fragment>
  );
};

Charts.defaultProps = defaultProps;
Charts.propTypes = propTypes;
export default Charts;