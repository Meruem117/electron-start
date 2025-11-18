import type { Tetromino } from '../types/index.d'

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const SCORE_RATE = 100

export const TETROMINO_LIST = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
export const TETROMINO_MAP: { [key: string]: Tetromino } = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: 'cyan'
    },
    J: {
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        color: 'blue'
    },
    L: {
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        color: 'orange'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: 'yellow'
    },
    S: {
        shape: [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: 'green'
    },
    T: {
        shape: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        color: 'purple'
    },
    Z: {
        shape: [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: 'red'
    }
}
