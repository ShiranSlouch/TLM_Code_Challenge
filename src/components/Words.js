import React from 'react';
import Word from './Word';

const Words = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Buzzwords</h3>
      <button 
        className="button button--link" 
        onClick={props.handleDeleteWords}
      >
        Remove All Buzzwords
      </button>
    </div>

    {props.words.length === 0 && <p className="widget__massage">Please add a buzzword to get started!</p>} 
    {
      props.words.map(( word, index ) => (
        <Word 
          key={word}
          wordText={word}
          count={index + 1}
          handleDeleteWord={props.handleDeleteWord}
          handlePick={props.handlePick}
          getNinjaWordForInput={props.getNinjaWordForInput}
          toName={props.toName}
          onWordClick={props.onWordClick}
        />
      ))
    }
  </div>
);

export default Words;