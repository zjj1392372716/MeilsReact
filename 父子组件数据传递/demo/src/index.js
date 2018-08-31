import React from 'react';
import ReactDOM from 'react-dom';
import ComChild from './component/child.js';

// 父组件
class ComParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 100
        }
    }
    handleChange(event) {
        this.setState({
            number: event.target.value
        })
    }
    render() {
        let data = {};
        data.id = 1;

        return ( 
            <div>
                <p>{this.state.number}</p>
                <ComChild id={data.id} handleChange={this.handleChange.bind(this)} />

            </div> )
    }
}

ReactDOM.render(<ComParent /> , document.getElementById('root'))
