import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div style={Styles.header}>
        <div style={Styles.test}>
          Finomena - Test
        </div>
      </div>
    );
  },
});

var Styles = {
  header: {
    background: '#00bcd4',
    height: 50
  },
  test: {
    fontSize: 20,
    padding: '10px 20px',
    color: '#fff',
    fontWeight: 600
  }
}
