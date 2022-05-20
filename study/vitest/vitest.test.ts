import { test, expect, assert, describe, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'

test('Math.sqrt', () => {
    expect(Math.sqrt(4)).toBe(2)
})

// 跳过运行某些测试，但由于一些原因不想删除代码
test.skip('skipped', () => {
    assert.equal(Math.sqrt(16), 5)
})

// 在给定测试套件中运行某些测试
test.skip('onlytest', () => {
    assert.equal(Math.sqrt(16), 5)
})

// test.concurrent 会将连续的多个测试并发运行
describe("suite", () => {
    test("serial test", async() => { /* ... */ })
    test.concurrent("concurrent test 1", async() => { 
        let ret = await new Promise(resolve => {
            setTimeout(() => {
                resolve('test1 done')
            })
        })

        expect(ret).toBe('success')
    })

    test.concurrent("concurrent test 2", async({ expect }) => { 
        let ret = await new Promise(resolve => {
            setTimeout(() => {
                resolve('success')
            })
        })

        expect(ret).toBe('success')
    })
})

// 使用 test.todo 将稍后实现的测试进行存档。测试报告中将显示一个记录，以便你知道还多少条未实现的测试
test.todo("unimplemented test")

// test.fails 表示断言将显式失败
const myAsyncFunc = () => new Promise((resolve) => resolve(1))
test.fails("fail test", () => {
    expect(myAsyncFunc()).rejects.toBe(1)
})

// 当你需要使用不同的变量运行相同的测试时，可以使用 test.each
/* 
    %s：字符串
    %d：数值
    %i：整数
    %f：小数
    %j：json格式
    %o：对象
    %#：对应的测试参数下标
    %%：单个百分比符号 ('%')
 */
test.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => {
    expect(a + b).toBe(expected)
})
// this will return
// √ add(1, 1) -> 2
// √ add(1, 2) -> 3
// √ add(2, 1) -> 3

// describe 在当前上下文中定义一个新的测试套件，将其看作一组相关测试或者有别于其它的嵌套测试套件。测试套件可让你组织你的测试用例，使报告更清晰。
const person = {
    isActive: true,
    age: 32
}

describe('person', () => {
    test('person is defined', () => {
        expect(person).toBeDefined()
    })

    test('is active', () => {
        expect(person.isActive).toBeTruthy()
    })

    test('age limit', () => {
        expect(person.age).toBeLessThanOrEqual(32)
    })
})

// describe.skip
// describe.only
// describe.concurrent
// describe.todo

// describe.each
describe.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 }
])('describe object add(%i, %i)', ({ a, b, expected }) => {
    test(`returns ${ expected }`, () => {
        expect(a + b).toBe(expected)
    })
    test(`returned value not be greater than ${ expected }`, () => {
        expect(a + b).not.toBeGreaterThan(expected)
    })
    test(`returned value not be less than ${ expected }`, () => {
        expect(a + b).not.toBeLessThan(expected)
    })
})

// expect 用来创建断言
const input = Math.sqrt(4)

expect(input).to.equal(2)   // chai API
expect(input).toBe(2)       // jest API

// not 否定断言
expect(input).not.to.equal(2)
expect(input).not.toBe(2)

// 断言基础对象是否相等，或者对象是否共享相同的引用
expect(2).toBe(2)

// 进行浮点数的比较
test.fails('decimals are not equal in javascript', () => {
    expect(0.2 + 0.1).toBe(0.3) // 0.2 + 0.1 = 0.30000000000000004
})

/*  断言检查值是否不等于 undefined */
const getApples = () => 3
// 检查函数是否有返回值
test('function returned something', () => {
    expect(getApples()).toBeDefined()
})

/* toBeUndefined 断言检查值是否等于 undefined */
function getApplesFromStock(stock) {
    if(stock === 'Bill') {
        return 13
    }
}
  
test('mary doesn\'t have a stock', () => {
    expect(getApplesFromStock('Mary')).toBeUndefined()
})

/* 断言该值是否为 true */
test('if we know Bill stock, sell apples to him', () => {
    expect(NaN).toBeTruthy()
})

/* toBeFalsy */

/* toBeNull */

/* toBeNaN */

/* toBeTypeOf 断言检查值是否属于接收的类型 */
const actual = 'stock'
test('stock is type of string', () => {
    expect(actual).toBeTypeOf('string')
})

/* toBeInstanceOf 断言检查值是否为接收的类的实例 */
const stocks = new Date
test('stocks are instance of Stocks', () => {
    expect(stocks).toBeInstanceOf(Date)
})

/* toBeGreaterThan 断言检查值是否大于接收值，如果相等将无法通过测试 */

/* toBeGreaterThanOrEqual 断言检查值是否大于等于接收值 */

/* toBeLessThan 断言检查值是否小于接收值，如果相等将无法通过测试 */

/* toBeLessThanOrEqual 断言检查值是否小于等于接收值 */

/* toEqual 断言检查值是否等于接收值，或者是同样的结构，如果是对象类型（将会使用递归的方法进行比较） */

/* toStrictEqual 断言检查值是否等于接收值或者同样的结构，如果是对象类型（将会使用递归的方法进行比较），并且会比较它们是否是相同的类型 */

/* toContain 断言检查值是否在数组中。还可以检查一个字符串是否为另一个字符串的子串 */

/* toContainEqual 断言在数组中是否包含具有特定结构和值的元素。它就像对每个元素进行 toEqual 操作 */

/* toHaveLength 断言一个对象是否具有 .length 属性，并且它被设置为某个数值 */

/* toHaveProperty 断言对象上是否存在指定 key 的属性 */
const invoice = {
    isActive: true,
    customer: {
        first_name: 'John',
        last_name: 'Doe',
        location: 'China',
    },
    total_amount: 5000
}

expect(invoice).toHaveProperty('isActive')              // 断言密钥存在
expect(invoice).toHaveProperty('total_amount', 5000)    //断言 key 存在且值相等

/* toMatch 断言字符串是否匹配指定的正则表达式或字符串 */

/* toMatchObject 断言对象是否匹配指定的对象属性的子集 */

/* toThrowError 断言函数在调用时是否抛出错误 */

/* toHaveBeenCalled 断言可以测试一个函数是否被调用过。需要给 expect 传递一个监听函数 */
const market = {
    buy(subject: string, amount: number) {
        // ...
    },
}
  
test('spy function', () => {
    const buySpy = vi.spyOn(market, 'buy')

    expect(buySpy).not.toHaveBeenCalled()

    market.buy('apples', 10)

    expect(buySpy).toHaveBeenCalled()
})

/* toHaveBeenCalledTimes 检查一个函数是否被调用了一定的次数 */

/* toHaveBeenCalledWith 检查一个函数是否被调用过，并且传入了指定的参数 */

/* toHaveBeenLastCalledWith 检查一个函数在最后一次被调用时，是否使用了某些参数 */

/* toHaveBeenNthCalledWith 检查一个函数在第某次调用时是否使用了某些参数 */

/* toHaveReturned 检查一个函数是否至少成功返回了一次值 */

/* toHaveReturnedTimes 检查一个函数是否成功返回了确切的次数 */

/* toHaveReturnedWith 检查一个函数是否至少一次成功返回了指定的值 */

/* toHaveLastReturnedWith */

/* toHaveNthReturnedWith */

/* toSatisfy 检查一个值是否满足某个条件 */
describe('toSatisfy()', () => {
    const isOdd = (value: number) => {
        value % 2 !== 0
    }

    it('pass with 0', () => {
        expect(1).toSatisfy(isOdd)
    })

    it('pass with negotiation', () => {
        expect(2).not.toSatisfy(isOdd)
    })
})

/* resolves */
function buyApples() {
    return fetch('/buy/apples').then(r => r.json())
}
  
test('buyApples returns new stock id', async () => {
    // toEqual 现在返回一个 Promise ，所以我们必须等待它
    await expect(buyApples()).resolves.toEqual({ id: 1 })
})

/* rejects */


/* assertions 在测试通过或失败后，它将会验证在测试期间调用了多少次断言。它常用于检查异步代码是否被调用了 */
async function doAsync(...cbs) {
    await Promise.all(cbs.map((cb, index) => cb({ index })))
}
  
test('all assertions are called', async () => {
    expect.assertions(2)

    function callback1(data) {
        expect(data).toBeTruthy()
    }

    function callback2(data) {
        expect(data).toBeTruthy()
    }
  
    await doAsync(callback1, callback2)
})

/* hasAssertions 在测试通过或失败后，它将会验证在测试期间是否至少调用了一个断言 */

/* extend 扩展默认匹配器。此函数用于使用自定义匹配器扩展匹配器对象 */
test('custom matchers', () => {
    expect.extend({
        toBeFoo: (received, expected) => {
            if (received !== 'foo') {
                return {
                    message: () => `expected ${received} to be foo`,
                    pass: false
                }
            }
        }
    })

    expect('foo').toBeFoo()
    expect({ foo: 'foo' }).toEqual({ foo: expect.toBeFoo() })
})


/* 测试的生命周期 */

/* beforeEach 在当前上下文中的每个测试运行之前被调用 如果函数返回一个 Promise，Vitest 会等到 Promise 解决后再运行测试 */
beforeEach(async () => {
    // 在每次测试运行之前清除模拟并添加一些测试数据
    await stopMocking()
    await addUser({ name: 'John' })
})

/* afterEach 在当前上下文中的每个测试运行之后被调用。 如果函数返回一个 Promise ，Vitest 会等到 Promise 解决后再继续 */

/* beforeAll 在开始运行当前上下文中的所有测试之前被调用一次。 如果函数返回一个 Promise，Vitest 会等到 Promise 解决后再运行测试 */

/* afterAll 在当前上下文中运行所有测试后被调用一次 */


/* Vi */

/* advanceTimersByTime */

/* advanceTimersToNextTimer 调用下一个可调用的计时器 在每个计时器调用间隔内进行断言很有用。你可以链式调用它来自己管理计时器 */

/* clearAllTimers 删除所有计划运行的计时器。这些计时器后续将不会运行 */

/* fn 函数创建一个监听，每次调用函数时，存储其调用参数、返回值和实例 */
const getApples = vi.fn(() => 0)

getApples()

expect(getApples).toHaveBeenCalled()
expect(getApples).toHaveReturnedWith(0)

getApples.mockReturnValueOnce(5)

const res = getApples()
expect(res).toBe(5)
expect(getApples).toHaveNthReturnedWith(2, 5)

/* getMockedSystemTime 返回使用 setSystemTime 设置的模拟的当前日期 */

/* getRealSystemTime 使用 vi.useFakeTimers 时，会模拟 Date.now 调用。如果需要获取毫秒级的实时时间，你可以调用这个函数 */

/* mock */

/* setSystemTime 当前日期设置为一个过去的日期 */
const date = new Date(1998, 11, 19)

vi.useFakeTimers()
vi.setSystemTime(date)

expect(Date.now()).toBe(date.valueOf())

vi.useRealTimers()

/* restoreCurrentDate 恢复为系统时间 */

/* useFakeTimers 要启用模拟计时器，你需要调用此方法。它将包装对计时器的所有进一步调用 (例如 setTimeout、setInterval、clearTimeout、clearInterval、nextTick、setImmediate、clearImmediate 和 Date)，直到 vi.useRealTimers() 被调用 */

/* useRealTimers 模拟计时器恢复其原始实现 */


/* MockInstance Methods */

/* getMockName 模拟对象的 name  */

/* mockName */

/* mockImplementation */

/* mockRejectedValue 当异步函数被调用时，接收一个将被拒绝 ( reject ) 的错误 */
test('async test', async() => {
    const asyncMock = vi.fn().mockRejectedValue(new Error('Async error'))

    await asyncMock() // throws "Async error"
})

/* mockResolvedValue 异步函数被调用时，接收一个将被决议 ( resolve ) 的值 */
test('async test', async() => {
    const asyncMock = vi.fn().mockResolvedValue(43)

    await asyncMock() // 43
})

