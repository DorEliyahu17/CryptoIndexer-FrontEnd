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
};

function BuyModalContainer(props) {
  const { setShowBuyDialog, buyIndexInput, setBuyIndexInput, BuyIndex } = props
  const [countToBuyModal, setcountToBuyModal] = useState(0);
  const initIndexName = "";
  const initCountToBuy = 0;

  function close() {
    setShowBuyDialog(false);
  }

  function submit() {
    BuyIndex(countToBuyModal).then((res) => {
      setBuyIndexInput({
        initIndexName, initCountToBuy
      });
    });
    close();
  }
  const content = new Array(1).fill(
    <p>
      How many do you want to buy from {buyIndexInput.indexName} ?
    </p>,
  );

  return (
    <div>
      <ModalShadow style={{ zIndex: 100 }} onClick={close} />
      <Modal style={{ zIndex: 150 }}>
        <ModalBanner>Edit countToBuy</ModalBanner>
        <ModalContent>
          {content}
          <label>
            countToBuy
            <input
              value={countToBuyModal}
              type="number"
              onChange={(e) => setcountToBuyModal(e.target.value)}
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

BuyModalContainer.defaultProps = defaultProps;
BuyModalContainer.propTypes = propTypes;
export default BuyModalContainer;