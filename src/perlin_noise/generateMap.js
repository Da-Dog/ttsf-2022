import perlin from "./perlin";
export function drawBorder(xPos, yPos, width, height,color, ctx, thickness = 1)
{
  let temp =color.split(',')
  let newColor =  temp[0] +',' + temp[1] + ',' + (parseInt(temp[2]) - 10) + '%)'
  ctx.fillStyle=newColor;
  ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
}

export function drawMap(cnvs) {
    cnvs.width = cnvs.height = 720;
    let ctx = cnvs.getContext('2d');

    const GRID_SIZE = 2
    const RESOLUTION = 16;
    const COLOR_SCALE = 255;

    let pixel_size = cnvs.width / RESOLUTION;
    let num_pixels = GRID_SIZE / RESOLUTION;

    let mapArr = []
    let rowCount = 0

    for (let y = 0; y < GRID_SIZE; y += num_pixels / GRID_SIZE){
        mapArr[rowCount] = []
        let currentRow = mapArr[rowCount]
        for (let x = 0; x < GRID_SIZE; x += num_pixels / GRID_SIZE){
            let v = parseInt((perlin.get(x, y)/2 + 0.5) * COLOR_SCALE);
            let color = '';
            let type = ''
            if (v < 85) {
                type = 'forest'
                color = 'hsl(75, 55%, 23%)' // forest
            } else if (v < 150) {
                type = 'grass'
                color = 'hsl(75, 50%, 39%)' // grass
            } else {
                type = 'dryGrass'
                color = 'hsl(41, 60%, 60%)' // dry grass
            }
                 
            drawBorder(x / GRID_SIZE * cnvs.width,
                y / GRID_SIZE * cnvs.width,
                pixel_size,
                pixel_size, color, ctx);
        
            ctx.fillStyle = color;
            ctx.fillRect(
                x / GRID_SIZE * cnvs.width,
                y / GRID_SIZE * cnvs.width,
                pixel_size/2,
                pixel_size/2
            );
            currentRow.push({
                x:  x / GRID_SIZE * cnvs.width,
                y:  y / GRID_SIZE * cnvs.width,
                type,
                pixel_size: pixel_size/2,
                onFire: false
            })
            
            
        }
        rowCount ++
    }
    return mapArr
}