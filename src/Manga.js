import React, { Component } from 'react';
import './App.css';
import Chapter from './Chapter.js'
import List from './List.js'


class Manga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChapter:[],
      series:"",
      chapter:""
    }
    this.changeChapter = this.changeChapter.bind(this)
    this.changeManga = this.changeManga.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  onChildChanged(newState) {
     this.setState({ series: newState })
   }

  changeManga(event) {
    this.setState({series: event.target.value})
    event.preventDefault()
  }


  changeChapter(event){
    this.setState({chapter: event.target.value})
    event.preventDefault()
  }

  handleSubmit(event) {
    var base = this;
    let mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+this.state.chapter;

    fetch(mangaApi, {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let chapter = []
        json.pages.forEach(function(page){
          chapter.push(page.url)
        })
        base.setState ({ currentChapter: chapter})

      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })

    event.preventDefault()
  }


  render(){
    return (
      <div className="Manga">
        <header className="Manga-header">
          <h1 className="Manga-title">Welcome to BMR </h1>
        </header>

        <form onSubmit={this.handleSubmit}>

        <label>
          Manga List
          <List callbackParent={(newState) => this.onChildChanged(newState) }></List>
        </label>
        <label>
        Chapter
        <input type="text" onChange={this.changeChapter} />
        </label>
        <br />
        <input type="submit" value="Load Chapter!" />
      </form>

        <Chapter chapter ={this.state.currentChapter}></Chapter>
      </div>
    );
  }
}

export default Manga;
