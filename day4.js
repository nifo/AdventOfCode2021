const fs = require('fs')

const [drawingsData, , ...boardsData] = fs.readFileSync('./day4.txt').toString().split('\n');

// Maps are ordered. So i figured it would be a nice fit.
// number: <'' or marked('dutt')>
const createBoards = (boardsData, boards = []) => {
    if (boardsData.length === 0) return boards;

    const board = new Map();
    while(true) {
        let row = boardsData.shift();
        if(row === '') break;
        
        for (const n of row.split(/\ +/).filter(Boolean)) {
            board.set(Number(n), '');
        }
    }
    boards.push(board);
    return createBoards(boardsData, boards)
}

const mark = (board, draw) => {
    if (board.has(draw)) {
        board.set(draw, 'dutt');
    }
}

const rowBingo = (nums) => {
    if(nums.length === 0) return false

    const row = nums.splice(0, 5);
    if (row.every(([_n, marked]) => marked === 'dutt')) {
        return true
    }
    return rowBingo(nums)
};

const colBingo = (nums) => {
    for (let i = 0;  i < nums.length; i++) {
        let col = []
        nums.forEach((n, j) => {
            if ((i + j) % 5 === 0) {
                col.push(n);
            }
        });
        if (col.every(([_n, mark]) => mark === 'dutt')) {
            return true;
        }
    }
    return false;
}; 

const bingo = (board) => {
    const numbers = [...board.entries()];
    return  rowBingo([...numbers]) || colBingo([...numbers]);
}

const play = (drawings, boards) => {
    for (const draw of drawings) {
        for (const board of boards) {
            mark(board, draw)
            if (bingo(board)) { 
                return [board, draw];
            }
        }
    }
};

const unmarked = (board) => {
    return [...board.entries()].flatMap(([n, marked]) => {
        if (marked !== 'dutt') {
            return [n];
        }
        return [];
    });
};

const drawings = drawingsData.split(',').map(Number)
const boards = createBoards(boardsData);
const [winningBoard, winningDraw] = play(drawings, boards);
console.log(winningBoard);
console.log(unmarked(winningBoard).reduce((a, c) => a + c) * winningDraw);

const play2 = (drawings, boards) => {
    let lastWinningBoard;
    let lastWinningDraw;
    drawings.forEach((draw) => {
        boards.forEach((board) => { mark(board, draw) });
        boards.forEach((board, index) => {
            if (bingo(board)) { 
                boards.splice(index, 1);
            }
            if (boards.length === 0) {
                lastWinningBoard = board;
                lastWinningDraw = draw;
            }
        })
    });
    return [lastWinningBoard, lastWinningDraw];
};

const [lastWinningBoard, lastWinningDraw] = play2(drawings, boards);
console.log(lastWinningBoard);
console.log(unmarked(lastWinningBoard).reduce((a, c) => a + c) * lastWinningDraw);