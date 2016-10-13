import React from "react";

export default React.createClass({
  getInitialState: function(){
    return{
      name: ""
    }
  },
  handleNameChange(e){
    this.setState({name: e.target.value})
  },
  handleSubmit(){
    if(this.state.name.length == 0){
      alert("Enter your name");
    }
    else{
      this.props.onChange(this.state.name)
    }
  },
  render: function() {
    return (
      <div style={Styles.box}>
        <div style={Styles.name}>
          {`Enter your name`}
          <div style={{margin: '10px 0'}}>
            <input type='text' onChange={this.handleNameChange} value={this.state.name} style={Styles.inputBox} placeholder={`name`}/>
          </div>
        </div>
        <div style={Styles.bottom}>
          <button onClick={this.handleSubmit} >
            Next
          </button>
        </div>
        <div style={{clear: 'both'}}/>
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
  name: {
    padding: 10
  },
  inputBox: {
    padding: 5,
    borderRadius: 3,
    outline: 'none',
    border: 'none',
    background: '#fff'
  },
  bottom: {
    float: 'right',
    padding: '0 10px'
  }
}
