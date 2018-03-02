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

  render(){
    return(
      <div>
        <img src={this.state.page} onClick={this.props.imageClick}/>
      </div>
    )
  }
}

export default Page
