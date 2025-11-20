import { useState, useEffect, useCallback } from 'react'
import type { Board, Tetromino, Position, Status } from '../types'
import { createEmptyBoard, randomTetromino, rotateShape } from '../utils'
import { BOARD_WIDTH, BOARD_HEIGHT, SCORE_RATE } from '../constants'

export const useTetris = () => {
    const [board, setBoard] = useState<Board>(createEmptyBoard())
    const [currentTetromino, setCurrentTetromino] = useState<Tetromino | null>(null)
    const [nextTetromino, setNextTetromino] = useState<Tetromino | null>(null)
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    const [gameStatus, setGameStatus] = useState<Status>('over')
    const [score, setScore] = useState<number>(0)

    // 初始化游戏
    const initGame = useCallback(() => {
        setBoard(createEmptyBoard())
        setCurrentTetromino(randomTetromino())
        setNextTetromino(randomTetromino())
        setPosition({ x: BOARD_WIDTH / 2 - 1, y: 0 })
        setGameStatus('playing')
        setScore(0)
    }, [])

    // 生成新方块
    const spawnNewTetromino = useCallback(() => {
        if (nextTetromino) {
            setCurrentTetromino(nextTetromino)
            setNextTetromino(randomTetromino())
            setPosition({ x: BOARD_WIDTH / 2 - 1, y: 0 })
        }
    }, [nextTetromino])

    // 碰撞检测
    const checkCollision = (tetromino: Tetromino, x: number, y: number): boolean => {
        for (let row = 0; row < tetromino.shape.length; row++) {
            for (let col = 0; col < tetromino.shape[row].length; col++) {
                if (tetromino.shape[row][col] !== 0) {
                    const newX = x + col
                    const newY = y + row
                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                        return true
                    }
                    if (newY >= 0 && board[newY][newX] !== 0) {
                        return true
                    }
                }
            }
        }
        return false
    }

    // 固定方块到棋盘
    const mergeTetrominoToBoard = useCallback(() => {
        if (!currentTetromino) return
        const newBoard = [...board]
        for (let row = 0; row < currentTetromino.shape.length; row++) {
            for (let col = 0; col < currentTetromino.shape[row].length; col++) {
                if (currentTetromino.shape[row][col] !== 0) {
                    const y = position.y + row
                    const x = position.x + col
                    if (y >= 0) {
                        newBoard[y][x] = currentTetromino.shape[row][col]
                    }
                }
            }
        }
        setBoard(newBoard)
    }, [board, currentTetromino, position])

    // 消除行
    const clearLines = useCallback(() => {
        let linesCleared = 0
        const newBoard = board.filter(row => {
            if (row.every(cell => cell !== 0)) {
                linesCleared++
                return false
            }
            return true
        })
        // 在顶部添加新行
        for (let i = 0; i < linesCleared; i++) {
            newBoard.unshift(Array(BOARD_WIDTH).fill(0))
        }
        setBoard(newBoard)
        setScore(prev => prev + linesCleared * SCORE_RATE)
    }, [board])

    // 游戏循环      
    useEffect(() => {
        if (gameStatus !== 'playing') return
        const gameLoop = () => {
            if (!currentTetromino) {
                spawnNewTetromino()
                return
            }
            // 每秒向下移动
            const newY = position.y + 1
            if (!checkCollision(currentTetromino, position.x, newY)) {
                setPosition(prev => ({ ...prev, y: newY }))
            } else {
                mergeTetrominoToBoard()
                clearLines()
                spawnNewTetromino()
            }
        }
        const interval = setInterval(gameLoop, 1000)
        return () => clearInterval(interval)
    }, [currentTetromino, gameStatus, position, spawnNewTetromino, mergeTetrominoToBoard, clearLines])

    // 向左移动
    const moveLeft = useCallback(() => {
        if (!currentTetromino || gameStatus !== 'playing') return
        const newX = position.x - 1
        if (!checkCollision(currentTetromino, newX, position.y)) {
            setPosition(prev => ({ ...prev, x: newX }))
        }
    }, [currentTetromino, gameStatus, position])

    // 向右移动
    const moveRight = useCallback(() => {
        if (!currentTetromino || gameStatus !== 'playing') return
        const newX = position.x + 1
        if (!checkCollision(currentTetromino, newX, position.y)) {
            setPosition(prev => ({ ...prev, x: newX }))
        }
    }, [currentTetromino, gameStatus, position])

    // 向下移动
    const moveDown = useCallback(() => {
        if (!currentTetromino || gameStatus !== 'playing') return
        const newY = position.y + 1
        if (!checkCollision(currentTetromino, position.x, newY)) {
            setPosition(prev => ({ ...prev, y: newY }))
        }
    }, [currentTetromino, gameStatus, position])

    // 旋转方块
    const rotate = useCallback(() => {
        if (!currentTetromino || gameStatus !== 'playing') return
        const rotatedTetromino = { ...currentTetromino, shape: rotateShape(currentTetromino) }
        if (!checkCollision(rotatedTetromino, position.x, position.y)) {
            setCurrentTetromino(rotatedTetromino)
        }
    }, [currentTetromino, gameStatus, position])

    // 暂停游戏
    const pause = useCallback(() => {
        setGameStatus(prev => (prev === 'playing' ? 'paused' : 'playing'))
    }, [])

    // 键盘事件
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameStatus === 'over') return
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault()
                    moveLeft()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    moveRight()
                    break
                case 'ArrowDown':
                    e.preventDefault()
                    moveDown()
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    rotate()
                    break
                case 'P':
                case 'p':
                    e.preventDefault()
                    pause()
                    break
                default:
                    break
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameStatus, moveLeft, moveRight, moveDown, rotate, pause])

    return {
        board,
        currentTetromino,
        nextTetromino,
        position,
        gameStatus,
        score,
        initGame,
        moveLeft,
        moveRight,
        moveDown,
        rotate,
        pause
    }
}
