import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalContent, ModalFooter, ConfirmButton, ModalShadow, ModalBanner, Input } from './StyledComponents'

const propTypes = {
  setShowSellDialog: PropTypes.func,
  sellIndexInput: PropTypes.object,
  setSellIndexInput: PropTypes.func,
  SellIndex: PropTypes.func,
};

const defaultProps = {
  setShowSellDialog: () => { },
  sellIndexInput: {},
  setSellIndexInput: () => { },
  SellIndex: () => { },
};

function SellModalContainer(props) {
  const { setShowSellDialog, sellIndexInput, setSellIndexInput, SellIndex } = props;
  const [countToSellModal, setcountToSellModal] = useState(0);
  const initIndexName = "";
  const initCountToSell = 0;
  function close() {
    setShowSellDialog(false);
  }
  function submit() {
    SellIndex(countToSellModal, false).then((res) => {
      setSellIndexInput({
        initIndexName, initCountToSell
      });
    });
    close();
  }
  const content = new Array(1).fill(
    <p>
      How much money ($) do you want to sell in {sellIndexInput.indexName} index?
    </p>,
  );

  return (
    <div>
      <ModalShadow style={{ zIndex: 100 }} onClick={close} />
      <Modal style={{ zIndex: 150 }}>
        <ModalBanner>Amount To sell in {sellIndexInput.indexName}</ModalBanner>
        <ModalContent>
          {content}
          <label>
            <span style={{ marginRight: '4px' }}>Amount To Sell:</span>
            <input
              value={countToSellModal}
              type="number"
              onChange={(e) => setcountToSellModal(e.target.value)}
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

SellModalContainer.defaultProps = defaultProps;
SellModalContainer.propTypes = propTypes;
export default SellModalContainer;