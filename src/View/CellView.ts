export class CellView {
  constructor(private _DOMElement: HTMLElement) {
    this.isCorrect = true;
  }

  public set isCorrect(correct: boolean) {
    if (!correct) {
      this._DOMElement.classList.add('invalid-cell');
    } else {
      this._DOMElement.classList.remove('invalid-cell');
    }
  }
}
