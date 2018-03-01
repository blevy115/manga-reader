import React, { Component } from 'react';
import Page from './Page.js'

class Chapter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter:"",
      page:0
    }
    this.handleClick= this.handleClick.bind(this)
  }

  componentWillReceiveProps(props){
    if (this.state.chapter !== props.chapter){

    this.setState({
      chapter:props.chapter,
      page:0
    })
  }
  }

  handleClick(){
    this.setState({ page: this.state.page + 1 })
  }
  render(){
    if (this.state.chapter){
      return <div onClick = {this.handleClick}><Page url={this.state.chapter[this.state.page]}></Page></div>
    }
  return (
    <div>
    <Page></Page>
    </div>
  )
  }
}

export default Chapter
