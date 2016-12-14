import React, { Component } from 'react';
import './Tile.css';

class Tile extends Component {


  showTile(tileId) {
    this.props.showTile(tileId);
  }

  render() {
    let {tile} = this.props;
    //var selected = tile.selected ? "selected" : "";
    let selected = tile.selected || tile.match ? " flipped" : "";
    //var className = "list-item tile " + selected;
    let imgUrl = tile.selected ? tile.src : tile.src;
    let match = tile.match ? " match" : "";

    /*
    if (tile.match) {
      imgUrl = "";
    } else if (!tile.selected) {
      imgUrl = "tile_1.jpg";
    }
    */
    // use cover
    /*
    return (
      <li className={className} onClick={() => this.showTile(tile.id)}>
        <img src={imgUrl} role="presentation"/>
      </li>
    );
    */
    return (
      <li>
        <section className={"container" + match} onClick={() => this.showTile(tile.id)}>
          <div className={"card" + selected}>
            <figure className="front">
              <img src="tile_1.jpg" role="presentation"/>
            </figure>
            <figure className="back">
              <img src={imgUrl} role="presentation"/>
            </figure>
          </div>
        </section>
      </li>
    );
  }
}

export default Tile;
