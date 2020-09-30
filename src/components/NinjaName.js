import React from 'react';
import Action from './Action';
import AddWord from './AddWord';
import Header from './Header';
import Words from './Words';
import WordModal from './WordModel';
const Filter = require('bad-words-plus')
const filter = new Filter();
const arr = require("an-array-of-english-words").filter(c => c.length > 12)

// 
filter.removeWords(...arr)

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
  handlePick = (word) => {
    word = word.toLowerCase()
    console.log('test', word)
    let sum = 0;
    let length = 0;
    for (let i = 0; i < word.length; ++i) {
        const cCode = word.charCodeAt(i)
        if (cCode >= 97 || cCode <= 122) {
            sum += cCode
            ++length
        }
    }
    return sum / length
  };
  getNinjaWordForInput = (word) => {
      let score = this.handlePick(word)
      let initialProjection = (score - 97) / (122 - 97)
      let finalProjection = Math.round(initialProjection * arr.length * this.state.words.join("").length / 50)

      if (finalProjection >= arr.length) {
          finalProjection = arr.length - 1
      }

      return arr[finalProjection]
  }
  toName = () => {
    return this.state.words.map(c => this.getNinjaWordForInput(c)).join(" ")
  }
  toObjectName = (wordText) => {
    if(!wordText){
      return 
    }
    const name = this.getNinjaWordForInput(wordText);
    console.log('NAME:', name)
    
  }
  onWordClick = (wordText) => {
    this.toObjectName(wordText)
    const name = this.getNinjaWordForInput(wordText)
    this.handleSetSelectedWord(name)
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
    const subtitle = 'Some Subtitle';

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

const result = new NinjaName([
  "I", "Love", "NodeJS"
]).toObjectName()

console.log(result);