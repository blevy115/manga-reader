import React, { Component } from 'react';


class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page:"",
      blank:true,
      majorDimension:""
    }
  }

  changeWindow(){
    let pageHeight = document.getElementById('chapters');
    setTimeout(pageHeight.scrollIntoView(), 500)
  }

  componentWillReceiveProps(props){
    this.setState({
      page:props.url
    })
    if (props.dimension){
      this.setState({majorDimension:props.dimension},
      function(e){
        if (this.state.blank===true){
          this.setState({
            blank:false
          }, function(e){
            this.changeWindow()
          })
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.page!==prevState.page){
      this.props.majorDimension
    }
    if (document.getElementById('theImage').src===this.state.page && document.getElementById('chapters').length>0 && document.getElementById('pages').length>0){
      this.changeWindow()
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
