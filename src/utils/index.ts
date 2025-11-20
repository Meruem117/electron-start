import type { Board, Shape, Tetromino } from '../types'
import { BOARD_HEIGHT, BOARD_WIDTH, TETROMINO_LIST, TETROMINO_MAP } from '../constants'

export const createEmptyBoard = (): Board => {
    return Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(0))
}

export const randomTetromino = (): Tetromino => {
    const key = TETROMINO_LIST[Math.floor(Math.random() * TETROMINO_LIST.length)]
    return TETROMINO_MAP[key]
}

export const rotateShape = (tetromino: Tetromino): Shape => {
    return tetromino.shape[0].map((_, index) =>
        tetromino.shape.map(row => row[index]).reverse()
    )
}

export const completeShape = (shape: Shape, len: number): Shape => {
    const result: Shape = []
    for (let i = 0; i < len; i++) {
        result[i] = []
        for (let j = 0; j < len; j++) {
            if (i < shape.length && j < shape[i].length && shape[i][j] !== undefined) {
                result[i][j] = shape[i][j]
            } else {
                result[i][j] = 0
            }
        }
    }
    return result
}
