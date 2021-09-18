import { Sudoku } from './Controller/sudoku-controller';

const main = function appendSudokuGameToRoot(rootId = 'root') {
  const root = document.getElementById(rootId);
  if (!root) {
    console.error(`Couldn't get the root element for the sudoku board.`);
    return;
  }
  const sudoku = new Sudoku(root);
  document.addEventListener('keypress', (event) => {
    if (event.key === 't') {
      console.table(sudoku.matrixValue);
    }
  });
};

main();
