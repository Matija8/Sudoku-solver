
export type SudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;


interface ActiveCell {
  row: number | null;
  col: number | null;
}


function isSudokuValue(n: number | null): n is SudokuValue {
  return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
}


export class Sudoku {

  private matrix: SudokuValue[][];
  private DOMmatrix: HTMLElement[][];
  private readonly activeCell: ActiveCell;


  constructor(root: HTMLElement, readOnly = true) {
    this.matrix = [];
    this.DOMmatrix = [];
    this.activeCell = { row: null, col: null };

    const sudokuDOM = document.createElement('div');
    sudokuDOM.classList.add('sudoku-DOM');

    const sudokuTable = document.createElement('div');
    sudokuTable.classList.add('sudoku-table');

    for (let i = 0; i < 9; i++) {
      // Rows.
      const sudokuRow = document.createElement('div');
      sudokuRow.classList.add('sudoku-row');
      sudokuTable.appendChild(sudokuRow);

      this.matrix[i] = [];
      this.DOMmatrix[i] = [];

      for (let j = 0; j < 9; j++) {
        // Cells.
        const sudokuCell = document.createElement('div');
        sudokuCell.classList.add('sudoku-cell');
        sudokuCell.setAttribute('tabindex', '-1');
        sudokuRow.appendChild(sudokuCell);
        this.DOMmatrix[i][j] = sudokuCell;
        this.matrix[i][j] = null;

        if (!readOnly) {
          this.addCellClickListener(i, j, sudokuCell);
        }

      }
    }
    if (!readOnly) {
      this.addKeyPressListener();
    }
    sudokuDOM.appendChild(sudokuTable);

    const checkArea = document.createElement('div');
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = 'Check'
    // TODO: add logic.
    const checkText = document.createElement('p');
    checkText.innerHTML = 'Fine here!';
    checkArea.appendChild(checkBtn);
    checkArea.appendChild(checkText);

    sudokuDOM.appendChild(checkArea);

    const solveArea = document.createElement('div');
    const solveBtn = document.createElement('button');
    solveBtn.innerHTML = 'Solve'
    const solveText = document.createElement('p');
    solveArea.appendChild(solveBtn);
    solveArea.appendChild(solveText);

    sudokuDOM.appendChild(solveBtn);

    root.appendChild(sudokuDOM);
  }


  public get matrixValue() {
    // Return copy of the sudoku matrix.
    const newMatrix = [];
    for (let i = 0; i < this.matrix.length; i++) {
      newMatrix[i] = this.matrix[i].slice();
    }
    return newMatrix;
  }


  private get activeCellDOM(): HTMLElement | null {
    const {row, col} = this.activeCell;
    if (row !== null && col !== null) {
      return this.DOMmatrix[row][col];
    }
    return null;
  }


  private setActiveCell(row: number, col: number): void {
    if ({row, col} === this.activeCell) {
      return;
    }
    this.dropActiveCell();
    this.activeCell.row = row;
    this.activeCell.col = col;
    const cell = this.activeCellDOM;
    if (cell !== null) {
      cell.classList.add('active-cell');
    }
  }


  private dropActiveCell(): void {
    const cell = this.activeCellDOM;
    if (cell !== null) {
      cell.classList.remove('active-cell');
    }
    this.activeCell.row = null;
    this.activeCell.col = null;
  }


  private addCellClickListener = (
    row: number,
    col: number,
    cell: HTMLElement,
  ) => {
    cell.addEventListener('click', () => {
      this.setActiveCell(row, col);
    });
    cell.addEventListener('blur', () => {
      this.dropActiveCell();
    });
  }


  private addKeyPressListener = () => {
    document.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        console.log('TODO: Enter?');
      }

      const {row, col} = this.activeCell;

      if (event.key === 'Esc' && row !== null && col !== null) {

      }

      const n = parseInt(event.key);
      if (isSudokuValue(n) && row !== null && col !== null) {
        this.DOMmatrix[row][col].innerText = String(n);
        this.matrix[row][col] = n;
      }
    });
  }


}
