const fs = require('fs');

const lines = fs.readFileSync('./day9.txt').toString().split('\n');


const parseLines = (lines) => {
    // [center, ...adjacentPoints]
    const points = [];
    const x = lines[0].length;
    const y = lines.length;

    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            let center = lines[i][j]
            let up = lines[i - 1]?.[j];
            let down = lines[i + 1]?.[j];
            let left = lines[i]?.[j - 1];
            let right = lines[i]?.[j + 1];
            points.push([[center, i, j], up, down, left, right].filter(Boolean));
        }
    }
    return points
}

const points = parseLines(lines);

const lowPoint = ([[center], ...adjacentPoints]) => {
    return adjacentPoints.every(ap => Number(center) < Number(ap));
};

const lowPoints = points.flatMap((point) => {
    if(lowPoint(point)) return [point];
    return [];
})

const riskLevels = lowPoints.map(([[center], adjacent]) => 1 + Number(center))
console.log(riskLevels.reduce((acc, curr) => acc + curr, 0));




// const loPoints = lowPoints.map(lp => [lp[0][1], lp[0][2]])

// Star 2


const adjacent = (i, j) => {
    const value = values[[i, j]]
    if (value === 9) return new Set();

    const adjIndexes = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
    ];
    const upwardsAdjacent = adjIndexes.filter(([x, y]) => {
        adjacentValue = values[[x, y]];
        return (adjacentValue != 9 && Boolean(adjacentValue)); //&& adjacentValue - value === 1);
    });
    return new Set([...upwardsAdjacent]);
}


// missing JS set operators
const setPop = (set) => {
    const [one, ...values] = set.values();
    return [one, new Set([...values])];
}

const setDifference = (A, B) => {
    return new Set(Array.from(A).filter(x => !B.has(x)));
};

const setUnion = (A, B) => {
    return new Set([...A, ...B]);
};

const objKeysToSet = (obj) => {
    return new Set(Object.keys(obj).map(e => [e]))
}

const unravelBasin = (startingPoint) => {
    let basin = {[[...startingPoint]]: values[[...startingPoint]] };
    let frontier = adjacent(...startingPoint);
    while (frontier.size != 0) {
        [point, frontier] = setPop(frontier);
        basin[[...point]] = values[[...point]];
        frontier = setUnion(frontier, adjacent(...point).filter(p => p in basin)));
    }
    return basin;
};

const parsePointsAndValues = (lines) => {
    const points = [];
    const values = {};
    const x = lines[0].length;
    const y = lines.length;
    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            points.push([i, j]);
            values[[i, j]] = lines[i][j];
        }
    }
    return [points, values];
}
const [allPoints, values] = parsePointsAndValues(lines);
const basins = allPoints.map(unravelBasin);
basinsLengths = basins
    .map(basin => Object.keys(basin).length)
    .sort((a, b) => b - a);

console.log(basinsLengths[0] * basinsLengths[1] * basinsLengths[2]);





