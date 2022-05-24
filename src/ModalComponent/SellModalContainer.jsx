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
    SellIndex(countToSellModal).then((res) => {
      setSellIndexInput({
        initIndexName, initCountToSell
      });
    });
    close();
  }
  const content = new Array(1).fill(
    <p>
      How many do you want to sell from {sellIndexInput.indexName} ?
    </p>,
  );

  return (
    <div>
      <ModalShadow style={{ zIndex: 100 }} onClick={close} />
      <Modal style={{ zIndex: 150 }}>
        <ModalBanner>Edit countToSell</ModalBanner>
        <ModalContent>
          {content}
          <label>
            countToSell
            <input
              value={countToSellModal}
              type="number"
              onChange={(e) => setcountToSellModal(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalFooter>
          <ConfirmButton onClick={submit}> Submit </ConfirmButton>
        </ModalFooter>
      </Modal>
    </div>
    //document.getElementById('app-modal'),
  );
}

SellModalContainer.defaultProps = defaultProps;
SellModalContainer.propTypes = propTypes;
export default SellModalContainer;