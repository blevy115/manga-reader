import React, { Component } from 'react';

class Genres extends Component {
  constructor(props){
    super(props)
    this.state = {
      genre:"",
      list:""
    }
  }

  componentWillReceiveProps(props){
    if (props.genre){ //leave for now
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
  }
  }

  render(){
    if (this.state.list){
      return (
        <ul>
        {this.state.list.map(array => <li><a href="#">{array[1]}</a></li>)}
        </ul>
      )
    }
    return(
      <ul></ul>
    )
  }
}

export default Genres
