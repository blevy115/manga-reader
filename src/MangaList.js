import React, { Component } from 'react';

class MangaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series:"",
      list:"",
      genre:""
    }
    this.seriesChange = this.seriesChange.bind(this)

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
          list:seriesList
        })
      })
      .catch((ex) => {
        console.log('There was an error', ex);
      })
  }

  componentWillReceiveProps(props){
    if (props.genre!=='all'&& props.genre!==this.state.genre){ //leave for now
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
          list:mangaByGenre
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




  render(){
    if (this.state.list){
      return (
        <select className="shortened" id="mangas" onChange={this.seriesChange}>
        <option selected="selected" disabled="disabled" value="nil">Select a Series</option>
          {this.state.list.map(array => <option value ={array[0]}>{array[1]}</option>)}
        </select>
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
