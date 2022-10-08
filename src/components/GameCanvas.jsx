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
      console.log(fireTile, 'is on fire')
    }


    

  },0)
  return (
    <div>
      <canvas ref={canvasElem} className='gameCanvas'></canvas>
    </div>
  )
}

export default GameCanvas
