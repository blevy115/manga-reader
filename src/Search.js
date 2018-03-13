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
    let searchList = []
    let mangaApi="https://doodle-manga-scraper.p.mashape.com/mangareader.net/search?cover=0&info=0&l=10000&q="+search
    event.preventDefault()
  fetch(mangaApi, {
    headers:{'X-Mashape-Key':process.env.REACT_APP_SECRET_CODE}
  })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        if (json.length>0){
        json.forEach(function(series){
          searchList.push([series.mangaId,series.name])
        })
      } else {
        window.alert('No search results found!  Try another search.')
        searchList="all"
      }
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
