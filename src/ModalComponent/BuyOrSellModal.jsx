import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import BuyModalContainer from "./BuyModalContainer";
import SellModalContainer from "./SellModalContainer";
//import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReactDOM from 'react-dom';

import './BuyOrSellModal.less'

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
  setShowBuyDialog: () => { },
  buyIndexInput: {},
  setBuyIndexInput: () => { },
  BuyIndex: () => { },
  setShowSellDialog: () => { },
  sellIndexInput: {},
  setSellIndexInput: () => { },
  SellIndex: () => { },
};

function BuyOrSellModal(props) {
  const { isBuyModal, setShowBuyDialog, buyIndexInput, setBuyIndexInput, BuyIndex, setShowSellDialog, sellIndexInput, setSellIndexInput, SellIndex } = props;
  return (
    (isBuyModal) ?
      <BuyModalContainer
        setShowBuyDialog={setShowBuyDialog}
        buyIndexInput={buyIndexInput}
        setBuyIndexInput={setBuyIndexInput}
        BuyIndex={BuyIndex}
      />
      :
      <SellModalContainer
        setShowSellDialog={setShowSellDialog}
        sellIndexInput={sellIndexInput}
        setSellIndexInput={setSellIndexInput}
        SellIndex={SellIndex}
      />
  );
}


BuyOrSellModal.defaultProps = defaultProps;
BuyOrSellModal.propTypes = propTypes;
export default BuyOrSellModal;
