import { CellView } from '../View/CellView';

export type SudokuCellValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const isSudokuValue = function isValidSudokuCellValue(
  n: number | null
): n is SudokuCellValue {
  return [null, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(n);
};

export class SudokuCell {
  private _val: SudokuCellValue;
  private _isCorrect: boolean;
  private _readOnly: boolean;
  private _DOMElement: HTMLElement;
  private _view: CellView;

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
    this._view = new CellView(DOMElement);
  }

  public get isCorrect(): boolean {
    return this._isCorrect;
  }

  public set isCorrect(correct: boolean) {
    this._isCorrect = correct;
    this._view.isCorrect = correct;
  }

  public get val() {
    return this._val;
  }

  public set val(newVal: SudokuCellValue) {
    if (newVal === this._val || this._readOnly) {
      return;
    }
    this._val = newVal;
    const DOMText = newVal === null ? '' : String(newVal);
    this._DOMElement.innerHTML = DOMText;
  }
}
