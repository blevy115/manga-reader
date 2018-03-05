import React, { Component } from 'react';
import './App.css';
import Chapter from './Chapter.js'
import MangaList from './MangaList.js'
import ChapterList from './ChapterList'
import PageList from './PageList'


class Manga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChapter:[],
      series:"",
      chapter:"",
      page:""
    }
    this.changeChapter = this.changeChapter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  onChildChanged(newState) {
     this.setState({ series: newState, chapter:1, page:""}, function(e){
       let list = document.getElementById('chapters');
       list.value = this.state.chapter
     })
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
        base.setState ({ currentChapter: chapter},function(e){
          base.setState ({
            page:1
          }, function(e){
            let pageNumber = parseInt(this.state.page)
            let list = document.getElementById('pages');
            list.value = pageNumber
          })
        })

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
        base.setState ({ currentChapter: chapter},function(e){
          base.setState ({
            page:this.state.currentChapter.length
          }, function(e){
            let pageNumber = parseInt(this.state.page)
            let list = document.getElementById('pages');
            list.value = pageNumber
          })
        })

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
    this.setState({chapter: chapter}, function(e){
      var base = this;
      let mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+this.state.chapter;
      console.log(mangaApi);
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
          base.setState ({ currentChapter: chapter},function(e){
            base.setState ({
              page:1
            }, function(e){
              let pageNumber = parseInt(this.state.page)
              let list = document.getElementById('pages');
              list.value = pageNumber
            })
          })

        })
        .catch((ex) => {
          window.alert(ex)
          console.log('There was an error', ex);
        })
    })
  }

  changePage(page){
    this.setState({page:page}, function(e){
      // console.log(this.state.page);
      // console.log(page);
      let pageNumber = parseInt(this.state.page)
      let list = document.getElementById('pages');
      list.value = pageNumber
    })
  }

  handleSubmit(event) {

    var base = this;
    let mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+this.state.chapter;
    console.log(mangaApi);
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
        base.setState ({ currentChapter: chapter},function(e){
          base.setState ({
            page:1
          }, function(e){
            let pageNumber = parseInt(this.state.page)
            let list = document.getElementById('pages');
            list.value = pageNumber
          })
        })

      })
      .catch((ex) => {
        window.alert(ex)
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
        <label>
        Page
        <PageList page={this.state.page} chapterLength = {this.state.currentChapter.length} sendPage={(page) => this.changePage(page)}></PageList>
        </label>
        <br />
        <input type="submit" value="Load Chapter!" />
      </form>

        <Chapter chapter ={this.state.currentChapter} chapterNumber = {this.state.chapter} chapterLength = {this.state.currentChapter.length} page = {this.state.page} callParentNext={() => this.onNextChapter() } callParentPrev={() => this.onPrevChapter()} getPagefromChild={(page) => this.changePage(page)} ></Chapter>
      </div>
    );
  }
}

export default Manga;
