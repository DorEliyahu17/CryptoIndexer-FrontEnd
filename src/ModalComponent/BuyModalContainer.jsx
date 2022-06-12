import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalContent, ModalFooter, ConfirmButton, ModalShadow, ModalBanner, Input } from './StyledComponents'

const propTypes = {
  setShowBuyDialog: PropTypes.func,
  buyIndexInput: PropTypes.object,
  setBuyIndexInput: PropTypes.func,
  BuyIndex: PropTypes.func,
};

const defaultProps = {
  setShowBuyDialog: () => { },
  buyIndexInput: {},
  setBuyIndexInput: () => { },
  BuyIndex: () => { },
};

function BuyModalContainer(props) {
  const { setShowBuyDialog, buyIndexInput, setBuyIndexInput, BuyIndex } = props
  const [countToBuyModal, setcountToBuyModal] = useState(0);
  const initIndexName = "";
  const initCountToBuy = 0;

  function close() {
    setShowBuyDialog(false);
  }

  const submit = () => {
    BuyIndex(countToBuyModal).then((res) => {
      debugger
      setBuyIndexInput({
        initIndexName, initCountToBuy
      });
    });
    close();
  }
  const content = new Array(1).fill(
    <p>
      How much money ($) do you want to invest in {buyIndexInput.indexName} index?
    </p>,
  );

  return (
    <div>
      <ModalShadow style={{ zIndex: 100 }} onClick={close} />
      <Modal style={{ zIndex: 150 }}>
        <ModalBanner>Amount To Invest in {buyIndexInput.indexName}</ModalBanner>
        <ModalContent>
          {content}
          <label>
            <span style={{ marginRight: '4px' }}>Amount To Invest:</span>
            <input
              value={countToBuyModal}
              type="number"
              onChange={(e) => setcountToBuyModal(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalFooter>
          <ConfirmButton onClick={submit}>Submit</ConfirmButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

BuyModalContainer.defaultProps = defaultProps;
BuyModalContainer.propTypes = propTypes;
export default BuyModalContainer;