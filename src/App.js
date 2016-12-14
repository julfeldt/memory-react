import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile';

// TODO: change the directory dynamically
const tileImages = [
	"vehicles/1.jpg",
	"vehicles/2.jpg",
	"vehicles/3.jpg",
	"vehicles/4.jpg",
	"vehicles/5.jpg",
	"vehicles/6.jpg",
	"vehicles/7.jpg",
	"vehicles/8.jpg",
]

class App extends Component {

	constructor() {
	  super();
	  this.createTiles();
	  this.showTile = this.showTile.bind(this);
	}

	/**
	 * Randomize array element order in-place.
	 * Using Durstenfeld shuffle algorithm.
	 */
	shuffleArray(array) {
	  for (let i = array.length - 1; i > 0; i--) {
	    const j = Math.floor(Math.random() * (i + 1));
	    const temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	  }
	  return array;
	}

	createTiles() {
		const tiles = [];
		for (let i = 0; i < tileImages.length * 2; i++) {
			tiles.push({
				id: i,
				selected: false,
				src: tileImages[i % tileImages.length]
			});
		}
		this.state = {
			tiles: this.shuffleArray(tiles)
		};
	}

	showTile(tileId) {

		var tile = this.state.tiles.find(tile => tile.id === tileId);
		if (tile.selected || tile.match) {
			return;
		}

		const tiles = [];
		const selectedCount = this.state.tiles.reduce((total,tile) => {
			if (tile.selected) {
				total++;
			}
			return total;
		},0);

		// TODO: cleanup
		if (selectedCount === 2) {
			this.state.tiles.forEach(tile => {
				const selected = tile.id === tileId;
				tile.selected = selected;
				tiles.push(tile);
			});
		} else {
			this.state.tiles.forEach(tile => {
				if (tile.id === tileId) {
					tile.selected = true;
				}
				tiles.push(tile);
			});
		}

		if (selectedCount === 1) {
			const selected = tiles.filter(tile => tile.selected);
			const tileA = selected[0];
			const tileB = selected[1];
			if (tileA.src === tileB.src) {
				tiles.forEach(tile => {
					if (tile.id === tileA.id || tile.id === tileB.id) {
						tile.match = true;
					}
				});
			}
		}

		this.setState({tiles});
	}

  render() {
    return (
      <div className="App">
      	<ul className="list">
	      	{this.state.tiles.map(tile => {
	      	  return <Tile key={tile.id} tile={tile} showTile={this.showTile}/>
	      	})}
      	</ul>
      </div>
    );
  }
}

export default App;
