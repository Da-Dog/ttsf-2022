import React, {useEffect, useRef, useState} from "react";
import {drawBorder, drawMap} from "../perlin_noise/generateMap";

const IGNITE_RATE = {
    forest: 2,
    grass: 5,
    dryGrass: 10,
};

const SPREAD_RATE = {
    forest: 4,
    grass: 1,
    dryGrass: 4.4,
};

const GameCanvas = () => {
    // set states and refs
    const canvasElem = useRef(null);
    const [gameMap, setMap] = useState([]);
    const [temperature, setTemp] = useState(75);
    const [timer, setTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    // set constants
    let new_igRate = Object.assign({}, IGNITE_RATE);

    // initialize app
    useEffect(() => {
        const mapArr = drawMap(canvasElem.current);
        setMap(mapArr);
    }, []);

    useEffect(() => {
        if (gameMap.length !== 0) {
            let spreadTimer = setInterval(() => {
                for (let row = 0; row < gameMap.length; row++) {
                    for (let col = 0; col < gameMap[row].length; col++) {
                        if (gameMap[row][col].onFire) {
                            spreadFire(row, col);
                        }
                    }
                }
            }, 700 / speed);
            return function clearTime() {
                clearInterval(spreadTimer);
				// clear timeout of every tiles
				const flatten_arr = gameMap.flat();
				for (let tile of flatten_arr) {
					if (tile["burnCd"]) {
						clearInterval(tile['burnCd'])
					}
				}
            };
        }
    }, [gameMap, speed]);

    useEffect(() => {
        let time = timer;
        let myTimer = setInterval(() => {
            time = time + 0.1 * speed;
            setTime((Math.round(time * 10) / 10));
            setTemp(temperature < 120 ? Math.floor(time / 20) + 75 : 120);
            runOnTime();
        }, 100);
        let thunder = setInterval(() => {
            const flatten_arr = gameMap.flat();
            let fireTile =
                flatten_arr[Math.floor(Math.random() * flatten_arr.length)];

            if (fireTile) {
                fireTile["onFire"] = true;
                setOnFire(fireTile);
                for (let tile of getNeighbors(fireTile["x"] / fireTile["pixel_size"], fireTile["y"] / fireTile["pixel_size"])) {
                    setOnFire(tile);
                    gameMap[tile.y / fireTile["pixel_size"]][tile.x / fireTile["pixel_size"]]["onFire"] = true;
                }
                display_message("Thunder strikes! Location: " + fireTile["x"] / fireTile["pixel_size"] + ", " + fireTile["y"] / fireTile["pixel_size"]);
            }
        }, (Math.round(Math.random() * (30 - 10 + 1)) * 1000));
        return function clearTime() {
            clearInterval(myTimer);
            clearInterval(thunder);
        }
    }, [speed, gameMap]);

    useEffect(() => {
        if (temperature >= 75) {
            for (let key in IGNITE_RATE) {
                new_igRate[key] *= temperature / 75;
            }
        }
    }, [temperature]);

    useEffect(() => {
        if (score === 30) {
            display_message(
                "New item unlocked! Helicopter: extinguish multiple fire at once"
            );
        }
    }, [score]);

    function display_message(message) {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 5000);
    }

    function getNeighbors(row, col) {
        return [
            col < 31 ? gameMap[row][col + 1] : gameMap[row][col],
            col > 0 ? gameMap[row][col - 1] : gameMap[row][col],
            row < 31 ? gameMap[row + 1][col] : gameMap[row][col],
            row > 0 ? gameMap[row - 1][col] : gameMap[row][col],
        ];
    }

	function spreadFire(row, col) {
		const neighbors = getNeighbors(row, col);

        for (let tile of neighbors) {
            if (tile == null || tile.isDead) {
                continue;
            }
            let fireTile;
            let chance = Math.round(Math.random() * 100) / 100;
            if (!tile.onFire) {
                if (chance <= SPREAD_RATE[tile.type] / 100) {
                    fireTile = tile;
                }
            }
            if (fireTile != null) {
                fireTile["onFire"] = true;
                setOnFire(fireTile);
            }
        }
    }

	function burnTile(tile) {
		if (!tile.isDead) {
			tile.isDead = true
			const ctx = canvasElem.current.getContext("2d");
            let color = 'hsl(44, 0%, 21%)';
            drawBorder(
                tile.x,
                tile.y,
                tile.pixel_size,
                tile.pixel_size,
                color, ctx
            );
            ctx.fillStyle = color;
            ctx.fillRect(tile.x, tile.y, tile.pixel_size, tile.pixel_size);

			if (tile['burnCd'] != null) {
				clearInterval(tile['burnCd'])
			}

		}
	}

	function setOnFire(tile) {
		const ctx = canvasElem.current.getContext("2d");
		drawBorder(
			tile.x,
			tile.y,
			tile.pixel_size,
			tile.pixel_size,
			"hsl(30, 82%, 56%)",
			ctx
		);
		ctx.fillStyle = "rgb(235, 143, 52)";
		ctx.fillRect(tile.x, tile.y, tile.pixel_size, tile.pixel_size);
		
		tile['burnCd'] = (setTimeout(()=> {
				burnTile(tile)
			}, 10000))
		
	}

	function waterOnFire(event) {
		const pix_size = gameMap[0][0].pixel_size
		let x = parseInt(event.nativeEvent.offsetX / pix_size );
		let y = parseInt(event.nativeEvent.offsetY / pix_size);
		if (score >= 30) {
			extinguishFire(x,y)
			for (let tile of getNeighbors(x, y)) {
				extinguishFire(tile.y / pix_size, tile.x/pix_size);
			}
		} else {
      		extinguishFire(x, y);
		}
	}

    function extinguishFire(x, y) {
        let tile = gameMap[y][x];
        if (tile.onFire !== false && tile.isDead === false) {
            tile.onFire = false;
            const ctx = canvasElem.current.getContext("2d");
            let color;
            if (tile.type === "grass") {
                color = `hsl(75, 50%, 39%)`;
            } else if (tile.type === "forest") {
                color = `hsl(75, 55%, 23%)`;
            } else {
                color = `hsl(41, 60%, 60%)`;
            }

            drawBorder(
                tile.x,
                tile.y,
                tile.pixel_size,
                tile.pixel_size,
                color,
                ctx
            );
            ctx.fillStyle = color;
            ctx.fillRect(tile.x, tile.y, tile.pixel_size, tile.pixel_size);
            setScore(score + 1);

			if (tile['burnCd'] != null) {
				clearInterval(tile['burnCd'])
			}
        }
    }

    const runOnTime = () => {
        const flatten_arr = gameMap.flat();
        const randomTile =
            flatten_arr[Math.floor(Math.random() * flatten_arr.length)];

        const chance = (Math.round(Math.random() * 50) + 1) / 100;
        let fireTile;
        if (chance <= new_igRate[randomTile.type] / 100 && !randomTile.onFire && !randomTile.isDead) {
            fireTile = randomTile;
        }

        if (fireTile) {
            fireTile["onFire"] = true;
            setOnFire(fireTile);
        }
    };

    const increaseSpeed = (e) => {
        e.target.disabled = speed + 0.5 > 2.5 ? "true" : false;
        document.getElementById("decSpeed").disabled = false;
        let newSpeed = speed + 0.5;
        setSpeed(newSpeed);
    };
    const decreaseSpeed = (e) => {
        e.target.disabled = speed - 0.5 <= 0.5 ? "true" : false;
        document.getElementById("incSpeed").disabled = false;
        let newSpeed = speed - 0.5;
        setSpeed(newSpeed);
    };

    return (
        <div className="container">
            <h1>Save the Land</h1>
            <canvas
                ref={canvasElem}
                className="gameCanvas"
                onClick={waterOnFire}
            ></canvas>
            <div className="msg">
                <h2>{message}</h2>
            </div>
            <div className="info">
                <h2>Time: {timer.toFixed(1)}</h2>
                <h2>Temperature: {temperature}</h2>
                <h2>Speed: {speed}</h2>
                <h2>Score: {score}</h2>
            </div>
            <div className="controls">
                <button onClick={increaseSpeed} id="incSpeed">
                    + Speed
                </button>
                <button onClick={decreaseSpeed} id="decSpeed">
                    - Speed
                </button>
            </div>
        </div>
    );
};

export default GameCanvas;
