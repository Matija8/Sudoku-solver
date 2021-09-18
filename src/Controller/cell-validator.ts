import { SudokuCell } from '../Model/sudokuCell';

export class CellValidator {
  constructor(private readonly matrix: SudokuCell[][]) {}

  public getInvalidCells(): Set<SudokuCell> {
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
    return CellValidator.invalidCellsFromArray(this.matrix[row]);
  }

  private getInvalidCellsFromCol(col: number): Set<SudokuCell> {
    console.assert(0 <= col && col < 9, 'Col number is invalid.');
    const cells = [];
    for (let row = 0; row < 9; row++) {
      cells.push(this.matrix[row][col]);
    }
    return CellValidator.invalidCellsFromArray(cells);
  }

  private getInvalidCellsFromSquare(xAxis: number, yAxis: number) {
    const cells = [];
    for (let row = 0 + 3 * yAxis; row < 3 + 3 * yAxis; row++) {
      for (let col = 0 + 3 * xAxis; col < 3 + 3 * xAxis; col++) {
        cells.push(this.matrix[row][col]);
      }
    }
    return CellValidator.invalidCellsFromArray(cells);
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
