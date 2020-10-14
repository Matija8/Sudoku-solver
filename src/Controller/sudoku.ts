import {
  CellCoords,
  SudokuCellValue,
  isSudokuValue,
  SudokuCell,
} from '../Model/sudokuCell';
import { createDOM } from '../View/sudokuView';

export class Sudoku {
  private matrix: SudokuCell[][];
  private _activeCell: SudokuCell | null;
  private sudokuDOM: HTMLElement;

  constructor(root: HTMLElement, readOnly = true) {
    this._activeCell = null;

    const { DOMmatrix, sudokuDOM, checkBtn } = createDOM();
    this.matrix = Sudoku.createMatrix(DOMmatrix);
    this.sudokuDOM = sudokuDOM;
    root.appendChild(sudokuDOM);

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.addCellClickListener(row, col, DOMmatrix[row][col]);
      }
    }

    // TODO remove listener on close.
    const clickFunc = () => {
      this.invalidCells();
    }
    checkBtn.addEventListener('click', clickFunc);

    this.addKeyPressListeners();


    sudokuDOM.addEventListener('blur', () => {
      this.dropActiveCell();
    });
  }

  private get activeCell(): SudokuCell | null {
    return this._activeCell;
  }

  private set activeCell(newActiveCell: SudokuCell | null) {
    if (this._activeCell === newActiveCell) {
      return;
    }
    if (this._activeCell) {
      this._activeCell.isActive = false;
    }
    if (newActiveCell) {
      newActiveCell.isActive = true;
    }
    this._activeCell = newActiveCell;
  }

  public get matrixValue() {
    // Return copy of the sudoku matrix.
    const newMatrix = [];
    for (let i = 0; i < this.matrix.length; i++) {
      newMatrix[i] = this.matrix[i].map((cell) => cell.val);
    }
    return newMatrix;
  }

  private getCell(row: number, col: number): SudokuCell {
    return this.matrix[row][col];
  }

  private setActiveCell(row: number, col: number): void {
    const newActiveCell = this.getCell(row, col);
    if (!newActiveCell) {
      return;
    }
    if (this.activeCell === newActiveCell) {
      return;
    }
    this.activeCell = newActiveCell;
  }

  private dropActiveCell(): void {
    this.activeCell = null;
  }

  private setActiveCellValue(val: SudokuCellValue) {
    if (!this.activeCell) {
      return;
    }
    this.activeCell.val = val;
  }

  private invalidCells(): Set<SudokuCell> {
    const invalidCells = new Set<SudokuCell>();
    for (let i = 0; i < 9; i++) {
      for (const cell of this.checkRow(i)) {
        invalidCells.add(cell);
      }
      for (const cell of this.checkCol(i)) {
        invalidCells.add(cell);
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (const cell of this.checkSquare(i, j)) {
          invalidCells.add(cell);
        }
      }
    }
    return invalidCells;
  }

  private getCells() {
    const cells = [];
    for (const row of this.matrix) {
      for (const cell of row) {
        cells.push(cell);
      }
    }
    return cells;
  }

  private checkRow(row: number): Set<SudokuCell> {
    // Return invalid cells in row {row}.
    console.assert(0 <= row && row < 9, 'Row number is invalid.');
    return Sudoku.invalidCellsFromArray(this.matrix[row]);
  }

  private checkCol(col: number): Set<SudokuCell> {
    // Return invalid cells in col {col}.
    console.assert(0 <= col && col < 9, 'Col number is invalid.');
    const cells = [];
    for (let row = 0; row < 9; row++) {
      cells.push(this.matrix[row][col]);
    }
    return Sudoku.invalidCellsFromArray(cells);
  }

  private checkSquare(xAxis: number, yAxis: number) {
    // xAxis/yAxis -> 0 | 1 | 2;
    const cells = [];
    for (let row = 0 + 3 * yAxis; row < 3 + 3 * yAxis; row++) {
      for (let col = 0 + 3 * xAxis; col < 3 + 3 * xAxis; col++) {
        cells.push(this.matrix[row][col]);
      }
    }
    return Sudoku.invalidCellsFromArray(cells);
  }

  private addCellClickListener = (
    row: number,
    col: number,
    cell: HTMLElement
  ) => {
    cell.addEventListener('focus', () => {
      this.setActiveCell(row, col);
    });
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.dropActiveCell();
      }

      if (['Backspace', 'Delete', 'x' /*, 'd'*/].includes(event.key)) {
        this.dropActiveCell();
      }

      const val = parseInt(event.key);
      if (isSudokuValue(val)) {
        this.setActiveCellValue(val);
        this.checkWin();
      }
    });
  };

  private addKeyPressListeners = () => {
    document.addEventListener('keydown', (event) => {
      // Non-cell keypresses.
      if (event.key === 'Enter') {
        console.log('TODO: Enter?');
      }

      if (event.key === 'c') {
        this.validateCells();
      }

      if (this.activeCell === null) {
        return;
      }
      // Cell keypresses.

      if (event.key === 'Escape') {
        this.dropActiveCell();
      }

      if (['Backspace', 'Delete', 'x' /*, 'd'*/].includes(event.key)) {
        this.setActiveCellValue(null);
      }

      const val = parseInt(event.key);
      if (isSudokuValue(val)) {
        this.setActiveCellValue(val);
        this.checkWin();
      }
    });
  };


  private validateCells() {
    const invalidCells = this.invalidCells();
    for (const cell of this.getCells()) {
      cell.isCorrect = !invalidCells.has(cell);
    }
  }



  private checkWin() {
    let cellCount = 0;
    for (const cell of this.getCells()) {
      if (!cell.val) {
        return false;
      }
    }
    for (const _ of this.invalidCells().values()) {
      cellCount++;
    }
    return cellCount === 0;
  }

  private static createMatrix(DOMMatrix: HTMLElement[][]): SudokuCell[][] {
    const matrix: SudokuCell[][] = [];
    for (let i = 0; i < 9; i++) {
      matrix[i] = [];
      for (let j = 0; j < 9; j++) {
        matrix[i][j] = new SudokuCell({ DOMElement: DOMMatrix[i][j] });
      }
    }
    return matrix;
  }

  private static invalidCellsFromArray(cells: SudokuCell[]): Set<SudokuCell> {
    const invalidCells = new Set<SudokuCell>();
    const repeated = new Set<number>();
    const vals = new Set<number>();
    for (const val of cells.map((cell) => cell.val)) {
      if (val === null) {
        continue;
      }
      if (vals.has(val)) {
        repeated.add(val);
      }
      vals.add(val);
    }
    for (const cell of cells) {
      if (cell.val === null) {
        continue;
      }
      if (repeated.has(cell.val)) {
        invalidCells.add(cell);
      }
    }
    return invalidCells;
  }
}
