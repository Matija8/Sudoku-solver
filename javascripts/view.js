const makeSudoku = ({root, rows, cols}) => {
    const tableSudoku = document.createElement('div');
    tableSudoku.classList.add('sudoku-table');
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        const rowSudoku = document.createElement('div');
        rowSudoku.classList.add('sudoku-row');
        tableSudoku.appendChild(rowSudoku);

        for (let j = 0; j < cols; j++) {
            const cellSudoku = document.createElement('div');
            cellSudoku.classList.add('sudoku-cell');
            cellSudoku.innerText = `${i},${j}`;
            matrix[i][j] = cellSudoku;
            rowSudoku.appendChild(cellSudoku);
        }
    }
    root.appendChild(tableSudoku);
};