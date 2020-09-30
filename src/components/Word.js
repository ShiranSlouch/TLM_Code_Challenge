import React from 'react'; 


const Word = (props) => (

  <div className="word">
    <p className="word__text">{props.count}.{props.wordText}</p>
    <button 
      className="button"  
      onClick={(e) => {
        props.onWordClick(props.wordText)
      }}
      >
        Click for Ninja Name
    </button>
    <button
      className="button button--link"
      onClick={(e) => {
        props.handleDeleteWord(props.wordText);
      }}
    >
      remove
    </button>
  </div>
);

export default Word;
