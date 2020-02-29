const [rows, cols] = [9, 9];

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
            cellSudoku.setAttribute('tabindex', '-1');
            matrix[i][j] = {
                row: i,
                col: j,
                val: null,
                dom: cellSudoku,
            };
            rowSudoku.appendChild(cellSudoku);
        }
    }
    root.appendChild(tableSudoku);
    return matrix;
};


addClickListeners = matrix => {
    matrix.forEach(row => {
        row.forEach(cell => {
            const {row: i, col: j, dom} = cell;

            dom.addEventListener('focus', event => {
                console.log(`focus ${i},${j}`);
                //TODO: allow setting sudoku cell value
            });

            dom.addEventListener('blur', event => {
                console.log(`blur  ${i},${j}`);
                //TODO: return prev value;
            });

        });
    });
};


const main = () => {
    console.log("Scripts loaded!");
    const root = document.getElementById('root');
    const matrix = makeSudoku({root, rows, cols});
    addClickListeners(matrix);
};


main();
