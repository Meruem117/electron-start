import React, { useMemo } from 'react'
import type { Board, Tetromino, Position } from '../types'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants'

interface BoardProps {
    board: Board
    currentTetromino?: Tetromino | null
    position?: Position
}

const GameBoard: React.FC<BoardProps> = ({ board, currentTetromino, position }) => {
    // 绘制当前下落的方块
    const displayBoard = useMemo(() => {
        const boardCopy = board.map(row => [...row])
        if (currentTetromino && position) {
            for (let row = 0; row < currentTetromino.shape.length; row++) {
                for (let col = 0; col < currentTetromino.shape[row].length; col++) {
                    if (currentTetromino.shape[row][col] !== 0) {
                        const y = position.y + row
                        const x = position.x + col
                        if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
                            boardCopy[y][x] = currentTetromino.shape[row][col]
                        }
                    }
                }
            }
        }
        return boardCopy
    }, [board, currentTetromino, position])

    return (
        <div className="board" style={{ gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)` }}>
            {displayBoard.flat().map((cell, index) => (
                <div
                    key={index}
                    className={`cell color-${cell}`}
                />
            ))}
        </div>
    )
}

export default GameBoard
