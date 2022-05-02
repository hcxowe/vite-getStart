// 简单的类
class Simple {
    className: string

    constructor(name: string) {
        this.className = name
    }

    sayName(): string {
        return this.className
    }
}

let cls = new Simple('hcxowe')
cls.sayName()

/* 继承 */
// 超类
class Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }

    move(distance: number) {
        console.log(`Animal move ${distance}m`)
    }
}

// 子类
class Cat extends Animal {
    constructor() {
        // 在构造函数里访问 this的属性之前，一定要调用 super()
        super('cat')
    } 

    // 重写父类方法
    move(distance = 10): void {
        console.log('cat...')
        super.move(distance)
    }

    // 子类自己的方法
    bark() {
        console.log('miao miao!')
    }
}

let cat = new Cat()
let whatname = cat.name
cat.move(100)
cat.bark()


/* 共有，私有，保护修饰符，只读*/
class Person {
    public name: string         // 默认为 public
    protected age: number             
    private sex: string
    readonly msg: string        //  只读属性必须在声明时或构造函数里被初始化

    // 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
    protected constructor(name: string) {
        this.name = name
        this.msg = 'i am readonly!'
    }

    public sayHello(): string {
        return `${this.name}: hello!`
    }

    run(distance: number): string {
        return `${this.name} run ${distance}m`
    }

    public saySex(): string {
        return this.sex
    }
}

// let person = new Person()

class Man extends Person {
    constructor(name: string) {
        super(name)
    }

    public saySex(): string {
        // return this.sex     // 不能访问父类中的私有成员
        return ''
    }

    sayAge() {
        return this.age     // 可以访问父类中的受保护成员
    }
}

class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) { // 构造函数中声明只读成员，其他类型成员同理

    }
}

/* 存取器 */
class Employee {
    private _fullName: string

    get fullName(): string {
        return this._fullName
    }

    set fullName(newName: string) {
        this._fullName = newName
    }
}

/* 静态成员 */
class Grid {
    static origin = {x: 0, y: 0}
}

let org = Grid.origin

/* 抽象类 */
// 抽象类做为其它派生类的基类使用
abstract class Car {
    constructor(public name: string) {

    }

    abstract speedUp(): number

    showCarName(): string {
        return this.name
    }
}

class BYDsong extends Car {
    constructor() {
        super('song')
    }

    speedUp(): number {
        return 7.3
    }
}

/* 把类当做接口使用, 能够在允许使用接口的地方使用类 */
class Point {
    x: number
    y: number
}

interface Point3d extends Point {
    z: number
}

export {}