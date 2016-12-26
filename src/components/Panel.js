import React, { Component } from 'react';
import './Panel.css';

class Panel extends Component {

    constructor() {
      super();
      this.selectCategory = this.selectCategory.bind(this);
    }


    selectCategory(e) {
        const category = e.target.dataset.category;
        this.props.loadCategory(category);
        this.setState({category});
    }

    render() {
        return (
            <ul>
                <li>
                    <button type="button" data-category="transport" onClick={this.selectCategory}>Transport</button>
                </li>
                <li>
                    <button type="button" data-category="family" onClick={this.selectCategory}>Family</button>
                </li>
                <li>
                    <button type="button" data-category="animals" onClick={this.selectCategory}>Animals</button>
                </li>
                <li>
                    <button type="button" data-category="colors" onClick={this.selectCategory}>Colors</button>
                </li>
            </ul>
        );
    }
}

export default Panel;
