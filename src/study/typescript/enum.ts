/* 枚举 */
enum Color {
    RED = 1,
    GREEN,
    BLUE
}

let color: Color = Color.BLUE

/* 字符串枚举 */
enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'RIGHT',
    RIGHT = 'LEFT'
}

/* 常量枚举 */
const enum Enum {
    A = 1,
    B = A * 2
}

/* 外部枚举 */
declare enum Enum1 {
    A = 1,
    B,
    C = 2
}


export {}