import React from "react";
import ReactDOM from "react-dom";
import Header from './header'
import Name from "./name";
import Question from './question'

let Home = React.createClass({
  getInitialState: function(){
    return{
      name: "",
      questionPart: false
    }
  },

  handleName(name){
    this.setState({name: name, questionPart: true})
  },
  render: function() {
    return(
      <div>
        <Header />
        {!this.state.questionPart && <Name onChange={this.handleName}/> }
        {this.state.questionPart && <Question name={this.state.name}/> }
      </div>
    )
  }
});



ReactDOM.render(
  <Home />, document.getElementById("app")
);
