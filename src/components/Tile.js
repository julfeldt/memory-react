import React, { Component } from 'react';
import './Tile.css';

class Tile extends Component {

  showTile(e,tileId) {
    e.preventDefault();
    this.props.showTile(tileId);
  }

  render() {
    let {tile} = this.props;
    let selected = tile.selected || tile.match ? " flipped" : "";
    let imgUrl = tile.selected ? tile.src : tile.src;
    let match = tile.match ? " match" : "";
    const componentClasses = ['container'];
    componentClasses.push(match);
    const backTileImageSrc = `images/back/${this.props.backTileId}.jpg`;

    return (
      <li>
        <section className={componentClasses.join("")} onTouchEnd={(e) => this.showTile(e,tile.id)} onClick={(e) => this.showTile(e,tile.id)}>
          <div className={"card" + selected}>
            <figure className="front">
              <img src={backTileImageSrc} role="presentation"/>
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
