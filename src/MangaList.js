import React, { Component } from 'react';

class MangaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series:"",
      list:"",
      genre:"",
      firstOption:""
    }
    this.seriesChange = this.seriesChange.bind(this)
    this.randomSeries = this.randomSeries.bind(this)

  }

  componentDidMount(){
    var base = this
    const seriesList = []
    fetch('https://doodle-manga-scraper.p.mashape.com/mangareader.net', {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        json.forEach(function(series){
          seriesList.push([series.mangaId,series.name])
        })
        base.setState({
          list:seriesList,
          firstOption:"Select a Series"
        })
      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })
  }

  componentWillReceiveProps(props){
    if (props.searchList==="all"){
      this.componentDidMount()
      let search = document.getElementById('search')
      search.value=""
    }
    else if (props.searchList && props.searchList!== this.state.list){
      this.setState({
        list:props.searchList,
        genre:props.genre,
        firstOption:"Select a Series from Search Results"
      })
    }else if (props.genre!=='all'&& props.genre!==this.state.genre){ //leave for now
    this.setState({
      genre:props.genre
    }, function(e){
      var base = this
      const mangaByGenre = []
      fetch('https://doodle-manga-scraper.p.mashape.com/mangareader.net/search/genres/'+this.state.genre, {
        headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
      })
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        json.forEach(function(series){
          mangaByGenre.push([series.mangaId,series.name])
        })
        base.setState({
          list:mangaByGenre,
          firstOption:"Select a Series from '"+base.state.genre+"'"
        })
      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })
    })
    let list = document.getElementById('mangas');
    list.value = "nil"
  } else if (props.genre==="all" && props.genre!==this.state.genre){
    this.setState({
      genre:props.genre
    }, function(e){
      this.componentDidMount()
    })
    let list = document.getElementById('mangas');
    list.value = "nil"
  }

  }

  seriesChange(event) {
    const newState = event.target.value
    this.setState({ series: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent
  }


  randomSeries(event){
    event.preventDefault()
    let list = document.getElementById('mangas')
    var randomNumber = Math.floor(Math.random()*list.length)
    while (randomNumber === 0){
      randomNumber = Math.floor(Math.random()*list.length)
    }
    let random = list[randomNumber].value
    this.setState({ series: random}); // we update our state
    this.props.callbackParent(random);
    list.value = random
  }

  render(){
    if (this.state.list){
      return (
        <span>
        <select className="shortened" id="mangas" onChange={this.seriesChange}>
        <option selected="selected" disabled="disabled" value="nil">{this.state.firstOption}</option>
          {this.state.list.map(array => <option value ={array[0]}>{array[1]}</option>)}
        </select>
        <br/>
        <input type="submit" value="Random" onClick={this.randomSeries} />
        </span>
      )
    }
    return (
      <div id="mangas">
        Loading ...
      </div>
    )
  }
}

export default MangaList;
