import React, { Component } from 'react';

class ChapterList extends Component{
  constructor(props){
    super(props)
    this.state = {
      lastChapter:"",
      genres:"",
      info:"",
      disable:""
    }
    this.chapterChoice=this.chapterChoice.bind(this)
    this.genreChoice=this.genreChoice.bind(this)
  }

  componentWillReceiveProps(props){
    if(props.series && props.disable===false){
    var base = this
    fetch('https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+props.series, {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const genres = json.genres
        const info = json.info
        const latestChapter = json.chapters[json.chapters.length-1].chapterId
        base.setState({
          lastChapter:latestChapter,
          genres:genres,
          info:info,
          disable:props.disable
        })
      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })
    } else {
      this.setState({disable:props.disable})
    }
  }

  chapterChoice(event){
    const chapter = event.target.value
    this.props.callbackParent(chapter)
  }

  genreChoice(event){
    const genre = event.genre
    this.props.chooseGenre(genre)
  }


  render(){
    if (this.state.lastChapter && this.state.genres && this.state.disable===false){
      return (
        <span>
        <p>Description: {this.state.info}</p>
        <ul>
        <span>Genres : </span>
        {this.state.genres.map(genre => <li className = 'series-genre' onClick ={() => {this.genreChoice({genre})} } >{genre}</li>)}
        </ul>
        <label>
        Chapters
        <select id="chapters" onChange={this.chapterChoice}>
          {Array.from({length: this.state.lastChapter}, (v, k) => k+1).map(number => <option value ={parseInt(number)}>{number}</option>)}
        </select>
        </label>
        </span>
      )
    }
    return(
      <span>
      <label>
      Chapters
      <select id="chapters"></select>
      </label>
      </span>
    )
  }

}

export default ChapterList
