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

## 类型推论

#### 没有明确指出类型的地方, TS会自动进行类型推导
```ts
let x = 3 // => let x: number = 3
let x = [0, 1, null] // => let x: Array<number | null> = [0, 1, null]
```

#### TS会按上下文进行类型推导
```ts
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  //<- Error
}
```
## 类型兼容性

> TypeScript里的类型兼容性是基于结构子类型的。 结构类型是一种只使用其成员来描述类型的方式

1. TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性

2. 函数：先比较参数，找到同类型参数；比较返回值，找到结构型包含关系

    ```ts
    let x = (name: string, age: number) => ({ name: 'Alice' })
    let y = (n: string) => ({ name: 'Alice', age: 10 })

    x = y // OK
    y = x // Error
    ```

3. 枚举：枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的

4. 类： 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内

5. 泛型：对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较；指定了类型的只影响使用其做为类型一部分的结果类型；

## 高级类型

#### 交叉类型

> 交叉类型是将多个类型合并为一个类型

```ts
interface Type1 { 
    name: string
}

interface Type2 { 
    age: number
}

let xxxxx: Type1 & Type2 = {
    name: 'hcxowe',
    age: 10
}
```

#### 联合类型

> 联合类型表示一个值可以是几种类型之一

```ts
let something: string | number | boolean

something = 'hcxowe'
something = 10
something = true

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Bird {
    // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim();   // errors
```

#### 类型谓词

```ts
interface Bird {
    fly()
    layEggs()
}

interface Fish {
    swim()
    layEggs()
}

function getSmallPet(): Fish | Bird {
    // ...
}

function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined
}

let pet = getSmallPet()


// TypeScript不仅知道在 if分支里 pet是 Fish类型； 
// 它还清楚在 else分支里，一定 不是 Fish类型，一定是 Bird类型
if (isFish(pet)) {
    pet.swim()
}
else {
    pet.fly()
}
```

#### typeof类型保护

> typeof类型保护: 只有两种形式能被识别： typeof v === "typename"和 typeof v !== "typename"， "typename"必须是 "number"， "string"， "boolean"或 "symbol"

```ts
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value
    }

    if (typeof padding === "string") {
        return padding + value
    }

    throw new Error(`Expected string or number, got '${padding}'.`)
}
```

#### instanceof类型保护

```ts
interface Parent { 
    getName(): string
}

class Son implements Parent { 
    constructor(public name: string) { }

    getName() { 
        return this.name + ' son'
    }
}

class Daughter implements Parent { 
    constructor(public name: string) { }

    getName() { 
        return this.name + ' daughter'
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new Son('xuan') :
        new Daughter('xiao');
}

let person: Parent = getRandomPadder()

if (person instanceof Son) {
    // 类型细化为 'Son'
}
if (person instanceof Daughter) {
    // 类型细化为'Daughter'
}
```

#### 可以为null的类型

> 类型检查器认为 null与 undefined可以赋值给任何类型

> --strictNullChecks：当你声明一个变量时，它不会自动地包含 null或 undefined。 必须使用联合类型明确的包含它们

```ts
let x: string | null = null
```

> 使用了 --strictNullChecks，可选参数/可选属性会被自动地加上 | undefined

```ts
function f(x: number, y?: number) {
    return x + (y || 0);
}

f(1, undefined)

class C {
    a: number
    b?: number
}

let c = new C()
c.a = 12
c.a = undefined
```

> 添加 !后缀： identifier! 从 identifier的类型里去除了 null和 undefined

#### 类型别名

> 类型别名会给一个类型起个新名字

```ts
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver

type Container<T> = { value: T }
```

#### 字符串字面量类型

> 字符串字面量类型允许你指定字符串必须的固定值

```ts
type Easing = "ease-in" | "ease-out" | "ease-in-out"

function animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
        // ...
    }
    else if (easing === "ease-out") {
    }
    else if (easing === "ease-in-out") {
    }
    else {
        // error! should not pass null or undefined.
    }
}
```

#### 数字字面量类型

```ts
type Type = 1 | 2 | 3 | 4 | 5 | 6
```

#### 枚举成员类型

> 当每个枚举成员都是用字面量初始化的时候枚举成员是具有类型的

#### 可辨识联合

它具有3个要素：
1. 具有普通的单例类型属性— 可辨识的特征
2. 一个类型别名包含了那些类型的联合— 联合
3. 此属性上的类型保护

```ts
interface Square {
    kind: "square"
    size: number
}
interface Rectangle {
    kind: "rectangle"
    width: number
    height: number
}
interface Circle {
    kind: "circle"
    radius: number
}

type Shape = Square | Rectangle | Circle

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x)
}

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size
        case "rectangle": return s.height * s.width
        case "circle": return Math.PI * s.radius ** 2
        default: return assertNever(s) // 完整性检查
    }
}

// kind属性称做 可辨识的特征
// Shape 类型别名联合相关类型
```

#### 多态的 this 类型

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value
    }
    public add(operand: number): this {
        this.value += operand
        return this
    }
    public multiply(operand: number): this {
        this.value *= operand
        return this
    }
}

let v = new BasicCalculator(2)
            .multiply(5)
```

#### 索引类型

> 索引类型，编译器就能够检查使用了动态属性名的代码

> keyof T 索引类型查询操作符, 结果为 T 上已知的公共属性名的联合

> T[K] 索引访问操作符

```ts
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
}
```

#### 映射类型

> 在映射类型里，新类型以相同的形式去转换旧类型里每个属性

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}

type Partial<T> = {
    [P in keyof T]?: T[P]
}

type Nullable<T> = { 
    [P in keyof T]: T[P] | null 
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type Record<K extends string, T> = {
    [P in K]: T
}
```

#### 预定义的有条件类型

```ts
Exclude<T, U>   // 从T中剔除可以赋值给U的类型

Extract<T, U>   // 提取T中可以赋值给U的类型

NonNullable<T>  // 从T中剔除null和undefined

ReturnType<T>   // 获取函数返回值类型

InstanceType<T> // 获取构造函数类型的实例类型
```