export const createDOM = function createSudokuDOMView(): {
  DOMmatrix: HTMLElement[][];
  sudokuDOM: HTMLElement;
  checkBtn: HTMLButtonElement;
  [key: string]: any; // TODO: Remove this later. For dev purposes only!
} {
  const sudokuDOM = document.createElement('div');
  sudokuDOM.classList.add('sudoku-DOM');

  const { sudokuTable, DOMmatrix } = makeTable();
  sudokuDOM.appendChild(sudokuTable);

  const checkBtn = makeCheckButton();
  sudokuDOM.appendChild(checkBtn);

  // TODO: add solve logic.
  // const solveBtn = makeSolveButton();
  // sudokuDOM.appendChild(solveBtn);

  return { DOMmatrix, sudokuDOM, checkBtn };
};

const makeTable = () => {
  const sudokuTable = document.createElement('div');
  sudokuTable.classList.add('sudoku-table');
  const DOMmatrix: HTMLElement[][] = [];

  for (let i = 0; i < 9; i++) {
    const sudokuRow = document.createElement('div');
    sudokuRow.classList.add('sudoku-row');
    sudokuTable.appendChild(sudokuRow);
    DOMmatrix[i] = [];

    for (let j = 0; j < 9; j++) {
      const sudokuCell = makeSudokuCell(i, j);
      sudokuRow.appendChild(sudokuCell);
      DOMmatrix[i][j] = sudokuCell;
    }
  }
  return { sudokuTable, DOMmatrix };
};

const makeSudokuCell = function makeSudokuCellDOMElement(i: number, j: number) {
  const sudokuCell = document.createElement('input');
  sudokuCell.type = 'number';
  sudokuCell.maxLength = 1;
  sudokuCell.style.caretColor = 'transparent';
  sudokuCell.classList.add('sudoku-cell');
  addCellBorder(sudokuCell, i, j);
  sudokuCell.setAttribute('tabindex', '-1');
  return sudokuCell;
};

const addCellBorder = function AddedBorderCssClasses(
  cellDOM: HTMLElement,
  row: number,
  col: number
): void {
  if (col % 3 === 0) {
    cellDOM.classList.add('strong-border-left');
  }
  if (col === 8) {
    cellDOM.classList.add('strong-border-right');
  }
  if (row % 3 === 0) {
    cellDOM.classList.add('strong-border-above');
  }
  if (row === 8) {
    cellDOM.classList.add('strong-border-below');
  }
};

const makeCheckButton = () => {
  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = 'Check';
  checkBtn.classList.add('button', 'button-primary');
  return checkBtn;
};

const makeSolveButton = () => {
  const solveBtn = document.createElement('button');
  solveBtn.classList.add('button', 'button-danger');
  solveBtn.innerHTML = 'Solve';
  return solveBtn;
};

// TODO: Add undo and redo buttons (Command pattern).
