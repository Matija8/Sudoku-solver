
type SudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface ActiveCell {
    row: number | null;
    col: number | null;
}

function isSudokuValue(n: number | null): n is SudokuValue {
    return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
}


class Sudoku {

    private matrix: SudokuValue[][];
    private DOMmatrix: HTMLElement[][];
    /*private readonly presets = Object.freeze({
        unFocusedColor: 'white',
        focusedColor: 'grey',
    });*/


    constructor(root: HTMLElement, readOnly = true) {
        const sudokuTable = document.createElement('div');
        sudokuTable.classList.add('sudoku-table');
        this.matrix = [];
        this.DOMmatrix = [];
        const activeCell: ActiveCell = { row: null, col: null };

        for (let i = 0; i < 9; i++) {
            const sudokuRow = document.createElement('div');
            sudokuRow.classList.add('sudoku-row');
            sudokuTable.appendChild(sudokuRow);

            this.matrix[i] = [];
            this.DOMmatrix[i] = [];

            for (let j = 0; j < 9; j++) {
                const sudokuCell = document.createElement('div');
                sudokuCell.classList.add('sudoku-cell');
                sudokuCell.setAttribute('tabindex', '-1');
                sudokuRow.appendChild(sudokuCell);
                this.DOMmatrix[i][j] = sudokuCell;
                this.matrix[i][j] = null;
                if (!readOnly) {
                    this.addClickListener(i, j, sudokuCell, activeCell);
                }
            }
        }
        if (!readOnly) {
            this.addKeyPressListener(activeCell);
        }
        root.appendChild(sudokuTable);
    }


    public get matrixValue() {
        const newMatrix = [];

        for (let i = 0; i < this.matrix.length; i++) {
            newMatrix[i] = this.matrix[i].slice();
        }
        return this.matrix;
    }


    private addClickListener = (
        row: number,
        col: number,
        cell: HTMLElement,
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


    private addKeyPressListener = (activeCell: ActiveCell) => {
        document.addEventListener('keypress', event => {
            const row = activeCell.row,
                col = activeCell.col;
            const n = parseInt(event.key);
            if (isSudokuValue(n) && row !== null && col !== null) {
                this.DOMmatrix[row][col].innerText = String(n);
                this.matrix[row][col] = n;
            }
        });
    }


}




const main = () => {
    const root = document.getElementById('root');
    if (root === null) {
        console.log(`Couldn't get the root element for the sudoku board.`);
        return;
    }
    const sudoku = new Sudoku(root, false);
    document.addEventListener('keypress', event => {
        if (event.keyCode == 13) {
            console.table(sudoku.matrixValue);
        }
    })
}

main();
