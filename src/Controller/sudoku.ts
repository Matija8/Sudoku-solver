import {
  SudokuCellValue,
  isSudokuValue,
  SudokuCell,
} from '../Model/sudokuCell';
import { createDOM } from '../View/sudokuView';

export class Sudoku {
  private matrix: SudokuCell[][];

  constructor(root: HTMLElement) {
    const { DOMmatrix, sudokuDOM, checkBtn } = createDOM();
    this.matrix = Sudoku.createMatrix(DOMmatrix);
    root.appendChild(sudokuDOM);
    // TODO: Added removing from root!?
    // TODO: Add new game/clear.

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.addEventListenersToCell(row, col, DOMmatrix[row][col]);
      }
    }

    // TODO: remove listeners on close.
    const clickCheckBtn = () => {
      this.updateCellValidityView();
    };
    checkBtn.addEventListener('click', clickCheckBtn);

    this.addGlobalKeyPressListeners();
  }

  public get matrixValue() {
    // Return copy of the sudoku matrix.
    const newMatrix = [];
    for (let i = 0; i < this.matrix.length; i++) {
      newMatrix[i] = this.matrix[i].map((cell) => cell.val);
    }
    return newMatrix;
  }

  // * Setup methods *

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

  // * View *

  private updateCellValidityView() {
    const invalidCells = this.getInvalidCells();
    for (const cell of this.getAllCells()) {
      cell.isCorrect = !invalidCells.has(cell);
    }
  }

  // * Cell getter methods *

  private getCellByRowCol(row: number, col: number): SudokuCell {
    return this.matrix[row][col];
  }

  private getAllCells() {
    const cells = [];
    for (const row of this.matrix) {
      for (const cell of row) {
        cells.push(cell);
      }
    }
    return cells;
  }

  // * Listener adding methods *

  private addEventListenersToCell = (
    row: number,
    col: number,
    cell: HTMLElement
  ) => {
    cell.addEventListener('keydown', (event: KeyboardEvent) => {
      event.preventDefault();
      const setDOMValue = (newVal: string) =>
        ((event.target as any).value = newVal);
      const cell = this.getCellByRowCol(row, col);
      const val = Number(event.key);
      const isValidNumber = val !== NaN && 1 <= val && val <= 9;
      if (isValidNumber) {
        setDOMValue(String(val));
        this.trySetCellValue(cell, val);
        return;
      }
      console.log(event.key);
      if (['Backspace', 'Delete', 'x'].includes(event.key)) {
        setDOMValue('');
      }
    });
  };

  private addGlobalKeyPressListeners = (): void => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'c') {
        this.updateCellValidityView();
      }
    });
  };

  private trySetCellValue(cell: SudokuCell, val: any) {
    if (isSudokuValue(val)) {
      cell.val = val;
      if (this.checkWin()) {
        // TODO: Do something on victory!
      }
    }
  }

  // * Win condition *

  private checkWin(): boolean {
    if (!this.checkIfAllCellsAreFilled()) {
      return false;
    }

    return this.getInvalidCells().size === 0;
  }

  private checkIfAllCellsAreFilled(): boolean {
    return this.getAllCells().every((cell) => cell.val !== null);
  }

  // * Cell validity methods *

  private getInvalidCells(): Set<SudokuCell> {
    const invalidCells = new Set<SudokuCell>();
    for (let i = 0; i < 9; i++) {
      for (const cell of this.getInvalidCellsFromRow(i)) {
        invalidCells.add(cell);
      }
      for (const cell of this.getInvalidCellsFromCol(i)) {
        invalidCells.add(cell);
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (const cell of this.getInvalidCellsFromSquare(i, j)) {
          invalidCells.add(cell);
        }
      }
    }
    return invalidCells;
  }

  private getInvalidCellsFromRow(row: number): Set<SudokuCell> {
    console.assert(0 <= row && row < 9, 'Row number is invalid.');
    return Sudoku.invalidCellsFromArray(this.matrix[row]);
  }

  private getInvalidCellsFromCol(col: number): Set<SudokuCell> {
    console.assert(0 <= col && col < 9, 'Col number is invalid.');
    const cells = [];
    for (let row = 0; row < 9; row++) {
      cells.push(this.matrix[row][col]);
    }
    return Sudoku.invalidCellsFromArray(cells);
  }

  private getInvalidCellsFromSquare(xAxis: number, yAxis: number) {
    const cells = [];
    for (let row = 0 + 3 * yAxis; row < 3 + 3 * yAxis; row++) {
      for (let col = 0 + 3 * xAxis; col < 3 + 3 * xAxis; col++) {
        cells.push(this.matrix[row][col]);
      }
    }
    return Sudoku.invalidCellsFromArray(cells);
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
