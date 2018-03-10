import React, { Component } from 'react';

class Search extends Component{
  constructor(props){
    super(props)
    this.state={
      input:"",
      list:""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }


  handleSubmit(event){
    const search =document.getElementById('search').value
    this.setState({input:search})
    var base = this;
    const searchList = []
    let mangaApi="https://doodle-manga-scraper.p.mashape.com/mangareader.net/search?cover=0&info=0&l=100&q="+search
    event.preventDefault()
  fetch(mangaApi, {
    headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
  })
    .then((response) => {
      return response.json()
    })
    .then((json) => {

        json.forEach(function(series){
          searchList.push([series.mangaId,series.name])
        })
        base.setState({
          list:searchList
        },
        base.props.getSearch(searchList)
      )
    })
    .catch((ex) => {
      console.log('There was an error', ex);
    })
    let genlist = document.getElementById('genres');
    let manlist = document.getElementById('mangas');
    genlist.value = "nil";
    manlist.value="nil"
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <label>
      <input id="search" type="text"/>
      <input type="submit" value="Search"/>
      </label>
      </form>
    )
  }

}

export default Search
