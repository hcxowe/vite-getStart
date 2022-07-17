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

## 类

> protected public private static get set extends

```ts
class Person {
    static max: number = 100

    public name: string
    public age: number
    
    // readonly 只能初始化或构造函数中赋值
    readonly height: number = 176

    // protected 只能在子类中访问
    protected constructor(name: string, age: number) { 
        this.name = name
        this.age  = age
    }

    public say(msg: string) { 
        console.log(`${ this.name } say: ${ msg }`)
    }

    private run(distance: number) { 
        console.log(`${ this.name } run: ${ distance }`)
    }

    // 存取器
    private _fullName: string

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        this._fullName = newName
    }
}

class Man extends Person { 
    private combatEffectiveness: number

    constructor(name, age) { 
        super(name, age)

        this.combatEffectiveness = 50
    }
}

class Woman extends Person { 
    private beauty: number

    constructor(name, age) { 
        super(name, age)

        this.beauty = 50
    }
}

new Person('hcx', 30)
new Man('hcx', 30)
```

#### 抽象类

> 抽象类做为其它派生类的基类使用，不能创建一个抽象类的实例

```ts
abstract class Animal {
    // 抽象方法不包含实现，需要在派生类中实现
    abstract makeSound(): void

    move(): void {
        console.log('roaming the earch...')
    }
}

class Cat extends Animal {
    makeSound() {
        console.log('miao miao~')
    }
}
```

#### 把类当做接口使用

```ts
class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
```

## 函数

```ts
// 基本函数定义
function add(x: number, y: number): number {
    return x + y
}

// 可选参数
function buildName1(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName
    else
        return firstName
}

// 默认参数
function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName
}

// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值
function buildName3(firstName = "Will", lastName: string) {
    return firstName + " " + lastName
}

buildName3(undefined, "Adams")

// 剩余参数
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ")
}

// this参数
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // 方法预期在Deck类型变量上调用
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52)
            let pickedSuit = Math.floor(pickedCard / 13)

            return {suit: this.suits[pickedSuit], card: pickedCard % 13}
        }
    }
}
```

#### 重载

```ts
// 为同一个函数提供多个函数类型定义来进行函数重载
function pickCard(x: { suit: string; card: number; }[]): number
function pickCard(x: number): { suit: string; card: number; }
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }
}
```

## 泛型

> 

```ts
function identity<T>(arg: T): T {
    return arg;
}

// 泛型类型
interface GenerFn {
    <T>(arg: T): T
}

let myIdentity: GenericIdentityFn = identity

// 作为整个接口的一个类型参数
interface GenerFn<T> {
    (arg: T): T
}

let myIdentity: GenericIdentityFn<number> = identity
```

#### 泛型类

> 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型


```ts
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}
```

#### 泛型约束

```ts
// 使用这个接口和extends关键字来实现约束
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}
```

```ts
// 泛型里使用类类型
function create<T>(c: { new(): T }): T {
    return new c()
}
```

## 枚举

> 枚举可以定义一些带名字的常量

#### 数字枚举

> 不带初始化器的枚举, 数字枚举被放在第一的位置，或者被放在使用了数字常量或其它常量初始化了的枚举后面

```ts
// 默认从0开始自增长
enum Direction {
    Up,
    Down,
    Left,
    Right
}

// 使用
Direction.Up
```

#### 字符串枚举

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

#### 联合枚举

> 当所有枚举成员都拥有字面量枚举值时，它就带有了一种特殊的语义: 枚举成员成为了类型; 枚举类型本身变成了每个枚举成员的联合;

#### 反向映射

> 不会为字符串枚举成员生成反向映射

```ts
enum Enum {
    A
}

let a = Enum.A
let nameOfA = Enum[a]  // "A"
```

#### const枚举

> 常量枚举只能使用常量枚举表达式, 它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来

#### 外部枚举

```ts
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```