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
    this.nextChapter = this.nextChapter.bind(this)
  }

  componentWillReceiveProps(props){
    if (this.state.chapter !== props.chapter){

    this.setState({
      chapter:props.chapter,
      page:0
    })
  }
  }

  nextChapter(){
    if (this.state.page === this.props.chapterLength - 1){
      this.props.callbackParent()
    }
  }

  handleClick(){
    this.setState({ page: this.state.page + 1 })
    this.nextChapter()
  }
  render(){
    if (this.state.chapter){
      return <Page url={this.state.chapter[this.state.page]} imageClick = {this.handleClick}></Page>
    }
  return (
    <div>
    <Page></Page>
    </div>
  )
  }
}

export default Chapter
