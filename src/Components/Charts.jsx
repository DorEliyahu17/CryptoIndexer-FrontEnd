import * as React from 'react';
import PropTypes from 'prop-types';
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  otherSymbolsColors: PropTypes.object,
  doughnutDataToShow: PropTypes.array,
  doughnutColors: PropTypes.array,
};

const defaultProps = {
  type: 'line',
  firstIndexName: 'Not Passed',
  firstIndexPrices: [],
  otherSymbols: [],
  labels: [],
  isMultiAxios: false,
  otherSymbolsColors: {},
  doughnutDataToShow: [],
  doughnutColors: []
};

function Charts(props) {
  const { type, firstIndexName, firstIndexPrices, otherSymbols, labels, isMultiAxios, otherSymbolsColors, doughnutDataToShow, doughnutColors } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
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

  const lineOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: scales,
  };

  const lineData = {
    labels,
    datasets: datasets,
  };

  const doughnutOptions = {
    legend: {
      display: true,
      position: "bottom"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  const doughnutData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: labels,
    datasets: [
      {
        data: doughnutDataToShow,
        backgroundColor: doughnutColors,
        hoverBackgroundColor: doughnutColors
      }
    ]
  };

  const renderChartByType = () => {
    if (isMultiAxios) {
      otherSymbols.map((symbolObject, index) => {
        datasets.push({
          label: symbolObject.symbol,
          data: symbolObject.balance_progress,
          borderColor: `rgb(${otherSymbolsColors[symbolObject.symbol]['red']}, ${otherSymbolsColors[symbolObject.symbol]['green']}, ${otherSymbolsColors[symbolObject.symbol]['blue']})`,
          backgroundColor: `rgb(${otherSymbolsColors[symbolObject.symbol]['red']}, ${otherSymbolsColors[symbolObject.symbol]['green']}, ${otherSymbolsColors[symbolObject.symbol]['blue']})`,
        });
      });
    }

    switch (type) {
      case 'doughnut':
        return <Doughnut
          options={doughnutOptions}
          data={doughnutData}
        />
      case 'line':
        return <Line
          options={lineOptions}
          data={lineData}
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