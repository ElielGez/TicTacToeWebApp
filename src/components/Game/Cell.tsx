import React, { useState } from 'react';
import { board, playerMove } from '../../sdk/controllers/user/IEngine';


type Props = {
    cellValue: playerMove;
    handleCellClick: () => void;
}
const Cell = ({ cellValue, handleCellClick }: Props) => {
    return (
        <div className="board-cell" onClick={() => handleCellClick()}>{cellValue}</div>
    );
};

export default Cell;