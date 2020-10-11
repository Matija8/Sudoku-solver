import { SudokuCell } from "../Model/sudokuCell";



export const createDOM = function createSudokuDOMView(): {
  DOMmatrix: HTMLElement[][],
  sudokuDOM: HTMLElement,
} {
  const DOMmatrix: HTMLElement[][] = [];

  const sudokuDOM = document.createElement('div');
  sudokuDOM.classList.add('sudoku-DOM');

  // Table-start.
  const sudokuTable = document.createElement('div');
  sudokuTable.classList.add('sudoku-table');

  for (let i = 0; i < 9; i++) {
    // Rows.
    const sudokuRow = document.createElement('div');
    sudokuRow.classList.add('sudoku-row');
    sudokuTable.appendChild(sudokuRow);
    DOMmatrix[i] = [];

    for (let j = 0; j < 9; j++) {
      // Cells.
      const sudokuCell = document.createElement('div');
      sudokuCell.classList.add('sudoku-cell');
      addCellBorder(sudokuCell, i, j);
      sudokuCell.setAttribute('tabindex', '-1');
      sudokuRow.appendChild(sudokuCell);
      DOMmatrix[i][j] = sudokuCell;
    }
  }
  sudokuDOM.appendChild(sudokuTable);
  // Table-end.


  // Check-area-start.
  const checkArea = document.createElement('div');
  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = 'Check'
  checkBtn.classList.add('button', 'button-primary')
  // TODO: add logic.
  const checkText = document.createElement('p');
  checkText.innerHTML = 'Fine here!';
  checkArea.appendChild(checkBtn);
  checkArea.appendChild(checkText);
  sudokuDOM.appendChild(checkArea);
  // Check-area-end.


  // Solve-area-start.
  const solveArea = document.createElement('div');
  const solveBtn = document.createElement('button');
  solveBtn.classList.add('button', 'button-danger')
  solveBtn.innerHTML = 'Solve'
  const solveText = document.createElement('p');
  solveArea.appendChild(solveBtn);
  solveArea.appendChild(solveText);
  sudokuDOM.appendChild(solveBtn);
  // Solve-area-end.

  return { DOMmatrix, sudokuDOM };
}


const addCellBorder = function AddedBorderCssClasses(
  cellDOM: HTMLElement, row: number, col: number
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
}
