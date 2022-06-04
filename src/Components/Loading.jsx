import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from "react-loading";

/*
  loadingTypes:
    balls
    bars
    bubbles
    cubes
    cylon
    spin
    spinningBubbles
    spokes
*/

const propTypes = {
  label: PropTypes.string,
};

const defaultProps = {
  label: 'Loading...',
};

function Loading(props) {
  const { label } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ color: '#1976d2' }}><b>{label}</b></span>
        <ReactLoading type="bars" color="#1976d2" />
      </div>
    </div>
  );
};

Loading.defaultProps = defaultProps;
Loading.propTypes = propTypes;
export default Loading;