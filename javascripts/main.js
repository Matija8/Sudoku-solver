'use-strict';

const makeSudoku = ({root}) => {
    const tableSudoku = document.createElement('div');
    tableSudoku.classList.add('sudoku-table');
    const matrix = [];

    for (let i = 0; i < 9; i++) {
        matrix[i] = [];
        const rowSudoku = document.createElement('div');
        rowSudoku.classList.add('sudoku-row');
        tableSudoku.appendChild(rowSudoku);

        for (let j = 0; j < 9; j++) {
            const cellSudoku = document.createElement('div');
            cellSudoku.classList.add('sudoku-cell');
            //cellSudoku.innerText = `${i},${j}`;
            cellSudoku.setAttribute('tabindex', '-1');
            cellSudoku.setAttribute('data-row', i);
            cellSudoku.setAttribute('data-col', j);
            matrix[i][j] = {
                row: i,
                col: j,
                dom: cellSudoku,
                val: null,
            };
            rowSudoku.appendChild(cellSudoku);
        }
    }
    root.appendChild(tableSudoku);
    return {
        table: tableSudoku,
        matrix: matrix
    };
};


const addListeners = state => {

    const addClickListeners = state => {
        state.matrix.forEach(row => {
            row.forEach(cell => {
                const {row: i, col: j, dom: cellDOM} = cell;

                cellDOM.addEventListener('focus', event => {
                    //console.log(`focus ${i},${j}`);
                    state.focused = cellDOM;
                    cellDOM.style.backgroundColor = state.focusedColor;
                });

                cellDOM.addEventListener('blur', event => {
                    //console.log(`blur  ${i},${j}`);
                    state.focused = null;
                    cellDOM.style.backgroundColor = state.unFocusedColor;
                });

            });
        });
    };

    const addKeyPressListeners = state => {
        document.addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                //console.table(state.matrix);
            }

            const n = parseInt(event.key);
            if (n > 0) {
                //console.log(`Keypress ${n}`);
                const activeCell = state.focused;
                if (activeCell) {
                    activeCell.innerText = n;
                    const row = activeCell.getAttribute('data-row'),
                          col = activeCell.getAttribute('data-col');
                    state.matrix[row][col].val = n;
                }
            }
        });
    };

    addClickListeners(state);
    addKeyPressListeners(state);
};





const main = () => {
    console.log("Scripts loaded!");
    const root = document.getElementById('root');
    const state = {
        focused: null,
        unFocusedColor: 'white',
        focusedColor: 'grey',
        matrix: makeSudoku({root}).matrix,
    };
    addListeners(state);
};


main();
