import React, { Component } from 'react';
import Page from './Page.js'

class Chapter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter:"",
      page:"",
      chapterNumber:"",
      fromPrev:false,
      disable:"",
      majorDimension:""
    }
    this.handleClick= this.handleClick.bind(this)
    this.nextChapter = this.nextChapter.bind(this)
    this.keyPresses=this.keyPresses.bind(this)
    this.majorDimension=this.majorDimension.bind(this)
    this.buttonClick=this.buttonClick.bind(this)
  }

  componentWillReceiveProps(props){
    // console.log(this.state.fromPrev);
    if (this.state.fromPrev===true && this.state.chapter !== props.chapter){
      this.setState({
        chapter:props.chapter,
        page:props.chapterLength - 1,
        chapterNumber:props.chapterNumber,
        disable:props.disable
      },
    this.setState({
      fromPrev:false
    }))
    }else if  (this.state.fromPrev===false && this.state.chapter !== props.chapter){
    this.setState({
      chapter:props.chapter,
      page:0,
      chapterNumber:props.chapterNumber,
      disable:props.disable
    })
  }  else if (this.state.page!== props.page){
    this.setState({
      page:props.page-1,
      disable:props.disable
    })
  }

  }

  nextChapter(){
    // console.log('n1');
    // console.log(parseInt(this.state.page));
    // console.log(parseInt(this.props.chapterLength));
    if (parseInt(this.state.page) === parseInt(this.props.chapterLength)){
      // console.log('n2');
      this.props.callParentNext()
    }
  }

  prevChapter(){
    if (this.state.page<0){
      this.setState({fromPrev:true})
      this.props.callParentPrev(true)
      // this.setState({fromPrev:false})
    }
  }

  keyPresses(event){
    if (this.state.disable===false){
    if(event.keyCode===39){
      this.setState({fromPrev:false})
      this.handleClick()
    } else if (event.keyCode===37) {
      this.setState({ page: this.state.page - 1 }, function(e){
        this.prevChapter()
        this.props.getPagefromChild(this.state.page+1)
      })
    }
  }
  }

  buttonClick = (e) => {
    let choice = e.target.value
    if (choice==="Prev Chapter"){
      this.props.callParentPrev(false)
    } else if (choice==="Next Chapter") {
      this.props.callParentNext()
    } else if (choice ==="Last Chapter"){
      let chapters = document.getElementById('chapters')
      this.props.chooseChapter(chapters.options[chapters.options.length-1].value)
    }
    e.preventDefault()
  }


  handleClick(){
    if (this.state.disable===false){

    this.setState({ page: this.state.page + 1}, function(){
      this.nextChapter()
      this.props.getPagefromChild(this.state.page+1)
      this.setState({fromPrev:false});
    })
  }
  }

  majorDimension(){
    let picture = document.getElementById('theImage')
    let height = picture.height;
    let width = picture.width;
    if (width>height){
      this.setState({majorDimension:'width'})
    } else if (height>width){
      this.setState({majorDimension:'height'})
    }
  }
  render(){
    if (this.props.chapterNumber){
      return(
        <div>
        <input type="submit" value="Load Chapter" />
        <input type="submit" value="Prev Chapter" onClick={this.buttonClick}/>
        <input type="submit" value="Next Chapter" onClick={this.buttonClick}/>
        <input type="submit" value="Last Chapter" onClick={this.buttonClick}/>
        <Page majorDimension = {()=> this.majorDimension()} dimension = {this.state.majorDimension} url={this.state.chapter[this.state.page]} imageClick = {this.handleClick} keys={this.keyPresses}></Page>
        </div>
    )}
  return (
    <div>
    <Page></Page>
    </div>
  )
  }
}

export default Chapter
