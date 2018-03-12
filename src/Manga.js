import React, { Component } from 'react';
import './App.css';
import Chapter from './Chapter.js'
import MangaList from './MangaList.js'
import ChapterList from './ChapterList'
import PageList from './PageList'
import GenresList from './GenresList'
import Search from './Search.js'


class Manga extends Component {
  constructor(props) {
    super(props)
    this.state = {
      docTitle:"Brandon's Manga Speed Reader",
      currentChapter:[],
      series:"",
      chapter:"",
      page:"",
      genre:"",
      name:"",
      pageListDisable:false,
      chapterListDisable:false,
      searchList:"",
      infoToggle:"Hide Info"
    }
    this.changeChapter = this.changeChapter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.infoToggle = this.infoToggle.bind(this)

  }

  onGenreSelected(newState){
    const search =document.getElementById('search')
    search.value=""
    this.setState({genre:newState, series:"", pageListDisable:true, chapterListDisable:true, name:"" , searchList:""})
    let list = document.getElementById('genres')
    list.value = newState
  }

  onChildChanged(newState) {
     this.setState({ series: newState, pageListDisable:true, chapterListDisable:false, name:"", chapter:1}, function(e){
       let list = document.getElementById('chapters');
       list.value = 1
     })
   }


  onNextChapter(){
    this.setState({chapter: parseInt(this.state.chapter) + 1, pageListDisable:false}, function(e){

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
        let name = ""
        if (json.name){
           name = 'Title: '+json.name
        } else {
           name = 'No Title Provided'
        }
        json.pages.forEach(function(page){
          chapter.push(page.url)
        })
        base.setState ({ currentChapter: chapter, name: name},function(e){
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

  onPrevChapter(bool){
    this.setState({chapter: parseInt(this.state.chapter) - 1, pageListDisable:false}, function(e){

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
        let name = ""
        if (json.name){
           name = 'Title: '+json.name
        } else {
           name = 'No Title Provided'
        }
        json.pages.forEach(function(page){
          chapter.push(page.url)
        })
        base.setState ({ currentChapter: chapter, name: name},function(e){
          if (bool===true){
          base.setState ({
            page:this.state.currentChapter.length
          }, function(e){
            let pageNumber = parseInt(this.state.page)
            let list = document.getElementById('pages');
            list.value = pageNumber
          })
        }else{
          base.setState ({
            page:1
          }, function(e){
            let pageNumber = parseInt(this.state.page)
            let list = document.getElementById('pages');
            list.value = pageNumber
          })
        }
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
    this.setState({chapter: chapter, pageListDisable:false}, function(e){
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
          let name = ""
          if (json.name){
             name = 'Title: '+json.name
          } else {
             name = 'No Title Provided'
          }
          json.pages.forEach(function(page){
            chapter.push(page.url)
          })
          base.setState ({ currentChapter: chapter, name:name},function(e){
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
          window.alert('There was an issue loading that Chapter, try another.')
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

  searchResults(list){
    this.setState({genre:"", series:"", pageListDisable:true, chapterListDisable:true, name:"" , searchList:list})
  }

  handleSubmit(event) {
    var base = this;
    let mangaApi =""
    let list = document.getElementById('chapters');
    if (parseInt(list.value) !== 1){
      this.setState({chapter:parseInt(list.value), pageListDisable:false})
       mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+this.state.chapter;
    } else{
      this.setState({chapter:1, pageListDisable:false})
      mangaApi = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net/manga/'+this.state.series+'/'+'1';
    }
    fetch(mangaApi, {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        let chapter = []
        let name = ""
        if (json.name){
           name = 'Title: '+json.name
        } else {
           name = 'No Title Provided'
        }
        json.pages.forEach(function(page){
          chapter.push(page.url)
        })
        base.setState ({ currentChapter: chapter, name: name},function(e){
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
        window.alert('There was an issue loading that Chapter, try another.')
        console.log('There was an error', ex);
      })
    event.preventDefault()
  }

  infoToggle(event){
    event.preventDefault()
    if (this.state.infoToggle==="Show Info"){
      this.setState({infoToggle:"Hide Info"})
    } else if (this.state.infoToggle==="Hide Info"){
      this.setState({infoToggle:"Show Info"})
    }
  }


  render(){
    console.log(process);
    document.title = this.state.docTitle
    return (
      <div className="Manga">
        <header className="Manga-header">
          <h1 className="Manga-title">{this.state.docTitle}</h1>
        </header>
        <Search getSearch={(list)=> this.searchResults(list)}  />
        <form onSubmit={this.handleSubmit}>
        <label>
          Genre List
          <GenresList callbackParent={(newState) => this.onGenreSelected(newState)}></GenresList>
        </label>
        <br />
        <label>
          Manga List
          <MangaList genre={this.state.genre} callbackParent={(newState) => this.onChildChanged(newState) }  searchList={this.state.searchList}></MangaList>
        </label>
        <input type="submit" value ={this.state.infoToggle} onClick={this.infoToggle}/>
        <br />
        <ChapterList disable={this.state.chapterListDisable}  callbackParent={(chapter) => this.changeChapter(chapter)} chooseGenre={(genre) => this.onGenreSelected(genre)} series={this.state.series} infoToggle={this.state.infoToggle} chapter ={this.state.chapter}></ChapterList>
        <span id='title'>{this.state.name}</span>
        <br />
        <label>
        Page
        <PageList disable = {this.state.pageListDisable} page={this.state.page} chapterLength = {this.state.currentChapter.length} sendPage={(page) => this.changePage(page)}></PageList>
        </label>
        <br />
        <input type="submit" value="Load Chapter!" />
        <input type="submit" value="Prev Chapter" onClick={this.onPrevChapter.bind(this)}/>
        <input type="submit" value="Next Chapter" onClick={this.onNextChapter.bind(this)}/>
      </form>
        <Chapter disable = {this.state.pageListDisable} name={this.state.name} chapter ={this.state.currentChapter} chapterNumber = {this.state.chapter} chapterLength = {this.state.currentChapter.length} page = {this.state.page} callParentNext={(chapter) => this.onNextChapter(chapter) } callParentPrev={(chapter) => this.onPrevChapter(chapter)} getPagefromChild={(page) => this.changePage(page)} ></Chapter>
      </div>
    );
  }
}

export default Manga;
