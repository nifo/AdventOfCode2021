const fs = require('fs');

const numbers = fs.readFileSync('./day7.txt').toString().split(',').map(Number);

const fuelCost = (horizontalPosistions, center) => {
    return horizontalPosistions.reduce((acc, curr) => {
        return acc + Math.abs(curr - center);
    }, 0)
};

const fuelCost2 = (horizontalPosistions, center) => {
    return horizontalPosistions.reduce((acc, curr) => {
        const f = (n, center, i = 1, cost = 0) => {
            if (n === center) return cost;
            const delta = n < center ? n + 1 : n - 1 
            return f(delta, center, i + 1, cost + i)
        }
        return acc + f(curr, center);
    }, 0)
};


const leastFuelCost = (numbers, fuelCost) => {
    const maxNumber = Math.max(...numbers)
    let lowest = Number.MAX_VALUE;
    for(let i = 0; i < maxNumber; i++) {
        const fc = fuelCost(numbers, i);
        if (fc < lowest) lowest = fc;
    }
    return lowest
}

;
console.log(leastFuelCost(numbers, fuelCost));
console.log(leastFuelCost(numbers, fuelCost2));