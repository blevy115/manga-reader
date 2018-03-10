import React, { Component } from 'react';

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
    }, function(e){
      this.props.callbackParent(this.state.chosenGenre)
    })
  }

  render(){
    if (this.state.genres){
      return (
        <select className="shortened" id='genres'onChange={this.genreSelect}>
        <option selected="selected" disabled="disabled" value="nil">Select a Genre</option>
        <option value="all">all</option>
        {this.state.genres.map(array => <option value ={array}>{array}</option>)}
        </select>
      )
    }
    return (
      <div id='genres'>
        Getting Genres ...
      </div>
    )
  }
}

export default GenresList
