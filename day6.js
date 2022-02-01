const fs = require('fs');

const lines = fs.readFileSync('./day6.txt').toString().split(',').map(Number);

const evolve = (fish) => {
    if (fish === 0) {
        return [6, 8];
    }
    return [fish - 1];
}

const simulate = (fish, days = 80) => {
    if (days === 0) return fish;
    return simulate(fish.flatMap(evolve), days - 1);
}

// console.log(simulate(lines, 80).length);

const evolve2 = (sea) => {
    const nextSea = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0, 6: 0, 7: 0, 8: 0 };
    for(const [days, n] of Object.entries(sea)) {
        if (days === '0') {
            nextSea[6] = nextSea[6] + Number(n); 
            nextSea[8] = Number(n); 
            continue;
        }
        nextSea[days - 1] = nextSea[days - 1] + Number(n);        
    }
    return nextSea;
}

const simulate2 = (sea, days = 256) => {
    if (days === 0) return sea;

    return simulate2(evolve2(sea), days - 1);
}

const parseFish = (fishes) => {
    const sea = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0, 6: 0, 7: 0, 8: 0 };
    for(const fish of fishes) {
        sea[fish] = sea[fish] + 1;
    }
    return sea;
};
const sea = parseFish(lines);

const sea256 = simulate2(sea, 256);
console.log(Object.entries(sea256)
    .map(([_day, n]) => n)
    .reduce((acc, curr) => acc + curr, 0)
);