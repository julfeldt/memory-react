import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile';
import Panel from './components/Panel';

let backTileId;
let tileImages = [];
let selectedCategory;

// images used for the tiles group by categories
const allFrontTiles = {
    family: [
        "family/0.jpg",
        "family/1.jpg",
        "family/2.jpg",
        "family/3.jpg",
        "family/4.jpg",
        "family/5.jpg",
        "family/6.jpg",
        "family/7.jpg",
        "family/8.jpg",
        "family/9.jpg",
        "family/10.jpg",
        "family/11.jpg",
        "family/12.jpg",
    ],
    transport: [
        "transport/0.jpg",
        "transport/1.jpg",
        "transport/2.jpg",
        "transport/3.jpg",
        "transport/4.jpg",
        "transport/5.jpg",
        "transport/6.jpg",
        "transport/7.jpg",
        "transport/8.jpg",
        "transport/9.jpg",
        "transport/10.jpg",
        "transport/11.jpg",
    ],
    animals: [
        "animals/0.jpg",
        "animals/1.jpg",
        "animals/2.jpg",
        "animals/3.jpg",
        "animals/4.jpg",
        "animals/5.jpg",
        "animals/6.jpg",
        "animals/7.jpg",
        "animals/8.jpg",
        "animals/9.jpg",
    ],
    colors: [
        "colors/0.jpg",
        "colors/1.jpg",
        "colors/2.jpg",
        "colors/3.jpg",
        "colors/4.jpg",
        "colors/5.jpg",
        "colors/6.jpg",
        "colors/7.jpg",
        "colors/8.jpg",
        "colors/9.jpg",
    ]
};

class App extends Component {

    constructor() {
      super();
      this.state = {};
      this.showTile = this.showTile.bind(this);
      this.loadCategory = this.loadCategory.bind(this);
      this.generateAudioElements();
    }

    componentWillMount() {
        const keys = Object.keys(allFrontTiles);
        var index =  Math.floor((Math.random() * keys.length));
        index = 0;
        this.loadCategory(keys[index]);
    }

    generateAudioElements() {
        Object.keys(allFrontTiles).forEach(category => {
            const div = document.createElement("div");
            div.setAttribute("data-category", category);
            allFrontTiles[category].forEach((entry,index) => {
                const audio = document.createElement("audio");
                audio.setAttribute("data-key", index);
                audio.setAttribute("src", `audio/${category}/${index}.m4a`);
                div.appendChild(audio);
                document.body.appendChild(div);
            });
        })
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
        let tiles = [];
        for (let i = 0; i < tileImages.length * 2; i++) {
            tiles.push({
                id: i,
                selected: false,
                src: `images/front/${tileImages[i % tileImages.length]}`
            });
        }

        function getRandomTileId(max) {
            return Math.floor((Math.random() * max));
        }

        tiles = this.shuffleArray(tiles);

        // randomingly trim exceeding tiles - cleanup needed
        const max = 20;
        if (tiles.length > max) {
            const exclude = [];
            const diff = tiles.length/2 - max/2;
            for (let i = 0 ; i < diff ; i++) {
                while(true) {
                    let id = getRandomTileId(tiles.length/2);
                    if (exclude.findIndex(tId => tId === id)) {
                        const tile = tiles.find(tile => tile.id === id);
                        exclude.push(tile.src);
                        break;
                    }
                }
            }
            tiles = tiles.filter(tile => {
                return exclude.findIndex(src => src === tile.src) === -1;
            });
        }

        this.setState({
            tiles: tiles
        });
    }

    // TODO: move player stuff to own module ?
    playAudio(audioId, category = selectedCategory) {
        const audio = document.querySelector(`div[data-category="${category}"] audio[data-key="${audioId}"]`);
        if (!audio) {
          return;
        }
        audio.currentTime = 0;
        audio.play();
    }

    playTile(tileId) {
        let audioId = tileId % tileImages.length;
        this.playAudio(audioId);
    }

    playMatch() {
        const audioId = Math.floor((Math.random() * document.querySelector("div[data-category='match']").children.length));
        this.playAudio(audioId,"match");
    }

    showTile(tileId) {

        var tile = this.state.tiles.find(tile => tile.id === tileId);
        if (tile.selected || tile.match) {
            return;
        }

        let matching = false;

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
            let matchCount = 0;
            if (tileA.src === tileB.src) {
                tiles.forEach(tile => {
                    if (tile.id === tileA.id || tile.id === tileB.id) {
                        tile.match = true;
                        matchCount++;
                    }
                });
            }

            if (matchCount === 2) {
                this.playMatch();
                matching = true;
            }
        }

        // Do not play over the found match
        if (!matching) {
            this.playTile(tileId);
        }

        this.setState({tiles});
    }

    // load new tiles with the selected category
    loadCategory(category) {
        tileImages = [...allFrontTiles[category]];
        selectedCategory = category;
        backTileId = Object.keys(allFrontTiles).findIndex(c => c === category);
        this.createTiles();
    }

    render() {
        return (
          <div className="App">
            <Panel loadCategory={this.loadCategory}/>
            <ul className="list">
                {this.state.tiles.map(tile => {
                  return <Tile key={tile.id} tile={tile} showTile={this.showTile} backTileId={backTileId} />
                })}
            </ul>
          </div>
        );
    }
}

export default App;
