import React, { Fragment } from 'react'
import type { Status } from '../types'

interface InfoBoardProps {
    score: number
    gameStatus: Status
    onPause: () => void
    onRestart: () => void
}

const InfoBoard: React.FC<InfoBoardProps> = ({ score, gameStatus, onPause, onRestart }) => {
    return (
        <Fragment>
            <div className="info-board">
                <div className="info-board-score">
                    <span>Score:</span>
                    <span>{score}</span>
                </div>
                <div className="info-board-btn" onClick={onPause}>{gameStatus === 'playing' ? '暂停' : '开始游戏'}</div>
                <div className="info-board-btn" onClick={onRestart}>重新开始</div>
            </div>
            <div className="info-board">
                <div className="info-board-text">← → : 左右移动方块</div>
                <div className="info-board-text">↑ : 旋转方块</div>
                <div className="info-board-text">↓ : 加速下落</div>
                <div className="info-board-text">P : 暂停</div>
            </div>
        </Fragment>
    )
}

export default InfoBoard
