
type SudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ActiveCell {
    row: number | null;
    col: number | null;
}


const presets = Object.freeze({
    unFocusedColor: 'white',
    focusedColor: 'grey',
});


const addClickListener = (
    row: number,
    col: number,
    cell: HTMLElement,
    //matrix: SudokuValue[][],
    activeCell: ActiveCell
) => {
    cell.addEventListener('focus', () => {
        activeCell.row = row;
        activeCell.col = col;
    });
    cell.addEventListener('blur', () => {
        activeCell.row = null;
        activeCell.col = null;
    });
}


const addKeyPressListener = (activeCell: ActiveCell, DOMmatrix: HTMLElement[][]) => {
    document.addEventListener('keypress', event => {
        const n = parseInt(event.key);
        if (n > 0 && activeCell.row !== null && activeCell.col !== null) {
            const cell = DOMmatrix[activeCell.row][activeCell.col];
            cell.innerText = String(n);
        }
    });
}


const makeSudoku = (root: HTMLElement): SudokuValue[][] => {
    const sudokuTable = document.createElement('div');
    sudokuTable.classList.add('sudoku-table');
    const matrix: SudokuValue[][] = [];
    const DOMmatrix: HTMLElement[][] = [];
    const activeCell: ActiveCell = { row: null, col: null };

    for (let i = 0; i < 9; i++) {
        const sudokuRow = document.createElement('div');
        sudokuRow.classList.add('sudoku-row');
        sudokuTable.appendChild(sudokuRow);

        matrix[i] = [];
        DOMmatrix[i] = [];

        for (let j = 0; j < 9; j++) {
            const sudokuCell = document.createElement('div');
            sudokuCell.classList.add('sudoku-cell');
            sudokuCell.setAttribute('tabindex', '-1');
            sudokuRow.appendChild(sudokuCell);
            DOMmatrix[i][j] = sudokuCell;
            matrix[i][j] = null;
            addClickListener(i, j, sudokuCell, /*matrix,*/ activeCell);
        }
    }
    addKeyPressListener(activeCell, DOMmatrix);
    root.appendChild(sudokuTable);
    return matrix;
};


const main = () => {
    const root = document.getElementById('root');
    if (root === null) {
        console.log(`Couldn't get the root element for the sudoku board.`);
        return;
    }
    const matrix: SudokuValue[][] = makeSudoku(root);
}

main();
