/* 定义函数 */
function add(a: number, b: number): number {
    return a + b
}

let add2: (x: number, y: number) => number = function(a: number, b: number): number {
    return a + b
}

/* 可选参数与默认参数 */
function foo(a: number = 10, b?: number): number {
    return a + (b || 0)
}

// 必须明确的传入 undefined值来获得默认值
foo(undefined, 10)


/* 剩余参数 */
function bar(a: number, ...rest: number[]): number {
    return rest.reduce(function(sum, x) {
        return sum + x
    }, a)
}

/* this参数 */
interface Card {
    suit: string
    card: number
}

interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // 显示指定函数中的this类型，this参数是个假的参数，它出现在参数列表的最前面
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13)

            return {suit: this.suits[pickedSuit], card: pickedCard % 13}
        }
    }
}


/* 重载：为同一个函数提供多个函数类型定义来进行函数重载 */
function showSelf(size: number): string
function showSelf(name: string): string
function showSelf(param: any): any {
    if (typeof param == 'number') {
        return 'showSelf(size: number)'
    } 

    if (typeof param == 'string') {
        return 'showSelf(name: string)'
    }
}

showSelf(1)


export {}