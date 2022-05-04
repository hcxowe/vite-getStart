/* 高级类型 */


/* 交叉类型 */
// 交叉类型是将多个类型合并为一个类型。 交叉类型的对象同时拥有了被交叉类型的成员
function extend<T, U>(first: T, second: U): U & T {
    let ret: U & T = <U & T>{}
    return ret
}


/* 联合类型 */
// 联合类型表示一个值可以是几种类型之一
let numStr: string | number
numStr = 1
numStr = 'hcx'


/* 类型保护 */
function isNumber(param: string | number): param is number {
    return typeof param === 'number'
}

if (isNumber(numStr)) {
    numStr = numStr.toFixed(2)
} else {
    numStr = numStr.slice(0, 2)
}

/* typeof类型保护 */
if (typeof numStr === 'number') {
    numStr = numStr.toFixed(2)
} else {
    numStr = numStr.slice(0, 2)
}

/* instanceof类型保护 */
class Man {
    constructor(public name: string) {
        
    }
}

class Woman {
    constructor(public name: string) {
        
    }
}

let man = new Man('lucus')
let woman = new Woman('lilisi')

if (man instanceof Man) {

}

if (woman instanceof Man) {

}

// --strictNullChecks标记：当你声明一个变量时，它不会自动地包含 null或 undefined
// --strictNullChecks，可选参数会被自动地加上 | undefined
/* 
如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 
语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined： 
*/


/* 类型别名 */
// 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
type Container<T> = { value: T }
type Tree<T> = {
    value: T
    left: Tree<T>
    right: Tree<T>
}

let name: NameOrResolver
let name1: Name = 'hcxowe'
let container: Container<string> = { value: 'lucas' }


/* 字符串字面量类型 */
type Easing = "ease-in" | "ease-out" | "ease-in-out"

/* 数字字面量类型 */
type SmallNumber = 1 | 2 | 3
let sm: SmallNumber = 4


/* 可辨识联合 */
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

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size
        case "rectangle": return s.height * s.width
        case "circle": return Math.PI * s.radius ** 2
    }
}

let rect: Shape = { kind: 'square', size: 10 }
area(rect)


/* this类型 */
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}

let calculator = new BasicCalculator(10)
calculator.add(10).multiply(10).currentValue()



/* 索引类型 */
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
    return names.map(n => o[n])
} 

interface Person {
    name: string
    age: number
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name'])

// 索引类型查询操作符 keyof T 结果为 T上已知的公共属性名的联合
let personProps: keyof Person // 'name' | 'age'

// 索引访问操作符 T[K]



/* 映射类型 */
// 在映射类型里，旧类型里每个属性以相同的形式转换成新类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}

type Partial<T> = {
    [P in keyof T]?: T[P]
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type Record<K extends string, T> = {
    [P in K]: T
}

interface Person {
    name: string
    age: number
}

type PersonReadonly = Readonly<Person>
type PersonPartial  = Partial<Person>


/* 预定义的有条件类型 */
// Exclude<T, U>   -- 从T中剔除可以赋值给U的类型
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">  // "b" | "d"

// Extract<T, U>   -- 提取T中可以赋值给U的类型
type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">  // "a" | "c"

// NonNullable<T>  -- 从T中剔除null和undefined
type T04 = NonNullable<string | number | undefined>;  // string | number

// ReturnType<T>   -- 获取函数返回值类型
function f1(s: string) {
    return { a: 1, b: s }
}

type T10 = ReturnType<() => string>         // string
type T11 = ReturnType<(s: string) => void>  // void
type T14 = ReturnType<typeof f1>  // { a: number, b: string }

// InstanceType<T> -- 获取构造函数类型的实例类型
class C {
    x = 0
    y = 0
}
type T20 = InstanceType<typeof C>  // C



export {}