import React, { Component } from 'react';
import Genres from './Genres'

class GenresList extends Component {
  constructor(props){
    super(props)
    this.state = {
      genres:"",
      chosenGenre:""
    }
    this.genreSelect = this.genreSelect.bind(this)
  }

  componentDidMount(){
    var base = this
    const genresList = []
    fetch('https://doodle-manga-scraper.p.mashape.com/mangareader.net/search/genres', {
      headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      json.forEach(function(genre){
        genresList.push(genre.genreId)
      })
      base.setState({
        genres:genresList
      })
    })
    .catch((ex)=> {
      console.log('There was an error', ex);
    })
  }

  genreSelect(event) {
    this.setState({
      chosenGenre:event.target.value
    })
  }

  render(){
    if (this.state.genres){
      return (
        <div>
        <select className="shortened" onChange={this.genreSelect}>
        <option selected="selected" disabled="disabled">Select a Genre</option>
        {this.state.genres.map(array => <option value ={array}>{array}</option>)}
        </select>
        <Genres genre={this.state.chosenGenre}></Genres>
        </div>
      )
    }
    return (
      <div>
        Getting Genres ...
      </div>
    )
  }
}

export default GenresList
