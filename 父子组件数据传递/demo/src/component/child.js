import React from 'react';
import ReactDOM from 'react-dom';

export default class ComChild extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {this.props.id}
        <input type="text" onChange={this.props.handleChange} />
      </div>
    )
  }
}