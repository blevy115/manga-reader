import React, { Component } from 'react';


class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page:""
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      page:props.url
    })
  }

  componentDidMount(){
    if (this.props.keys){
      window.addEventListener('keyup', this.props.keys)
    }
  }


  render(){
    return(
      <div id="picture" >
        <img id="theImage"  src={this.state.page} onClick={this.props.imageClick} />
      </div>
    )
  }
}

export default Page
