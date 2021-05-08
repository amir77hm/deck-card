import React, { Component } from 'react'

export default class card extends Component {

    constructor(props) {
        super(props);

        this.x = Math.floor(Math.random() * 40) - 20
        this.y = Math.floor(Math.random() * 40) - 20
        this.angle = Math.floor(Math.random() * 90) - 45

    }

    render() {
        const styles = {
            transform: `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`
        };

        return <img src={this.props.src} style={styles} />
    }
}



