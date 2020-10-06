
export type SudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;


interface Cell {
  row: number;
  col: number;
}


function isSudokuValue(n: number | null): n is SudokuValue {
  return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
}


export class Sudoku {

  private matrix: SudokuValue[][];
  private DOMmatrix: HTMLElement[][];
  private activeCell: Cell | null;


  constructor(root: HTMLElement, readOnly = true) {
    this.matrix = Sudoku.createMatrix();
    this.DOMmatrix = [];
    this.activeCell = null;

    const { DOMmatrix, sudokuDOM } = Sudoku.createDOM();
    root.appendChild(sudokuDOM);

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.addCellClickListener(row, col, DOMmatrix[row][col]);
      }
    }
    this.DOMmatrix = DOMmatrix;

    this.addKeyPressListeners();
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
    if (this.activeCell === null) {
      return null;
    }
    const { row, col } = this.activeCell;
    return this.DOMmatrix[row][col];
  }


  private setActiveCell(row: number, col: number): void {
    if ({ row, col } === this.activeCell) {
      return;
    }
    this.dropActiveCell();
    this.activeCell = { row, col };
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
    this.activeCell = null;
  }


  private setCellValue(row: number, col: number, val: SudokuValue) {
    // TODO: assert row/col.
    // TODO: Add readonly cells!
    const DOMText = val === null ? '' : String(val)
    this.DOMmatrix[row][col].innerText = DOMText;
    this.matrix[row][col] = val;
  }

  private getCellValue(row: number, col: number): SudokuValue {
    return this.matrix[row][col];
  }


  private getActiveRowDOM() {
    // TODO
  }


  private getActiveColDOM() {
    // TODO
  }


  private addCellClickListener = (
    row: number,
    col: number,
    cell: HTMLElement,
  ) => {
    cell.addEventListener('click', () => {
      this.setActiveCell(row, col);
    });
    /* cell.addEventListener('blur', () => {
      this.dropActiveCell();
    }); */
  }


  private addKeyPressListeners = () => {
    document.addEventListener('keydown', event => {
      // Non-cell keypresses.
      if (event.key === 'Enter') {
        console.log('TODO: Enter?');
      }

      if (this.activeCell === null) {
        return;
      }
      // Cell keypresses.
      const { row, col } = this.activeCell;
      const setActiveCellValue = (val: SudokuValue): void => {
        this.setCellValue(row, col, val);
      }

      if (event.key === 'Escape') {
        this.dropActiveCell();
      }

      if (['Backspace', 'Delete', 'x'].includes(event.key)) {
        setActiveCellValue(null);
      }

      const val = parseInt(event.key);
      if (isSudokuValue(val)) {
        setActiveCellValue(val);
      }
    });
  }


  private static createMatrix(): SudokuValue[][] {
    const matrix: SudokuValue[][] = [];
    for (let i = 0; i < 9; i++) {
      matrix[i] = [];
      for (let j = 0; j < 9; j++) {
        matrix[i][j] = null;
      }
    }
    return matrix;
  }


  private static createDOM(): {
    DOMmatrix: HTMLElement[][],
    sudokuDOM: HTMLElement,
  } {
    const DOMmatrix: HTMLElement[][] = [];

    const sudokuDOM = document.createElement('div');
    sudokuDOM.classList.add('sudoku-DOM');

    // Table-start.
    const sudokuTable = document.createElement('div');
    sudokuTable.classList.add('sudoku-table');

    for (let i = 0; i < 9; i++) {
      // Rows.
      const sudokuRow = document.createElement('div');
      sudokuRow.classList.add('sudoku-row');
      sudokuTable.appendChild(sudokuRow);
      DOMmatrix[i] = [];

      for (let j = 0; j < 9; j++) {
        // Cells.
        const sudokuCell = document.createElement('div');
        sudokuCell.classList.add('sudoku-cell');
        sudokuCell.setAttribute('tabindex', '-1');
        sudokuRow.appendChild(sudokuCell);
        DOMmatrix[i][j] = sudokuCell;
      }
    }
    sudokuDOM.appendChild(sudokuTable);
    // Table-end.


    // Check-area-start.
    const checkArea = document.createElement('div');
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = 'Check'
    // TODO: add logic.
    const checkText = document.createElement('p');
    checkText.innerHTML = 'Fine here!';
    checkArea.appendChild(checkBtn);
    checkArea.appendChild(checkText);
    sudokuDOM.appendChild(checkArea);
    // Check-area-end.


    // Solve-area-start.
    const solveArea = document.createElement('div');
    const solveBtn = document.createElement('button');
    solveBtn.innerHTML = 'Solve'
    const solveText = document.createElement('p');
    solveArea.appendChild(solveBtn);
    solveArea.appendChild(solveText);
    sudokuDOM.appendChild(solveBtn);
    // Solve-area-end.

    return { DOMmatrix, sudokuDOM };
  }


}
