import React from 'react';

export default class AddWord extends React.Component {
  state = {
    error: undefined
  };
  handleAddWord = (e) =>{
    e.preventDefault();
    const word = e.target.elements.word.value.trim();
    const error = this.props.handleAddWord(word);

    this.setState(() => ({ error }));

    if(!error){
      e.target.elements.word.value = '';
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p className="add-word-error">{this.state.error}</p>}
        <form
          className="add-word"
          onSubmit={this.handleAddWord}
        >
          <input className="add-word__input" type="text" name="word"/>
          <button className="button">Add Buzzword</button>
        </form>
      </div>
    )
  }
}