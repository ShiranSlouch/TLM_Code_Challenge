import React from 'react';
import AddWord from './AddWord';
import Header from './Header';
import Words from './Words';
import WordModal from './WordModel';


export default class NinjaName extends React.Component{
  state = {
    words: [],
    selectedWord: undefined
  };
 
  handleDeleteWords = () => {
    this.setState(() => ({ words: [] }))
  };
  handleClearSelectedWord = () => {
    this.setState(() => ({ selectedWord: undefined }))
  };
  handleSetSelectedWord = (wordText) => {
    this.setState(() => ({ selectedWord: wordText }))

  }
  handleDeleteWord = (wordToRemove) => {
    this.setState((prevState) => ({
      words: prevState.words.filter((word) => wordToRemove !== word )
    }));
  };
 
  onWordClick = (wordText) => {
    fetch("/ninjify?x=" + wordText)
      .then(res => res.json())
      .then(({name}) => {
        this.handleSetSelectedWord(name)
      })
  }
   
  handleAddWord = (word) => {
    if(!word){
      return 'Enter valid value to add buzzword';
    }else if(this.state.words.indexOf(word) > -1){
      return 'That buzzword already exists';
    }
    this.setState((prevState) => ({
      words: prevState.words.concat(word)
    }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('words');
      const words = JSON.parse(json);

      if (words) {
        this.setState(() => ({ words }));
      }
    } catch (e) {
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.words.length !== this.state.words.length) {
      const json = JSON.stringify(this.state.words);
      localStorage.setItem('words', json);
    }
  };

  render(){
    const subtitle = 'TLM Coding Challenge';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container"> 
          <div className="widget">
            <Words
              words={this.state.words}
              handleDeleteWords={this.handleDeleteWords}
              handleDeleteWord={this.handleDeleteWord}
              handlePick={this.handlePick}
              getNinjaWordForInput={this.getNinjaWordForInput}
              toName={this.toName}
              onWordClick={this.onWordClick}
            />
            <AddWord
              handleAddWord={this.handleAddWord}
            />
          </div>
        </div>
      <WordModal
          selectedWord={this.state.selectedWord}
          handleClearSelectedWord={this.handleClearSelectedWord}
      />
    </div>
    ); 
  }
}
