import React from "react";
import { useRef, useState, useEffect } from "react";
import {drawMap, drawBorder} from "../perlin_noise/generateMap";

const IGNITE_RATE = {
	forest: 2,
	grass: 5,
	dryGrass: 10,
};

const SPREAD_RATE = {
	forest: 2,
	grass: 0.5,
	dryGrass: 2.5,
};

const GameCanvas = ({ timer, temperature }) => {
	let new_igRate = Object.assign({}, IGNITE_RATE);
	let new_spRate = Object.assign({}, SPREAD_RATE);
	for (let key in IGNITE_RATE) {
		new_igRate[key] *= temperature / 75;
	}

	const canvasElem = useRef(null);
	const [gameMap, setMap] = useState([]);


	function setOnFire(tile) {
		const ctx = canvasElem.current.getContext("2d");
    drawBorder(tile.x, tile.y, tile.pixel_size, tile.pixel_size,"hsl(30, 82%, 56%)", ctx )
		ctx.fillStyle = "rgb(235, 143, 52)";
		ctx.fillRect(tile.x, tile.y, tile.pixel_size, tile.pixel_size);
	}

	function waterOnFire(event) {
    let x = parseInt(event.nativeEvent.offsetX/gameMap[0][0].pixel_size);
    let y = parseInt(event.nativeEvent.offsetY/gameMap[0][0].pixel_size);
    let tile = gameMap[x][y];
    tile.onFire = false;
    const ctx = canvasElem.current.getContext("2d");
    if (tile.type == "grass") {
      ctx.fillStyle = `hsl(75, 50%, 39%)`;
    } else if (tile.type == "forest") {
      ctx.fillStyle = `hsl(75, 55%, 23%)`;
    } else {
      ctx.fillStyle = `hsl(41, 60%, 60%)`;
    }
		ctx.fillRect(tile.x, tile.y, tile.pixel_size, tile.pixel_size);

	}

	setTimeout(() => {
		const flatten_arr = gameMap.flat();
		const randomTile =
			flatten_arr[Math.floor(Math.random() * flatten_arr.length)];

		const chance = Math.round(Math.random() * 100) / 100;
		let fireTile;
		switch (randomTile.type) {
			case "grass":
				if (chance <= new_igRate["grass"] / 100 && !randomTile.onFire) {
					fireTile = randomTile;
				}
				break;
			case "dryGrass":
				if (
					chance <= new_igRate["dryGrass"] / 100 &&
					!randomTile.onFire
				) {
					fireTile = randomTile;
				}
				break;
			case "forest":
				if (
					chance <= new_igRate["forest"] / 100 &&
					!randomTile.onFire
				) {
					fireTile = randomTile;
				}
				break;
		}
		if (fireTile != null) {
			fireTile["onFire"] = true;
			setOnFire(fireTile);
			// console.log(fireTile, 'is on fire')
		}

    function getNeighbors(row, col) {
      const neighborTiles = [
				col < 31 ? gameMap[row][col + 1] : gameMap[row][col],
				col > 0 ? gameMap[row][col - 1] : gameMap[row][col],
				row < 31 ? gameMap[row + 1][col] : gameMap[row][col],
				row > 0 ? gameMap[row - 1][col] : gameMap[row][col],
			];
      return neighborTiles
    }

		function spreadFire(row, col) {
			
      const neighbors = getNeighbors(row, col)

			for (let tile of neighbors) {
				if (tile == null) {
					return;
				}
				let fireTile;
				let chance = Math.round(Math.random() * 100) / 100;
				if (tile.type === "grass" && !tile.onFire) {
					if (chance <= new_spRate["grass"] / 100) {
						fireTile = tile;
					}
				} else if (tile.type === "dryGrass" && !tile.onFire) {
					if (chance <= new_spRate["dryGrass"] / 100) {
						fireTile = tile;
					}
				} else if (tile.type === "forest" && !tile.onFire) {
					if (chance <= new_spRate["forest"] / 100) {
						fireTile = tile;
					}
				}
				if (fireTile != null) {
					fireTile["onFire"] = true;
					setOnFire(fireTile);
					// console.log(fireTile, "is on fire");
				}
			}
		}
    for (let row = 0; row < gameMap.length; row++) {
      for (let col = 0; col < gameMap[row].length; col++) {
        if (gameMap[row][col].onFire) {
          spreadFire(row, col)
        }
      }
    }
    // console.log(gameMap)
	}, 0);


  useEffect(() => {
		const mapArr = drawMap(canvasElem.current);
		setMap(mapArr);
    const spreadTimer = setInterval(()=> {
      
    }, 100)
	}, []);



	return (
		<div>
			<canvas
				ref={canvasElem}
				className="gameCanvas"
				onClick={waterOnFire}
			></canvas>
		</div>
	);
};

export default GameCanvas;
