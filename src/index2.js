import SimplexNoise from 'simplex-noise'
import {Pane} from 'tweakpane'
const canvas = document.getElementById('exercise_7');
const ctx = canvas.getContext('2d')


const Params = {
    cols: 10, 
    rows: 10,
    width: window.innerWidth,
    height: window.innerHeight,
    radius: 10,
    ampl: 1,
}

canvas.width = Params.width
canvas.height = Params.height


const simplex = new SimplexNoise()


const render = (time) => {

    requestAnimationFrame(render)

    

    const {cols, rows, width, height, radius, ampl} = Params

    ctx.clearRect(0, 0, width, height)

    const cells = rows * cols;
    const cellW = width / rows;
    const cellH = height / cols; 


    [...Array(cells).keys()].forEach(key => {

        const row = key % rows
        const col = Math.floor(key / rows)

        const x = cellW * row + .5 * cellW
        const y = cellH * col + .5 * cellH


        const freq = 0.001
        const n = simplex.noise3D(x*freq,y*freq, time * 0.0004)
        const nn = n*.5 + .5

        const hsl = `hsl(${360 * nn}, 100%, 50%)`
        const rRadius = nn * radius;
 
        ctx.beginPath()
        ctx.arc(x + nn * ampl, y + nn * ampl, rRadius, 0, Math.PI * 2)
        ctx.fillStyle = hsl;
        ctx.fill()

})
}




render()

const pane = new Pane()
pane.addInput(Params, 'rows', {min: 1, max: 100, step:1})
pane.addInput(Params, 'cols', {min: 1, max: 100, step:1})
pane.addInput(Params, 'radius', {min: 2, max: 20, step:1})
pane.addInput(Params, 'ampl', {min: 1, max: 50, step:1})