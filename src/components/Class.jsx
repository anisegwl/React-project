import React, { Component } from 'react'

export default class Class extends Component {

    // components initialization 

    constructor(props) {
        super(props);
        this.state = { count: 0 };

    }
    // Mounting phase
    componentDidMount() {
        console.log("component did mount : component has mounted");

    }

    // Updating Phase

    componentDidUpdate() {
        console.log("Component did update: component update ");
    }


    // UnMount Phase

    componentWillUnmount() {
        console.log("Component did unmount : component unmounted");
    }
    render() {
        return (
            <div>
                <p>count : {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click Me</button>
            </div>

        )
    }
}
