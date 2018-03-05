import React, { Component } from 'react';

class PageList extends Component{
  constructor(props){
    super(props)
    this.state = {
      page:"",
      chapterLength:""
    }
    this.pageChoice=this.pageChoice.bind(this)
  }

  componentWillReceiveProps(props){
    this.setState({
      page:props.page,
      chapterLength:props.chapterLength
    })
  }

  pageChoice(event){
    const page = event.target.value
    this.props.sendPage(page)
  }

  render(){
    if (this.props.page){
      return(
        <select id="pages" onChange={this.pageChoice} >
        {Array.from({length: this.state.chapterLength}, (v, k) => k+1).map(number => <option value ={parseInt(number)}>{number}</option>)}
        </select>
      )
    }
    return(
      <select id="pages"></select>
    )
  }

}
export default PageList
