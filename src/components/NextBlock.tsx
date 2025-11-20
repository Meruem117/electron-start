import React from 'react'
import type { Tetromino } from '../types'
import { completeShape } from '../utils'

interface NextBlockProps {
    nextTetromino: Tetromino | null
}

const NextBlock: React.FC<NextBlockProps> = ({ nextTetromino }) => {
    const emptyArray = Array.from({ length: 4 }, () => new Array(4).fill(0))

    return (
        <div className="next-block">
            <div className="next-block-title">Next</div>
            <div className="next-block-box">
                {(nextTetromino ? completeShape(nextTetromino.shape, 4) : emptyArray).map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <div
                            key={`${rowIndex}-${cellIndex}`}
                            className={`cell color-${cell}`}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default NextBlock;
