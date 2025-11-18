export type Board = number[][]

export type Shape = number[][]

export interface Tetromino {
    shape: Shape,
    color?: string
}

export type Position = {
    x: number,
    y: number
}

export type Status = 'playing' | 'paused' | 'over'
