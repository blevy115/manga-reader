import React, { Component } from 'react';


class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page:"",
      majorDimension:""
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      page:props.url
    })
    let pageHeight = document.getElementById('theImage');
    pageHeight.scrollIntoView()
    if (props.dimension){
      this.setState({majorDimension:props.dimension})
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.page!==prevState.page){
      this.props.majorDimension
      let pageHeight = document.getElementById('theImage');
      pageHeight.scrollIntoView()
    }
  }

  componentDidMount(){
    if (this.props.keys){
      window.addEventListener('keyup', this.props.keys)
    }
  }

  render(){
    return(
      <div id="picture">
        <img id="theImage" class={this.state.majorDimension} src={this.state.page} onClick={this.props.imageClick} onLoad={this.props.majorDimension} />
      </div>
    )
  }
}

export default Page
