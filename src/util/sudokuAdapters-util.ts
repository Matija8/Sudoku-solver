import { SudokuCellValue } from '../Model/sudokuCell';

export function makeEmptyMatrix() {
  const matrix: SudokuCellValue[][] = [];
  for (let i = 0; i < 9; i++) {
    matrix[i] = [];
    for (let j = 0; j < 9; j++) {
      matrix[i][j] = null;
    }
  }
  return matrix;
}
