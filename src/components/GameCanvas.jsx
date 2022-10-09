import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {drawBorder, drawMap} from "../perlin_noise/generateMap";

const IGNITE_RATE = {
    forest: 3, grass: 5, dryGrass: 7, house: 10,
};

const SPREAD_RATE = {
    forest: 4, grass: 2.5, dryGrass: 4.4, house:1,
};

const gameoverSound = new Audio('gameover.mp3')

const GameCanvas = () => {
    // set states and refs
    const canvasElem = useRef(null);
    const [gameMap, setMap] = useState([]);
    const [temperature, setTemp] = useState(75);
    const [timer, setTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [score, setScore] = useState(0);
	const [tracker] = useState({spread:0, burn:0, ignite:0, lightning: 0, percentDestroyed: 0})
    const [message, setMessage] = useState("");

    // set constants
    let new_igRate = Object.assign({}, IGNITE_RATE);

    function drawTile(posX, posY, width, color) {
        const ctx = canvasElem.current.getContext("2d");
        drawBorder(posX, posY, width, width, color, ctx);
        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, width, width);
    }
    function  randomTile() {
        const flatten_arr = gameMap.flat();
        return flatten_arr[Math.floor(Math.random() * flatten_arr.length)];
    }
    // initialize app
    useEffect(() => {
        const mapArr = drawMap(canvasElem.current);
        setMap(mapArr);
        
    }, []);
    
    
    function genVillage(tile, buildRate) {
        const pixSize = tile.pixel_size
        let neighbors = getNeighbors(tile.y/pixSize, tile.x/pixSize)
        if (buildRate) {
            if (tile['type'] !== 'house') {
                tile['type'] = 'house'
                drawTile(tile.x, tile.y, pixSize, "hsl(38, 32%, 24%)")
                for (let tile of neighbors) {
                    let chance = Math.random() * 100 
                    if (chance < 50) {
                        genVillage(tile, buildRate - 1)
                    } 
                }
                
            }
        }
    }
    useLayoutEffect(()=> {
        // Village generation
        const flatten_arr = gameMap.flat();
        let randomTile = flatten_arr[Math.floor(Math.random() * flatten_arr.length)];
        if (randomTile != null) {  
            genVillage(randomTile, 4)
        }

    }, [gameMap])

	// spread and gameover timer
    useEffect(() => {

        let spreadTimer = setInterval(() => {
            for (let row = 0; row < gameMap.length; row++) {
                for (let col = 0; col < gameMap[row].length; col++) {
                    if (gameMap[row][col].onFire && !gameMap[row][col].isDead) {
                        spreadFire(row, col);
                    }
                }
            }
        }, 1000 / speed);
        let gameOverCounter = setInterval(() => {
            let counter = 0;

            for (let row = 0; row < gameMap.length; row++) {
                for (let col = 0; col < gameMap[row].length; col++) {
                    if (gameMap[row][col].onFire === true) {
                        counter++;
                    } else if (gameMap[row][col].isDead === true) {
                        counter++;
                    }
                }
            }
            let percentDestroyed = Math.round((counter / 1024)* 1000) / 1000
            tracker['percentDestroyed'] = percentDestroyed
            if (percentDestroyed >= 0.85) {
                // clear all intervals if game is over
                const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

                for (let i = 1; i < interval_id; i++) {
                    window.clearInterval(i);
                }
                gameoverSound.play()
                const ctx = canvasElem.current.getContext("2d");
                ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                ctx.fillRect(0, 0, canvasElem.current.width, canvasElem.current.height);
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Game Over", canvasElem.current.width / 2, canvasElem.current.height / 2);
                ctx.font = "20px Arial";
                ctx.fillText("Score: " + score, canvasElem.current.width / 2, canvasElem.current.height / 2 + 30);

                setMessage("");
            }
        }, 1000);
        return function clearTime() {
            clearInterval(spreadTimer);
            clearInterval(gameOverCounter);
            // clear timeout of every tiles
            const flatten_arr = gameMap.flat();
            for (let tile of flatten_arr) {
                if (tile["burnCd"]) {
                    clearInterval(tile['burnCd'])
                }
            }
        };
        
    }, [gameMap, speed]);

	// thunder and ignite timer
    useEffect(() => {
        let time = timer;
        let myTimer = setInterval(() => {
            time = time + 0.1 * speed;
            setTime((Math.round(time * 10) / 10));
            setTemp(temperature < 120 ? Math.floor(time / 10) + 75 : 120);
            runOnTime(randomTile);
        }, 100);
		let thunder = setInterval(() => {
			let chance = Math.random() * 100
			if (chance < 3) {
				let fireTile = randomTile()
                const neighbors = getNeighbors(fireTile["x"] / fireTile["pixel_size"], fireTile["y"] / fireTile["pixel_size"])
                for (let tile of [...neighbors,fireTile]) {
                    if (!tile.onFire && !tile.isDead) {
                        setOnFire(tile);
                        gameMap[tile.y / fireTile["pixel_size"]][tile.x / fireTile["pixel_size"]]["onFire"] = true;
                    }
                }

                tracker['lightning'] = tracker['lightning'] + 1
                display_message("Thunder strikes! Location: " + fireTile["x"] / fireTile["pixel_size"] + ", " + fireTile["y"] / fireTile["pixel_size"]);
				
			}
        }, 1000);
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
            display_message("New item unlocked! Helicopter: extinguish multiple fire at once");
        }
    }, [score]);
    

    function display_message(message) {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 5000);
    }

    function getNeighbors(row, col) {
        return [col < 31 ? gameMap[row][col + 1] : gameMap[row][col], col > 0 ? gameMap[row][col - 1] : gameMap[row][col], row < 31 ? gameMap[row + 1][col] : gameMap[row][col], row > 0 ? gameMap[row - 1][col] : gameMap[row][col],];
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
				tracker['spread'] = tracker['spread'] + 1
            }
        }
		
    }

    function burnTile(tile) {
        if (!tile.isDead) {
			tracker['burn'] = tracker['burn'] + 1
            tile.isDead = true
            drawTile(tile.x, tile.y, tile.pixel_size, 'hsl(44, 0%, 21%)')

            if (tile['burnCd'] != null) {
                clearInterval(tile['burnCd'])
            }

        }
    }

    function setOnFire(tile) {
        drawTile(tile.x, tile.y, tile.pixel_size, "hsl(30, 82%, 56%)")

        tile['burnCd'] = (setTimeout(() => {
            burnTile(tile)
        }, 10000))

    }

    function waterOnFire(event) {
        const pix_size = gameMap[0][0].pixel_size
        let x = parseInt(event.nativeEvent.offsetX / pix_size);
        let y = parseInt(event.nativeEvent.offsetY / pix_size);
        if (score >= 30) {
            extinguishFire(x, y)
            for (let tile of getNeighbors(x, y)) {
                extinguishFire(tile.y / pix_size, tile.x / pix_size);
            }
        } else {
            extinguishFire(x, y);
        }
    }

    function extinguishFire(x, y) {
        let tile = gameMap[y][x];
        if (tile.onFire !== false && tile.isDead === false && tracker['percentDestroyed'] <= 0.949) {
            tile.onFire = false;
            let squareColor;
            if (tile.type === "grass") {
                squareColor = `hsl(75, 50%, 39%)`;
            } else if (tile.type === "forest") {
                squareColor = `hsl(75, 55%, 23%)`;
            }else if (tile.type === 'house') {
                squareColor = "hsl(38, 32%, 24%)"
            }else {
                squareColor = `hsl(41, 60%, 60%)`;
            }
            drawTile(tile.x, tile.y, tile.pixel_size, squareColor)
            setScore(score + 1);

            if (tile['burnCd'] != null) {
                clearInterval(tile['burnCd'])
            }
        }
    }

    function runOnTime(cb){
        const randomTile = cb()

        const chance = (Math.round(Math.random() * 100)) / 100;
        let fireTile;
        if (chance <= new_igRate[randomTile.type] / 100 && !randomTile.onFire && !randomTile.isDead) {
            fireTile = randomTile;
        }

        if (fireTile) {
            fireTile["onFire"] = true;
            setOnFire(fireTile);
            tracker['ignite'] = tracker['ignite'] + 1
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

    return (<div className="container">
        <h1>Save the Land</h1>
        <div className="canvasWrap">
            <canvas
                ref={canvasElem}
                className="gameCanvas"
                onClick={waterOnFire}
            ></canvas>
        </div>
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
		<ul className="data">
            <li key="spread">Spread: {tracker["spread"]}</li>
            <li key="burn">Burn: {tracker["burn"]}</li>
            <li key="ignite">Ignite: {tracker["ignite"]}</li>
            <li key="lightning">Lightning: {tracker["lightning"]}</li>
            <li key="percentDestroyed">PercentDestroyed: {(tracker["percentDestroyed"]*100).toFixed(1)}%</li>
		</ul>
    </div>);
};

export default GameCanvas;
