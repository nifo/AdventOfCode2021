const fs = require('fs');

const lines = fs.readFileSync('./day8.txt').toString().split('\n').map(line => line.split(' | '));

const outputs1 = lines.flatMap(([_nums, output]) => output.split(' '));
console.log(outputs1.reduce((acc, output) => {
    if ([2, 4, 3, 7].includes(output.length)) return acc + 1
    return acc
}, 0));

const sortedString = (map) => {
    return [...map].sort().join('');
}

// JS missing set operator
const intersection = (A, B) => {
    return new Set(Array.from(A).filter(x => B.has(x)));
};

const train = (segments) => {
    const one = segments.find(segment => segment.size == 2);
    const four = segments.find(segment => segment.size == 4);
    const seven = segments.find(segment => segment.size == 3);
    const eight = segments.find(segment => segment.size == 7);

    const zeroSixNine = segments.filter(segment => segment.size == 6);
    const [six] = zeroSixNine.filter(s => intersection(s, one).size == 1);
    const [nine] = zeroSixNine.filter(s => intersection(s, four).size == 4);
    const [zero] = zeroSixNine.filter(s => ![six, nine].includes(s));

    const twoThreeFive = segments.filter(segment => segment.size == 5);
    const [two] = twoThreeFive.filter(s => intersection(s, nine).size == 4);
    const [three] = twoThreeFive.filter(s => intersection(s, one).size == 2);
    const [five] = twoThreeFive.filter(s => ![two, three].includes(s))

    return ({
        [sortedString(nine)]: 9,
        [sortedString(eight)]: 8,
        [sortedString(seven)]: 7,
        [sortedString(six)]: 6,
        [sortedString(five)]: 5,
        [sortedString(four)]: 4,
        [sortedString(three)]: 3,
        [sortedString(two)]: 2,
        [sortedString(one)]: 1,
        [sortedString(zero)]: 0,
    });
};

let sum = 0;
lines.forEach(([segments, outputSegments]) => {
    const deductionModel = train(segments.split(' ').map(segment => new Set(segment)));
    const outputNumbers = outputSegments.split(' ').map(segment => {
        return deductionModel[sortedString(segment)];
    });
    const n = Number(outputNumbers.join(''))
    console.log(n);
    sum += n
});
console.log(sum)





// ab: 1 --
// eafb: 4 --
// dab: 7 --
// acedgfb: 8 --

// length of 5 (2, 3, 5)
// gcdfa: 2
// fbcad: 3
// cdfbe: 5

// length of 6 (0, 6, 9)
// cefabd: 9
// cdfgeb: 6
// cagedb: 0

// (2,3,5) (0,6,9)
// 0:      1:      2:      3:      4:
// aaaa    ....    aaaa    aaaa    ....
// b    c  .    C  .    c  .    c  B    C
// b    c  .    C  .    c  .    c  B    C
// ....    ....    dddd    dddd    DDDD
// e    f  .    F  e    .  .    f  .    F
// e    f  .    F  e    .  .    f  .    F
// gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
// aaaa    aaaa    AAAA    AAAA    aaaa
// b    .  b    .  .    C  B    C  b    c
// b    .  b    .  .    C  B    C  b    c
// dddd    dddd    ....    DDDD    dddd
// .    f  e    f  .    F  E    F  .    f
// .    f  e    f  .    F  E    F  .    f
// gggg    gggg    ....    GGGG    gggg

// (a|e|g) = 2 - 4
// (a|g) = 3 - 4
// (a|g) = 5 - 4
// x for x in (2,3,5) if len(x - 4) == 3 => 2

// (b|f) = 5 - 2
// (f) = 3 - 2
// x for x in (2,3,5) - (2) if len(x - 2) == 2 => 5
// 3 = (2,3,5) - (2,5)

// (a|e|g) = 0 - 4
// (a|e|g) = 6 - 4
// (a|g) = 9 - 4
// 9 där längden av resten är 2

// (b|e|g) = 0 - 7
// (b|d|e|f) = 6 - 7