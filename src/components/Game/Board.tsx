import React, { useState } from 'react';
import { localSDK } from '../../sdk';
import { board, playerMove } from '../../sdk/controllers/user/IEngine';
import Cell from './Cell';
import { Backdrop, Button, CircularProgress } from '@material-ui/core';
import { calculateWinner } from '../../util/gameHelper';


type Props = {
}
const initBoard: board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
const Board = ({ }: Props) => {
    const [board, setBoard] = useState(initBoard);
    const [loader, setLoader] = useState(false);
    const [winner, setWinner] = useState<playerMove | 'TIE' | undefined>();

    const handleWinner = (board: board) => {
        const winner = calculateWinner(board);
        if (winner) {
            setWinner(winner);
            return true;
        }
        return false;
    }

    const handleCellClick = (rowIndex: number, cellIndex: number, cellValue: playerMove) => {
        if (cellValue) {
            alert('This cell is taken');
            return;
        }
        setLoader(true);
        const newBoard = [...board.map(item => [...item])];
        newBoard[rowIndex][cellIndex] = 'X';

        if (handleWinner(newBoard)) return;

        localSDK.engine().nextMove(newBoard).then((board) => {
            if (board) {
                setBoard(board);
                handleWinner(board);
            }
            else {
                setWinner('TIE');
            }

        }).finally(() => {
            setLoader(false);
        });
    }
    return (
        <>
            <Backdrop open={loader} style={{ zIndex: 2 }}>
                <CircularProgress color="primary" />
            </Backdrop>
            <div className="board-container">
                {winner && <h2 style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', minHeight: '20px' }}>
                    {winner !== 'TIE' ? <>
                        <span>Winner is  </span>
                        <span className="material-icons">
                            {winner === 'X' ? 'close' : 'circle'}</span>
                    </> : <span>This is a Tie , try again</span>}
                    <Button onClick={() => {
                        setBoard(initBoard);
                        setWinner(undefined);
                    }} style={{ position: 'absolute', top: '0', right: '0' }}>Reset</Button>
                </h2>}
                {board.map((row, rowIndex) =>
                    <div className="board-row" key={rowIndex}>
                        {row.map((cell, cellIndex) => <Cell key={cellIndex} cellValue={cell} handleCellClick={handleCellClick.bind(this, rowIndex, cellIndex, cell)} />)}
                    </div>
                )}
            </div>
        </>
    );

};

export default Board;