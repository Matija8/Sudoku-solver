import {
  isSudokuValue,
  SudokuCell,
  SudokuCellValue,
} from '../Model/sudokuCell';
import { createDOM } from '../View/sudokuView';
import { CellValidator } from './cell-validator';

export class SudokuController {
  private matrix: SudokuCell[][];
  private cellValidator: CellValidator;

  constructor(root: HTMLElement) {
    const { DOMmatrix, sudokuDOM, checkBtn } = createDOM();
    this.matrix = SudokuController.createMatrix(DOMmatrix);
    this.cellValidator = new CellValidator(this.matrix);
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
    const matrixValues = [];
    for (let i = 0; i < this.matrix.length; i++) {
      matrixValues[i] = this.matrix[i].map((cell) => cell.val);
    }
    return matrixValues;
  }

  public set matrixValue(newMatrix: SudokuCellValue[][]) {
    // TODO: Get from api.
    const isValidMatrix = (matrix: SudokuCellValue[][]) =>
      matrix.length === 9 && matrix.every((row) => row.length === 9);

    if (!isValidMatrix(newMatrix)) {
      console.error('Bad newMatrix!', newMatrix);
      return;
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        this.matrix[row][col].val = newMatrix[row][col];
      }
    }
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

  private updateCellValidityView() {
    const invalidCells = this.getInvalidCells();
    for (const cell of this.getAllCells()) {
      cell.isCorrect = !invalidCells.has(cell);
    }
  }

  private clearCellValidityView() {
    this.getAllCells().forEach((cell) => {
      cell.isCorrect = true;
    });
  }

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
        this.trySetCellValue(cell, val) && setDOMValue(String(val));
        return;
      }
      if (['Backspace', 'Delete', 'x'].includes(event.key)) {
        this.trySetCellValue(cell, null) && setDOMValue('');
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
    this.clearCellValidityView();
    if (isSudokuValue(val)) {
      cell.val = val;
      if (this.checkWin()) {
        // TODO: Do something on victory!
        alert('Yo win!');
      }
      return true;
    }
    return false;
  }

  private checkWin(): boolean {
    return this.checkIfAllCellsAreFilled() && this.getInvalidCells().size === 0;
  }

  private checkIfAllCellsAreFilled(): boolean {
    return this.getAllCells().every((cell) => cell.val !== null);
  }

  private getInvalidCells() {
    return this.cellValidator.getInvalidCells();
  }
}
