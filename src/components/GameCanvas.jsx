import React from 'react'
import { useRef, useState, useEffect } from 'react'
import drawMap from '../perlin_noise/generateMap'

const IGNITE_RATE = {
  forest: 2,
  grass: 5,
  dryGrass: 10
}

const SPREAD_RATE = {
  forest: 10,
  grass: 5,
  dryGrass: 15
}

const GameCanvas = ({timer, temperature }) => {

  let new_igRate = Object.assign({}, IGNITE_RATE)
  let new_spRate = Object.assign({}, SPREAD_RATE)
  for (let key in IGNITE_RATE) {
    new_igRate[key] *= temperature/75 
  }

  for (let key in SPREAD_RATE) {
    new_spRate[key] *= temperature/75 
  }

  const canvasElem = useRef(null)
  const [gameMap, setMap] = useState([])

  useEffect(()=> {
    const mapArr = drawMap(canvasElem.current)
    setMap(mapArr)
  },[])

  function setOnFire(tile) {
    const ctx = canvasElem.current.getContext('2d')
    ctx.fillStyle = 'rgb(235, 143, 52)';
    ctx.fillRect(
      tile.x,
      tile.y,
      tile.pixel_size,
      tile.pixel_size
  );
  }

  setTimeout(()=> {
    const flatten_arr = gameMap.flat()
    const randomTile = flatten_arr[Math.floor(Math.random() * flatten_arr.length)];

    const chance = Math.round(Math.random() * 100) / 100
    let fireTile
    switch (randomTile.type) {
      case 'grass':
        if (chance <= new_igRate['grass']/100 && !randomTile.onFire) {
          fireTile = randomTile
        }
        break
      case 'dryGrass':
        if (chance <= new_igRate['dryGrass']/100 && !randomTile.onFire) {
          fireTile = randomTile
        }
        break
      case 'forest':
        if (chance <= new_igRate['forest']/100 && !randomTile.onFire) {
          fireTile = randomTile
        }
        break
    }
    if (fireTile != null) {
      fireTile['onFire'] = true
      setOnFire(fireTile)
      // console.log(fireTile, 'is on fire')
    }
    
    function spreadFire(row, col) {
      const neighborTiles = [
        gameMap[row][col + 1],
        gameMap[row][col - 1],
        gameMap[row + 1][col],
        gameMap[row - 1][col],
      ]

      let fireTile;
      for (let tile in neighborTiles) {
        if (tile.onFire) {continue}
        let chance = Math.round(Math.random() * 100) / 100

        if (tile.type === 'grass') {
          if (chance <= new_spRate['grass']/100) {
            fireTile = tile
          }
        }else if (tile.type === 'dryGrass') {
          if (chance <= new_spRate['dryGrass']/100) {
            fireTile = tile
          }
        }else if (tile.type === 'forest') {
          if (chance <= new_spRate['forest']/100) {
            fireTile = tile
          }
        }
        setOnFire(fireTile)
        console.log(fireTile)
      }
    }

    for (let row = 0; row < gameMap.length; row ++) {
      for (let col = 0; col < gameMap[row].length; col++) {
        if (gameMap[row][col].onFire) {
          // console.log(row, tileN)
        }
      }
    }



  },0)


  return (
    <div>
      <canvas ref={canvasElem} className='gameCanvas'></canvas>
    </div>
  )
}

export default GameCanvas
