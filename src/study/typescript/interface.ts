// 基本接口定义
interface Student {
    name: string,
    age: number,
    aihao?: string,             // 可选属性
    readonly score: number,     // 只读属性
    [other: string]: any        // 允许其他属性
}

/* 函数类型接口 */
interface findFunc {
    (keyword: string): boolean
}

let findStr: findFunc = function(str: string): boolean {
    return !!~str.indexOf('cx')
}

/* 可索引的类型接口 */
// 数字索引的返回值必须是字符串索引返回值类型的子类型
interface StringArray {
    [index: number]: string,
    length: number,
}

let strAry: StringArray = ['aa', 'bb', 'cc']
let size:number = strAry.length

/* 类类型接口 */
interface Animal {
    name: string;
    jump(param: string): boolean;
}

class Dog implements Animal {
    name: string;

    jump(param: string): boolean {
        return !!param
    }

    constructor() {
        this.name = 'dog'
    }
}

// 构造器签名
interface PersonConstructor {
    new (name: string, age: number): PersonInterface;
}

interface PersonInterface {
    sayname(): string;
}

function createPerson(person: PersonConstructor, name: string, age: number): PersonInterface {
    return new person(name, age)
}

class Man implements PersonInterface {
    name: string;
    age: number;
    sex: string;

    sayname(): string {
        return this.name
    }

    constructor(name: string, age: number) {
        this.name = name
        this.age  = age
        this.sex  = '男性'
    }
}

class WoMan implements PersonInterface {
    name: string;
    age: number;
    sex: string;

    sayname(): string {
        return this.name
    }

    constructor(name: string, age: number) {
        this.name = name
        this.age  = age
        this.sex  = '女性'
    }
} 

let lili = createPerson(WoMan, 'lilisi', 22)
let anan = createPerson(Man, 'jianan', 30)


/* 接口继承 */
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

/* 混合类型 */
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
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
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

export {}