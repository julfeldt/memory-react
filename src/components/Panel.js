import React, { Component } from 'react';
import './Panel.css';

let category;

class Panel extends Component {

    constructor() {
      super();
      this.handleSelectCategory = this.handleSelectCategory.bind(this);
      this.selectCategory = this.selectCategory.bind(this);
    }

    handleSelectCategory(e) {
        e.preventDefault();
        this.selectCategory(e.target.dataset.category);
    }

    selectCategory(cat) {
        category = cat;
        this.props.loadCategory(category);
        this.setState({category});
    }

    isSelected(name) {
        return name === category ? "selected" : "";
    }

    componentDidMount(){
        this.selectCategory("family");
    }

    render() {
        return (
            <ul className="panel">
                <li className={this.isSelected("family")}>
                    <img src="images/panel/family_icon.png" alt="family" data-category="family" onClick={this.handleSelectCategory} onTouchEnd={this.handleSelectCategory}/>
                </li>
                <li className={this.isSelected("transport")}>
                   <img src="images/panel/transport_icon.png" alt="transport" data-category="transport" onClick={this.handleSelectCategory} onTouchEnd={this.handleSelectCategory}/>
                </li>
                <li className={this.isSelected("animals")}>
                    <img src="images/panel/animals_icon.png" alt="animals" data-category="animals" onClick={this.handleSelectCategory} onTouchEnd={this.handleSelectCategory}/>
                </li>
                <li className={this.isSelected("colors")}>
                    <img src="images/panel/colors_icon.png" alt="colors" data-category="colors" onClick={this.handleSelectCategory} onTouchEnd={this.handleSelectCategory}/>
                </li>
                <li className={this.isSelected("numbers")}>
                    <img src="images/panel/numbers_icon.png" alt="numbers" data-category="numbers" onClick={this.handleSelectCategory} onTouchEnd={this.handleSelectCategory}/>
                </li>
            </ul>
        );
    }
}

export default Panel;
