## 基础类型

```ts
let isShow: boolean = false
let num: number = 1
let str: string = 'hello'

// 数组
let ary: number[] = [1, 2, 3]
let ary1: Array<string> = ['h', 'c', 'x']

// 元组
let tuple: [string, number] = ['name', 99]

// 枚举
enum Color {
    RED,
    GREEN,
    BLUE
}

// Any
let anything: any = 1
let anyAry: any[] = [1, 'ee', true]

// Void 它表示没有任何类型, 只能为它赋予 undefined 和 null，基本用语没有返回值的函数
function warnUser(): void {
    console.log("This is my warning message");
}

// Undefined, Null; null 和 undefined 是所有类型的子类型; 指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined
let n: null = null

// Never 表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message)
}

// Object 非原始类型
declare function create(o: object | null): void
```

## 类型断言

> 在TypeScript里使用JSX时，只有 as语法断言是被允许的

```ts
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length
let strLength: number = (someValue as string).length
```

## 接口

> 接口的作用是为类型命名和为代码定义契约

```ts
interface Person {
    name: string
    age: number
    height?: number
    readonly birthday: string
    [other: string]: any
}

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean
}

let person: Person = null

person.age = 20
person.name = 'hcxowe'

let func: SearchFunc = (source, target): boolean => { 
    return source.includes(target)
}

// 可索引的类型
interface StringArray {
    [index: number]: string
}

let myArray: StringArray
myArray = ["Bob", "Fred"]

let myStr: string = myArray[0]

// 索引只读，防止给索引赋值
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!

/* 类类型 */

// 接口实现
interface ClockInterface {
    currentTime: Date
    setTime(d: Date)
}

class Clock implements ClockInterface {
    currentTime: Date

    setTime(d: Date) {
        this.currentTime = d;
    }

    constructor(h: number, m: number) { }
}

// 当一个类实现了一个接口时，只对其实例部分进行类型检查，因此应该直接操作类的静态部分
interface ClockConstructor {
    new (hour: number, minute: number)
}

// 报错：Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'
class Clock implements ClockConstructor {
    currentTime: Date
    constructor(h: number, m: number) { }
}

// 继承接口
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape, PenStroke {
    sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10
square.penWidth = 5.0

/* 混合类型 */
// 一个对象可以同时做为函数和对象使用，并带有额外的属性
// 在使用JavaScript第三方库的时候，可能需要像下面那样去完整地定义类型
interface Counter {
    (start: number): string
    interval: number
    reset(): void
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { }
    counter.interval = 123
    counter.reset = function () { }
    return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

/* 接口继承类 */
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现; 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样
class Control {
    private state: any
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control implements SelectableControl { 
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
// 因为 state是私有成员， 只能够是Control的子类们才能实现SelectableControl接口
class Image implements SelectableControl {
    select() { }
}
```