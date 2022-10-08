import React from 'react'
import { useRef, useState, useEffect } from 'react'
import drawMap from './perlin_noise/generateMap'

const GameCanvas = () => {
  const canvasElem = useRef(null)
  const [map, setMap] = useState([])

  useEffect( ()=> {
    const mapArr = drawMap(canvasElem.current)
    setMap(mapArr)
  },[])

  return (
    <div>
      <canvas ref={canvasElem} className='gameCanvas'></canvas>
    </div>
  )
}

export default GameCanvas
