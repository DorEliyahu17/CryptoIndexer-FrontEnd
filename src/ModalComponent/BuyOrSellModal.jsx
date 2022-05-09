import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import BuyModalContainer from "./BuyModalContainer";
import SellModalContainer from "./SellModalContainer";
//import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReactDOM from 'react-dom';

import './BuyModalContainer.less'

const propTypes = {
  isBuyModal: PropTypes.bool.isRequired,
  setShowBuyDialog: PropTypes.func,
  buyIndexInput: PropTypes.object,
  setBuyIndexInput: PropTypes.func,
  BuyIndex: PropTypes.func,
  setShowSellDialog: PropTypes.func,
  sellIndexInput: PropTypes.object,
  setSellIndexInput: PropTypes.func,
  SellIndex: PropTypes.func,
};

const defaultProps = {
  isBuyModal: true,
};

function BuyOrSellModal(props) {
  const { isBuyModal, setShowBuyDialog, buyIndexInput, setBuyIndexInput, BuyIndex, setShowSellDialog, sellIndexInput, setSellIndexInput, SellIndex } = props;
  return (
    (isBuyModal) ?
      <BuyModalContainer
        //        {...props}
        setShowBuyDialog={setShowBuyDialog}
        buyIndexInput={buyIndexInput}
        setBuyIndexInput={setBuyIndexInput}
        BuyIndex={BuyIndex}
      />
      :
      <SellModalContainer
        //        {...props}
        setShowSellDialog={setShowSellDialog}
        sellIndexInput={sellIndexInput}
        setSellIndexInput={setSellIndexInput}
        SellIndex={SellIndex}
      />
    //document.getElementById('app-modal'),
  );
}


BuyOrSellModal.defaultProps = defaultProps;
BuyOrSellModal.propTypes = propTypes;
export default BuyOrSellModal;
