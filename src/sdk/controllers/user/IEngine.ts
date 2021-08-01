export type playerMove = "X" | "O" | "";
export type board = [
    [playerMove, playerMove, playerMove],
    [playerMove, playerMove, playerMove],
    [playerMove, playerMove, playerMove]
];


export default interface IEngine {
    nextMove(board: board): Promise<board>;
}
