const fs = require('fs');

const lines = fs.readFileSync('./day5.txt').toString().split('\n');

const paths = lines.map(string => {
    // 9,4 -> 3,4
    const [[x1], [y1], [x2], [y2]] = [...string.matchAll(/\d+/g)]
    return [[Number(x1), Number(y1)], [Number(x2), Number(y2)]];
})


const createGrid = () => {
    const grid = []
    for(let i = 0; i <= 9; i++) {
        const row = new Array(10).fill(0);
        grid.push(row)
    }
    return grid;
};

const fillHorizontal = (grid, y, x1, x2) => {
    for(let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        grid[y][i] = grid[y][i] + 1;
    }
};

const fillVertical = (grid, x, y1, y2) => {
    for(let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        grid[i][x] = grid[i][x] + 1;
    }
};

const fillDiagonal = (grid, x1, y1, x2, y2) => {
    const [minX, maxX] = [x1, x2].sort();
    const [minY, maxY] = [y1, y2].sort();
    for(let i = minX; minX < maxX; i++) {
        for(let j = minY; minY < maxY; j++) {
            grid[i][j] = grid[i][j] + 1;
        }
    }

}

const fill = (grid, paths) => {
    if (paths.length === 0) return;

    const [[[x1, y1], [x2, y2]], ...restPaths] = paths;
    if (x1 === x2) {
        fillVertical(grid, x1, y1, y2); 
    } else if (y1 === y2) {
        fillHorizontal(grid, y1, x1, x2);
    } else {
        fillDiagonal(grid, x1, y1, x2, y2);
    }

    return fill(grid, restPaths);
};

const count = (grid, { moreThan}) => {
    return grid.flat().reduce((acc, curr) => {
        if(curr >= moreThan) {
            return acc + 1
        }
        return acc;
    }, 0);
};

const grid = createGrid();
fill(grid, paths);
console.log(count(grid, { moreThan: 2}));
