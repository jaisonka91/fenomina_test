import React from "react";
import $ from "jquery";
import './style.css'

let questions = [
  {
    id: 1,
    ques: 'What is 20 + 22 ?',
    options: {0: 40, 1: 42, 2: 44, 3: 46},
    ansIndex: 1
  },
  {
    id: 2,
    ques: 'What is 1 + 1 ?',
    options: {0: 1, 1: 2, 2: 3, 3: 4},
    ansIndex: 1
  },
  {
    id: 3,
    ques: 'What is 10 + 10 ?',
    options: {0: 10, 1: 20, 2: 30, 3: 40},
    ansIndex: 1
  },
  {
    id: 4,
    ques: 'What is 5 + 5 ?',
    options: {0: 5, 1: 10, 2: 15, 3: 20},
    ansIndex: 1
  },
  {
    id: 5,
    ques: 'What is 100 + 200 ?',
    options: {0: 100, 1: 200, 2: 300, 3: 400},
    ansIndex: 2
  },
];

export default React.createClass({
  getInitialState: function(){
    return{
      questionNo: 0,
      showGraph: false,
      userAns: []
    }
  },

  componentDidMount: function(){
    this.funJQuery()
  },

  funJQuery: function(){
    $(function() {
      $('.ripple').on('click', function (event) {
        event.preventDefault();

        var $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;

        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $ripple.css("height", $(this).height());
        $ripple.css("width", $(this).height());
        $div
          .css({
            top: yPos - ($ripple.height()/2),
            left: xPos - ($ripple.width()/2),
            background: $(this).data("ripple-color")
          })
          .appendTo($(this));

        window.setTimeout(function(){
          $div.remove();
        }, 2000);
      });
    });
  },

  componentWillUpdate: function(){
    this.funJQuery()
  },

  renderQuestions(){
    if(this.state.questionNo < questions.length){
      return(
        <div>
          <h5 style={{margin: '10px 0'}}>{`Question no. ${questions[this.state.questionNo].id}`}</h5>
          <div>
            {questions[this.state.questionNo].ques}
          </div>
          {this.renderOptions()}
        </div>
      )
    }
    else{
      this.setState({showGraph: true})
    }
  },

  handleSubmit(value){
    return()=> {
      setTimeout(()=>{
        this.state.userAns.push(value);
        this.setState({questionNo: this.state.questionNo + 1});
      }, 500)
    }
  },

  renderOptions(){
    return Object.keys(questions[this.state.questionNo].options).map((opt) => {
      return (
        <div key={'key'+opt+questions[this.state.questionNo].id} style={Styles.inputHead} >
          {/*<input type='radio' value={questions[this.state.questionNo].options[opt]} name='ques' onClick={this.handleSubmit(opt)} style={Styles.inputRadio}/>*/}
          <button onClick={this.handleSubmit(opt)} className='button1 ripple'>
            <div style={Styles.buttonBox}>
              {questions[this.state.questionNo].options[opt]}
            </div>
          </button>
        </div>
      )
    })
  },

  renderBox(){
    return (
      <div style={Styles.box}>
        <h4 style={{margin: '10px 0', textAlign: 'center'}}>{`Answer the follow`}</h4>
        {this.renderQuestions()}
      </div>
    )
  },

  renderAns(){
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <h3>{`${this.props.name} your result is: `}</h3>
        </div>
        {this.renderCheckAnswer()}
        <div>
          <div style={{margin: 10}}>
            {`Graph`}
          </div>
          <div className='graphPart'>
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  },

  renderCheckAnswer(){
    let newQues = questions.map((q, i) => {
      q.userAns = this.state.userAns[i]
      return q
    });
    // this.renderGraph(newQues)
    // console.log(newQues);
    return newQues.map((obj) =>{
      if(obj.ansIndex == obj.userAns){
        return (
          <div key={obj.id} style={Styles.ansBox}>
            {`Question No. ${obj.id}`}
            <div>
              {obj.ques}
            </div>
            <div>{`Selected answer is correct`}</div>
            {`Correct ans: ${obj.options[obj.ansIndex]}`}
          </div>
        )
      }
      else{
        return(
          <div key={obj.id} style={Styles.ansBox}>
            {`Question No. ${obj.id}`}
            <div>
              {obj.ques}
            </div>
            <div>
              <div>{`Selected answer is wrong!`}</div>
              {`Selected ans: ${obj.options[obj.userAns]}, Correct ans: ${obj.options[obj.ansIndex]}`}
            </div>
          </div>
        )
      }
    })
  },

  renderGraph(){
    let newQues = questions.map((q, i) => {
      q.userAns = this.state.userAns[i]
      return q
    });
    return newQues.map((obj) =>{
      if(obj.ansIndex == obj.userAns){
        return(
          <div style={{display: 'inline-block', margin: '0 10px'}} key={obj.id} className='graph1'>
            <div style={Styles.true}/>
            {`Q.${obj.id}`}
          </div>
        )
      }
      else{
        return(
          <div style={{display: 'inline-block', margin: '0 10px'}} key={obj.id} className='graph1'>
            <div style={Styles.false}/>
            {`Q.${obj.id}`}
          </div>
        )
      }
    })
  },

  render: function() {
    return (
      <div>
        {!this.state.showGraph && this.renderBox()}
        {this.state.showGraph && this.renderAns()}
      </div>
    );
  },
});

var Styles = {
  box: {
    width: 350,
    background: '#f1f1f1',
    margin: '50px auto',
    padding: 10,
    borderRadius: 3
  },
  bottom: {
    float: 'right'
  },
  inputHead: {
    display: 'inline-block',
    margin: 5,
    cursor: 'pointer',
    textAlign: 'center',
    position: 'relative'
  },
  inputRadio: {
    marginRight: 10
  },
  ansBox: {
    width: '50%',
    padding: 20,
    float: 'left'
  },
  true: {
    height: 100,
    width: 20,
    background: '#3d566e'
  },
  false: {
    height: 1,
    width: 20,
    background: '#3d566e'
  },
  graphBox: {
    background: '#ecf0f1'
  },
  buttonBox: {
    background: '#fff',
    color: '#000',
    zIndex: 1111,
    padding: 5,
    borderRadius: 3,
    position: 'absolute',
    top: 7,
    width: 52,
    left: 50
  }
}
