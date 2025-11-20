import React, { Fragment, useState } from 'react'
import GameBoard from '../components/GameBoard'
import NextBlock from '../components/NextBlock'
import InfoBoard from '../components/InfoBoard'
import { useTetris } from '../hooks/useTetris'
import '../styles/index.css'

const Tetris: React.FC = () => {
    const {
        board,
        currentTetromino,
        nextTetromino,
        position,
        gameStatus,
        score,
        initGame,
        pause
    } = useTetris()
    const [isStart, setIsStart] = useState<boolean>(false)

    const onPause = (): void => {
        if (isStart) {
            pause()
        } else {
            initGame()
            setIsStart(true)
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="container-left">
                    <GameBoard board={board} currentTetromino={currentTetromino} position={position} />
                </div>
                <div className="container-right">
                    <NextBlock nextTetromino={nextTetromino} />
                    <InfoBoard score={score} gameStatus={gameStatus} onPause={onPause} onRestart={initGame} />
                </div>
            </div>
        </Fragment>
    );
};

export default Tetris;
