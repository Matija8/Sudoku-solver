export type SudokuCellValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const isSudokuValue = function isValidSudokuCellValue(
  n: number | null
): n is SudokuCellValue {
  return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
};

export interface CellCoords {
  row: number;
  col: number;
}

export class SudokuCell {
  private _val: SudokuCellValue;
  private _isCorrect: boolean;
  private _readOnly: boolean;
  private _DOMElement: HTMLElement;
  private _isActive: boolean;

  constructor({
    readOnly = false,
    val = null,
    DOMElement,
  }: {
    readOnly?: boolean;
    val?: SudokuCellValue;
    DOMElement: HTMLElement;
  }) {
    this._isCorrect = true;
    this._val = val;
    this._readOnly = readOnly;
    console.assert(!!DOMElement, 'DOM element falsy!');
    this._DOMElement = DOMElement;
    this._isActive = false;
  }

  public get isCorrect(): boolean {
    return this._isCorrect;
  }

  public set isCorrect(correct: boolean) {
    if (correct === this._isCorrect) {
      return;
    }
    this._isCorrect = correct;
    if (!correct) {
      this._DOMElement.classList.add('invalid-cell');
    } else {
      this._DOMElement.classList.remove('invalid-cell');
    }
  }

  public set isActive(active: boolean) {
    if (active === this._isActive) {
      return;
    }
    this._isActive = active;
    if (active) {
      this._DOMElement.classList.add('active-cell');
    } else {
      this._DOMElement.classList.remove('active-cell');
    }
  }

  public get val() {
    return this._val;
  }

  public set val(newVal: SudokuCellValue) {
    if (newVal === this._val) {
      return;
    }
    this._val = newVal;
    const DOMText = newVal === null ? '' : String(newVal);
    this._DOMElement.innerHTML = DOMText;
  }
}
