import React, { Component } from 'react';
import './App.css';
import Chapter from './Chapter.js'
import MangaList from './MangaList.js'
import ChapterList from './ChapterList'


class Manga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChapter:[],
      series:"",
      chapter:""
    }
    this.changeChapter = this.changeChapter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)


  }

  onChildChanged(newState) {
     this.setState({ series: newState, chapter: 1 })
   }


  onNextChapter(){
    this.setState({chapter: parseInt(this.state.chapter) + 1}, function(e){

    var base = this;
    let chapterNumber = parseInt(this.state.chapter)
    let mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+chapterNumber;

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
        window.alert('That chapter is not out yet, choose another')
        console.log('There was an error', ex);
      })

      let list = document.getElementById('chapters');
      list.value = chapterNumber
      })
  }

  onPrevChapter(){
    this.setState({chapter: parseInt(this.state.chapter) - 1}, function(e){

    var base = this;
    let chapterNumber = parseInt(this.state.chapter)
    let mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+chapterNumber;

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
        window.alert('That chapter is not out yet, choose another')
        console.log('There was an error', ex);
      })

      let list = document.getElementById('chapters');
      list.value = chapterNumber
      })
  }


  changeChapter(chapter){
    this.setState({chapter: chapter})
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
        window.alert('That chapter is not out yet, choose another')
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
          <MangaList callbackParent={(newState) => this.onChildChanged(newState) }></MangaList>
        </label>
        <br />
        <label>
        Chapter
        <ChapterList callbackParent={(chapter) => this.changeChapter(chapter)} series={this.state.series}></ChapterList>
        </label>
        <br />
        <input type="submit" value="Load Chapter!" />
      </form>

        <Chapter chapter ={this.state.currentChapter} chapterNumber = {this.state.chapter} chapterLength = {this.state.currentChapter.length} callParentNext={() => this.onNextChapter() } callParentPrev={() => this.onPrevChapter()} ></Chapter>
      </div>
    );
  }
}

export default Manga;
