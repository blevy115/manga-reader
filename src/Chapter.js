import React, { Component } from 'react';
import Page from './Page.js'

class Chapter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter:"",
      page:"",
      chapterNumber:"",
      fromPrev:false
    }
    this.handleClick= this.handleClick.bind(this)
    this.nextChapter = this.nextChapter.bind(this)
    this.keyPresses=this.keyPresses.bind(this)
  }

  componentWillReceiveProps(props){
    // console.log(this.state.fromPrev);
    if (this.state.fromPrev===true && this.state.chapter !== props.chapter){
      this.setState({
        chapter:props.chapter,
        page:props.chapterLength - 1,
        chapterNumber:props.chapterNumber
      },
    this.setState({
      fromPrev:false
    }))
    }else if  (this.state.fromPrev===false && this.state.chapter !== props.chapter){
    this.setState({
      chapter:props.chapter,
      page:0,
      chapterNumber:props.chapterNumber
    })
  }  else if (this.state.page!== props.page){
    this.setState({
      page:props.page-1
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
      this.props.callParentPrev()
      // this.setState({fromPrev:false})
    }
  }

  keyPresses(event){
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

  handleClick(){
    this.setState({ page: this.state.page + 1}, function(){
      this.nextChapter()
      this.props.getPagefromChild(this.state.page+1)
      this.setState({fromPrev:false});
    })
  }
  render(){
    if (this.state.chapter){
      return <Page url={this.state.chapter[this.state.page]} imageClick = {this.handleClick} keys={this.keyPresses}></Page>
    }
  return (
    <div>
    <Page></Page>
    </div>
  )
  }
}

export default Chapter
