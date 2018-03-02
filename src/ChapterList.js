import React, { Component } from 'react';

class ChapterList extends Component{
  constructor(props){
    super(props)
    this.state = {
      lastChapter:""
    }
    this.chapterChoice=this.chapterChoice.bind(this)
  }

  componentWillReceiveProps(props){
    var base = this
    fetch('https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+props.series, {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const latestChapter = json.chapters[json.chapters.length-1].chapterId
        base.setState({
          lastChapter:latestChapter
        })
      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })
  }

  chapterChoice(event){
    const chapter = event.target.value
    this.props.callbackParent(chapter)
  }

  render(){
    if (this.state.lastChapter){
      return (
        <select onChange={this.chapterChoice}>
          {Array.from({length: this.state.lastChapter}, (v, k) => k+1).map(number => <option value ={parseInt(number)}>{number}</option>)}
        </select>
      )
    }
    return(
      <select></select>
    )
  }

}

export default ChapterList