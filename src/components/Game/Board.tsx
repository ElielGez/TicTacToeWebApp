import React, { useState } from 'react';
import { localSDK } from '../../sdk';
import { board, playerMove } from '../../sdk/controllers/user/IEngine';
import Cell from './Cell';


type Props = {
}
const initBoard: board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
const Board = ({ }: Props) => {
    const [board, setBoard] = useState(initBoard);
    const [isXNext, setIsXNext] = useState(true);
    const handleCellClick = (rowIndex: number, cellIndex: number, cellValue: playerMove) => {
        if (cellValue) {
            alert('This cell is taken');
            return;
        }
        if (!isXNext) alert('Not your turn');

        const newBoard = [...board.map(item => [...item])];
        newBoard[rowIndex][cellIndex] = 'X';
        //TODO: check win
        localSDK.engine().nextMove(newBoard).then((board) => {
            setBoard(board);
            setIsXNext(!isXNext);

            //TODO: check win
        });
    }
    return (
        <div className="board-container">
            {board.map((row, rowIndex) =>
                <div className="board-row" key={rowIndex}>
                    {row.map((cell, cellIndex) => <Cell key={cellIndex} cellValue={cell} handleCellClick={handleCellClick.bind(this, rowIndex, cellIndex, cell)} />)}
                </div>
            )}
        </div>
    );

};

export default Board;