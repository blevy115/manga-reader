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
    if (props.dimension){
      this.setState({majorDimension:props.dimension})
    }
    if (props.url!==this.state.page){
      let pageHeight = document.getElementById('pages');
      pageHeight.scrollIntoView()
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.page!==prevState.page){
      this.props.majorDimension()
      let pageHeight = document.getElementById('pages');
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
        <img id="theImage" class={this.state.majorDimension} src={this.state.page} alt={this.state.page} onClick={this.props.imageClick} onLoad={this.props.majorDimension} />
      </div>
    )
  }
}

export default Page
