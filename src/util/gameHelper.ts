import { board } from './../sdk/controllers/user/IEngine';
export function calculateWinner(board: board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const flatBoard = board.flatMap(item => item);
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
            return flatBoard[a];
        }
    }
    return null;
}