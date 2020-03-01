
type SudokuValue = null|1|2|3|4|5|6|7|8|9;

interface SudokuCell {
    row: number;
    col: number;
    val: SudokuValue;
}

const makeSudoku = (root: HTMLElement): WeakMap<HTMLElement, SudokuCell> => {
    const sudokuTable = document.createElement('div');
    sudokuTable.classList.add('sudoku-table');
    const map: WeakMap<HTMLElement, SudokuCell> = new WeakMap();

    for (let i = 0; i < 9; i++) {
        const sudokuRow = document.createElement('div');
        sudokuRow.classList.add('sudoku-row');
        sudokuTable.appendChild(sudokuRow);

        for (let j = 0; j < 9; j++) {
            const sudokuCell = document.createElement('div');
            sudokuCell.classList.add('sudoku-cell');
            sudokuCell.setAttribute('tabindex', '-1');
            map.set(sudokuCell, {row: i, col: j, val: null});
            sudokuRow.appendChild(sudokuCell);
        }
    }
    root.appendChild(sudokuTable);
    return map;
};

const main = () => {
    const root = document.getElementById('root');
    if (root === null) {
        console.log(`Couldn't get the root element for the sudoku board.`);
        return;
    }
    const map: WeakMap<HTMLElement, SudokuCell> = makeSudoku(root);
}

main();
