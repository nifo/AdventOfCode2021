const fs = require('fs');

const lines = fs.readFileSync('./day10.txt').toString().split('\n');

const openingChars = ['(', '[', '{', '<'];
const closingChars = [')', ']', '}', '>'];
const closes = (opening, closing) => {
    if (opening === '(') return closing === ')'
    if (opening === '[') return closing === ']'
    if (opening === '{') return closing === '}'
    if (opening === '<') return closing === '>'
}

let openings = [];
const corrupted = (char, ...text) => {
    if(openingChars.includes(char)) openings.push(char);
    if(closingChars.includes(char)) {
        let lastOpening = openings.pop()
        if (!closes(lastOpening, char)) {
            openings = [];
            return char;
        }
    }
    if (text.length === 0) {
        openins = [];
        return false;
    }
    return corrupted(...text)
};

const firstIllegalChar = lines.map(line => corrupted(...line));
console.log(firstIllegalChar);
const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}
const scored = firstIllegalChar
    .filter(Boolean)
    .map(char => scores[char])
    .reduce((acc, curr) => acc + curr, 0);
console.log(scored);

// two star

let incompleteOpenings = [];
const incomplete = (char, ...text) => {
    if(openingChars.includes(char)) incompleteOpenings.push(char);
    if(closingChars.includes(char)) {
        let lastOpening = incompleteOpenings[incompleteOpenings.length - 1];
        if (closes(lastOpening, char)) {
            incompleteOpenings.pop()
            return incomplete(...text)
        }
    }
    if (text.length === 0) {
        const leftoveropenings = [...incompleteOpenings]
        incompleteOpenings = [];
        return leftoveropenings
    };
    return incomplete(...text)
};


const incompletedLines = lines
    .filter(line => !corrupted(...line))
    .map(line => incomplete(...line))
    .map(chars => chars.reverse().join(''))
    .map((chars) => {
        return [...chars].map((c) => {
            if (c === '(') return ')'
            if (c === '[') return ']'
            if (c === '{') return '}'
            if (c === '<') return '>'
        })
    });
console.log(incompletedLines);

const incompletesScores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};
const scoredIncompletes = incompletedLines
    .map(incompleteChars => {
        return incompleteChars.reduce((acc, char) => 5 * acc + incompletesScores[char], 0)
    })
    .sort((a, b) => a - b);
console.log(scoredIncompletes[Math.floor(scoredIncompletes.length / 2)]);
