import { CellCoords, SudokuCellValue, isSudokuValue } from '../Model/sudokuCell';
import { createDOM } from '../View/sudokuView';


export class Sudoku {

  private matrix: SudokuCellValue[][];
  private DOMmatrix: HTMLElement[][];
  private activeCell: CellCoords | null;


  constructor(root: HTMLElement, readOnly = true) {
    this.matrix = Sudoku.createMatrix();
    this.DOMmatrix = [];
    this.activeCell = null;

    const { DOMmatrix, sudokuDOM } = createDOM();
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


  private isReadOnlyCell(row: number, col: number) {
    return false;
  }


  private setCellValue(row: number, col: number, val: SudokuCellValue) {
    // TODO: assert row/col.
    // TODO: Add readonly cells!
    if (this.isReadOnlyCell(row, col)) {
      return;
    }
    const prevVal = this.matrix[row][col];
    if (val === prevVal) {
      return;
    }

    this.matrix[row][col] = val;
    const DOMText = val === null ? '' : String(val)
    this.DOMmatrix[row][col].innerText = DOMText;
  }

  private getCellValue(row: number, col: number): SudokuCellValue {
    return this.matrix[row][col];
  }


  private getActiveRowDOM() {
    // TODO
  }


  private getActiveColDOM() {
    // TODO
  }


  private checkRow(row: number) {
    console.assert(0 < row && row <= 9, 'Row number is invalid.')
    const repeated = new Set<number>();
    const vals = new Set<number>();
    for (const val of this.matrix[row]) {
      if (val === null) {
        continue;
      }
      if (vals.has(val)) {
        repeated.add(val);
      }
      vals.add(val);
    }
    return repeated;
  }

  private checkCol(col: number) {
    // Check if there are no duplicates in col {col}.
    console.assert(0 < col && col <= 9, 'Col number is invalid.')
    const vals = new Set<number>()
    for (let row = 0; row < 9; row++) {
      const val = this.matrix[row][col];
      if (val === null) {
        continue;
      }
      if (vals.has(val)) {
        return false;
      }
      vals.add(val);
    }
    return true;
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
      const setActiveCellValue = (val: SudokuCellValue): void => {
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


  private static createMatrix(): SudokuCellValue[][] {
    const matrix: SudokuCellValue[][] = [];
    for (let i = 0; i < 9; i++) {
      matrix[i] = [];
      for (let j = 0; j < 9; j++) {
        matrix[i][j] = null;
      }
    }
    return matrix;
  }

}
