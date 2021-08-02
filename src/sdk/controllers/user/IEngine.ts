export type playerMove = "X" | "O" | "";
export type board = playerMove[][];



export default interface IEngine {
    nextMove(board: board): Promise<board | undefined>;
}
