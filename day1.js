const fs = require('fs')

let depths = fs.readFileSync('./day1.txt')
                       .toString()
                       .split('\n')
                       .map(Number);

const countIncreases = (arr) => {
    arr.reduce((acc, curr, index, arr) => {
        if (index === 0) return;
        if (arr[index - 1] < curr) {
            return acc + 1;
        }
    }, 0)
};

const slidingTrios = (arr) => {
    const result = arr.map((curr, index) => {
        if (index < 2) return null;
        return arr[index] + arr[index - 1] + arr[index -2]
    })
    return result.filter(Boolean);
};

console.log(countIncreases(depths));
console.log(countIncreases(slidingTrios(depths)));


