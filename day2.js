const fs = require('fs')

let instructions = fs.readFileSync('./day2.txt').toString().split('\n');

const move = (instructions, horizontal = 0, depth = 0) => {
    const instruction = instructions.shift();
    if (instruction === '') return [horizontal, depth];

    const [action, value] = instruction.split(' ')
    if (action === 'up') return move(instructions, horizontal, depth - Number(value));
    if (action === 'down') return move(instructions, horizontal, depth + Number(value));
    if (action === 'forward') return move(instructions, horizontal + Number(value), depth);
};

const product = (a, b) => a * b
console.log(move([...instructions]).reduce(product));


const move2 = (instructions, horizontal = 0, depth = 0, aim = 0) => {
    const instruction = instructions.shift();
    if (instruction === '') return [horizontal, depth];

    const [action, value] = instruction.split(' ')
    if (action === 'up') return move2(instructions, horizontal, depth, aim - Number(value));
    if (action === 'down') return move2(instructions, horizontal, depth, aim + Number(value));
    if (action === 'forward') return move2(instructions, horizontal + Number(value), depth + aim * Number(value), aim);
};

console.log(move2([...instructions]).reduce(product));
