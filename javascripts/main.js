const [rows, cols] = [9, 9];

const main = () => {
    console.log("Scripts loaded!");
    const root = document.getElementById('root');
    makeSudoku({root, rows, cols});
};

main();