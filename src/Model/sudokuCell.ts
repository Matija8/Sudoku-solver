
export type SudokuCellValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;


export const isSudokuValue = function isValidSudokuCellValue(
  n: number | null
): n is SudokuCellValue {
  return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
}


export interface CellCoords {
  row: number;
  col: number;
}

export class SudokuCell {
  private _val: SudokuCellValue;
  private _isCorrect: boolean;
  private _readOnly: boolean;

  constructor({readOnly = false, val = null}) {
    this._isCorrect = true;
    this._val = val;
    this._readOnly = readOnly;
  }
}
