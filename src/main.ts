import { Sudoku } from './Controller/sudoku';


const main = function appendSudokuGameToRoot(rootId = 'root') {
  const root = document.getElementById(rootId);
  if (root === null) {
    console.log(`Couldn't get the root element for the sudoku board.`);
    return;
  }
  const sudoku = new Sudoku(root);
  document.addEventListener('keypress', event => {
    if (event.key === 't') {
      // Get sudoku matrix data in table form.
      console.table(sudoku.matrixValue);
    }
  });
}

main();
