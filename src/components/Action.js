import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="button"
      onClick={props.handlePick}
      disabled={!props.hasWords}
    >
      Click to see Ninja Name
    </button>
  </div>
);

export default Action;
