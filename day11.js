const fs = require('fs');

const lines = fs.readFileSync('./day10.txt').toString().split('\n');

const parseToGrid = (lines) => {
    const grid = [...lines];
    // const x = lines.length;
    // const y = lines[0].length
    // for(let i = 0; i < y; i++) {
    //     for(let j = 0; j < x; j++) {

    //     }
    // }

    const neighbors = (x, y) => {
        let center = grid[x][y]
        let up = grid[x - 1]?.[y];
        let upleft = 
        let down = grid[x + 1]?.[y];
        let left = grid[x]?.[y - 1];
        let right = grid[x]?.[y + 1];
    };
    
    const findNines = () => {

    };
    
    const flash = ([x, y]) => {
        if (grid[x][y] === 9) grid[x][y] = 0;
        neighbors(x, y).forEach((x, y) => {
            if (grid[x][y] != 0) {
                grid[x][y] = grid[x][y] + 1;
            }
        });
    };

    const avanceAll = () => {

    };

    return {
        findNines,
        flash,
        avanceAll,
    };
};

const grid = parseToGrid(lines);

let flashes = 0;
const step = (grid) => {
    grid.avanceAll();
    while (grid.findNines().length != 0) {
        grid.findNines().forEach(index => {
            flashes += 1;
            grid.flash(index)
        });
    }
}

const doStep = (grid, n = 100) => {
    if (n === 0) return;
    console.log(grid);
    const nextGrid = step(grid);
    doStep(nextGrid, n--);
};
doStep(grid, 100);

