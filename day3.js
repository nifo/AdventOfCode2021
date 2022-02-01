const fs = require('fs')

const diagnosticReport = fs.readFileSync('./day3.txt').toString().split('\n');

const bitMap = (source) => {
    const bits = [];
    for(const report of source) {
        Array(...report).forEach((n, index) => {
            bits[index] = `${bits[index] ? bits[index] : ''}${n}`;
        })
    };
    return bits;
}
const bits = bitMap(diagnosticReport)


const count = (string, char) => {
    return Array(...string).reduce((acc, curr) => {
        return curr === char ? acc + 1 : acc 
    }, 0)
};

const commonBit = bits.map((bit) => {
    const zeros = count(bit, '0');
    const ones = count(bit, '1');
    return zeros > ones ? '0' : '1';
}).join('');

const leastCommonBit = Array(...commonBit).map((c) => {
    if (c === '0') return '1';
    if (c === '1') return '0';
}).join('');

console.log(Number.parseInt(commonBit, 2) * Number.parseInt(leastCommonBit, 2));

const oxygenGeneratorCriteria = (bit) => {
    const zeros = count(bit, '0');
    const ones = count(bit, '1');
    return ones >= zeros ? '1' : '0';
};

const CO2scrubberCriteria = (bit) => {
    const zeros = count(bit, '0');
    const ones = count(bit, '1');
    return zeros <= ones ? '0' : '1'
};

const bitRating = (bits, bitCriteria, position = 0) => {
    if (bits.length === 1) return bits[0];

    const bmap = bitMap(bits)
    const criteria = bitCriteria(bmap[position]);
    
    const filteredBits = bits.flatMap((bit) => {
        if (bit[position] === criteria) {
            return [bit]
        }
        return []
    })
    return bitRating(filteredBits, bitCriteria, position + 1);
}

const oxygen = bitRating(diagnosticReport, oxygenGeneratorCriteria)
const co2Scrubber = bitRating(diagnosticReport, CO2scrubberCriteria)

const binaryToInt = (n) => Number.parseInt(n, 2);
console.log(binaryToInt(oxygen) * binaryToInt(co2Scrubber));

