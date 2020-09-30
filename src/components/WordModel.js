import React from 'react';
import Modal from 'react-modal';

const WordModal = (props) => (
  <Modal
    isOpen={!!props.selectedWord}
    onRequestClose={props.handleClearSelectedWord}
    contentLabel="Selected Word"
    closeTimeoutMS={200}
    className="modal"
  >
    <h3 className="modal__title">Selected Buzzword</h3>
    {props.selectedWord && <p className="modal__body">{props.selectedWord}</p>}
    <button className="button" onClick={props.handleClearSelectedWord}>Okay</button>
  </Modal>
);

export default WordModal;
