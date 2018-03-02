import React, { Component } from 'react';

class MangaList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series:"",
      list:""
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
  seriesChange(event) {
    const newState = event.target.value
    this.setState({ series: newState }); // we update our state
    this.props.callbackParent(newState); // we notify our parent
  }


  render(){
    if (this.state.list){
      return (
        <select onChange={this.seriesChange}>
          {this.state.list.map(array => <option value ={array[0]}>{array[1]}</option>)}
        </select>
      )
    }
    return (
      <div>
        Loading ...
      </div>
    )
  }
}

export default MangaList;
