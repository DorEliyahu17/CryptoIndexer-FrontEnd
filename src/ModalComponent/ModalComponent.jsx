import React, {useEffect, useState} from "react";
//import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
//import styles from "./ModalComponent.css";


const Modal = styled.div`
  max-width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 200px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;
export const ModalContent = styled.div`
  overflow: auto;
  min-height: 200px;
  padding: 0px 40px;
  padding-bottom: 80px;
`;
export const ModalFooter = styled.div`
  box-shadow: 0px -2px 10px 0px grey;
  height: 60px;
  display: flex;
  justify-content: center;
`;
export const ConfirmButton = styled.div`
  margin: 10px;
  color: white;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: blue;
`;
const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;
const ModalBanner = styled.div`
  margin-bottom: 20px;
  background-color: blue;
  color: white;
  padding: 10px;
`;
const Input = styled.input`
  text-align: right;
  width: 200px;
  margin-left: 15px;
`;


function BuyModalContainer({ setShowBuyDialog, buyIndexInput, setBuyIndexInput, BuyIndex}) {
    const [countToBuyModal, setcountToBuyModal]  = useState(0);
    const initIndexName = "";
    const initCountToBuy = 0;

    function close() {
        setShowBuyDialog(false);
    }

    function submit() {
        BuyIndex(countToBuyModal).then((res) => {
            setBuyIndexInput({
                initIndexName,initCountToBuy
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
        <ModalShadow onClick={close} />
        <Modal>
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

  function SellModalContainer({ setShowSellDialog, sellIndexInput, setSellIndexInput, SellIndex }) {
    const [countToSellModal, setcountToSellModal]  = useState(0);
    const initIndexName = "";
    const initCountToSell = 0;
    function close() {
        setShowSellDialog(false);
    }
    function submit() {
        SellIndex(countToSellModal).then((res) => {
            setSellIndexInput({
                initIndexName,initCountToSell
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
        <ModalShadow onClick={close} />
        <Modal>
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

export {BuyModalContainer, SellModalContainer};
