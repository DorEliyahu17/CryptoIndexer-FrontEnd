import React, { Fragment } from 'react';
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

function Loading() {
  return (
    <Fragment>
      <ReactLoading type="bars" color="#1976d2" />
    </Fragment>
  );
};

export default Loading;