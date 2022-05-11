/* 泛型 */
function identy<T>(param: T): T {
    return param
}

identy<string>('generics')
identy(123)

/* 泛型接口 */
interface GenericsFun {
    <T>(arg: T): T
}

interface GenericsFun1<T> {
    (arg: T): T
}

let identyCopy: GenericsFun = identy
let identyCopy1: GenericsFun1<string> = identy

// identyCopy1(123)

// 无法创建泛型枚举和泛型命名空间

/* 泛型类 */
// 泛型类指的是实例部分的类型，类的静态属性不能使用泛型类型
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y }   // 自动推导类型

/* 泛型约束 */
interface Lengthwise {
    length: number
}

// 通过接口约束泛型参数
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    let length = arg.length  
    return arg
}

// 属性约束
function getProperty<T, K extends keyof T>(obj: T, key: K): any {
    return obj[key]
}

// 泛型创建工厂函数，需要引用构造函数的类类型
function create<T>(c: { new(): T }): T {
    return new c()
}


export {}