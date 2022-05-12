# ES编码规范

### 错误避免

1. 强制在 `getter` 属性中出现一个 `return` 语句
    ```js
    // Good
    Object.defineProperty(p, "age", {
        get: function (){
            return 17
        }
    })
    ```

2. 禁止使用异步函数作为 `Promise executor`
    ```js
    // Bad
    const result = new Promise(async (resolve, reject) => {
        resolve(await foo)
    })
    ```
    >如果异步 executor 函数抛出一个错误，这个错误将会丢失，并且不会导致新构造的 Promise 被拒绝。使调试和处理错误变得困难

    > 如果一个 Promise executor 函数使用了 await，这通常表示实际上没有必要使用 new Promise 构造函数

3. 禁止在循环中出现 `await`
    ```js
    // Bad
    async function foo(things) {
        const results = []

        for (const thing of things) {
            results.push(await bar(thing))
        }

        return baz(results)
    }
    ```

    ```js
    // Good
    async function foo(things) {
        const results = []

        for (const thing of things) {
            results.push(bar(thing))
        }

        return baz(await Promise.all(results))
    }
    ```
    > 然后通过 Promise.all() 访问结果，不需要等待前一个操作完成

4. 禁止与 `-0` 进行比较
    ```js
    // Bad
    if (x === -0) {
        // doSomething()
    }
    ```

    ```js
    // Good
    if (x === 0) {
        // doSomething()
    }

    if (Object.is(x, -0)) {
        // doSomething()
    }
    ```

    > `x === -0`， `x` 为 `+0` 和 `-0` 都是 `true`

5. 禁止在条件语句中出现赋值操作符，除非被圆括号括起来
    ```js
    // Bad
    if (x = 0) {
        var b = 1
    }
    ```
    ```js
    // Good
    var x
    if (x === 0) {
        var b = 1
    }

    function setHeight(someNode) {
        "use strict"
        do {
            someNode.height = "100px"
        } while ((someNode = someNode.parentNode))
    }
    ```
    > 在条件语句中使用赋值操作符是有效的。然而，很难判断某个特定的赋值是否是有意为之

6. 禁用 `console`, `debugger`
    > 在提交代码之前，应该去除 `console` `debugger`

7. 禁止在条件中使用常量表达式

    ```js
    // Bad
    if (false) {
        doSomethingUnfinished();
    }

    if (void x) {
        doSomethingUnfinished();
    }

    for (;-2;) {
        doSomethingForever();
    }

    while (typeof x) {
        doSomethingForever();
    }

    do {
        doSomethingForever();
    } while (x = -1);

    var result = 0 ? a : b;
    ```

8. 禁止在嵌套的块中出现 `function` 声明
    ```js
    // Bad
    if (test) {
        function doSomething() { }
    }

    function doSomethingElse() {
        if (test) {
            function doAnotherThing() { }
        }
    }
    ```

9. 禁止直接在对象实例上调用 `Object.prototype` 的一些方法

    ```js
    // Bad
    var hasBarProperty = foo.hasOwnProperty("bar")

    var isPrototypeOfBar = foo.isPrototypeOf(bar)

    var barIsEnumerable = foo.propertyIsEnumerable("bar")
    ```

    ```js
    // Good
    var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar")

    var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar)

    var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar")
    ```
    > 对象可以具有属性，这些属性可以将 Object.prototype 的内建函数隐藏，可能导致意外行为

10. 禁止在常规字符串中出现模板字面量占位符语法
    ```js
    // Bad
    var str = "Hello ${name}!"
    var timestr = "Time: ${12 * 60 * 60 * 1000}"
    ```
    > 防止书写错误

11. 禁止在 `finally` 语句块中出现控制流语句
    ```js
    // Bad
    (() => {
        try {
            return 1
        } catch(err) {
            return 2
        } finally {
            return 3
        }
    })() // 3
    ```

    > ES 会暂停 try 和 catch 语句块中的控制流语句，直到 finally 语句块执行完毕。所以，当 return、throw、break 和 continue 出现在 finally 中时， try 和 catch 语句块中的控制流语句将被覆盖

### 最佳实践

1. 当代码块只有一条语句时，不能省略大括号 
    ```js
    if (foo) {
        foo++
    }

    while (bar) {
        baz()
    }

    if (foo) {
        baz()
    } else {
        qux()
    }
    ```

    > 在块区域前后时刻保留大括号是一种最佳实践，即使他们是可有可无的，因为省略大括号会导致错误，并且降低代码的清晰度

2. `Switch` 语句中有 `Default` 分支
    ```js
    switch (a) {
        case 1:
            /* code */
            break

        default:
            /* code */
            break
    }
    ```

3. 对象属性使用点号
    ```js
    var x = foo.bar

    var x = foo[bar]
    ```

4. 使用类型安全的 `===` 和 `!==` 操作符代替 `==` 和 `!=` 操作符
    ```js
    //Good
    a === b
    foo === true
    bananas !== 1
    value === undefined
    typeof foo === 'undefined'
    'hello' !== 'world'
    0 === 0
    true === true
    foo === null
    ```

5. 禁用 `caller` 或 `callee`
    ```js
    // Bad
    function foo(n) {
        if (n <= 0) {
            return
        }

        arguments.callee(n - 1)
    }

    [1,2,3,4,5].map(function(n) {
        return !(n > 1) ? 1 : arguments.callee(n - 1) * n
    })
    ```

6. 禁止在 `case` 或 `default` 子句中出现词法声明
    ```js
    // Bad
    switch (foo) {
        case 1:
            let x = 1
            break
        case 2:
            const y = 2
            break
        case 3:
            function f() {}
            break
        default:
            class C {}
    }
    ```
    ```js
    // Good
    const a = 0;

    switch (foo) {
        case 1: {
            let x = 1
            break
        }
        case 2: {
            const y = 2
            break
        }
        case 3: {
            function f() {}
            break
        }
        case 4:
            var z = 4
            break
        default: {
            class C {}
        }
    }
    ```
    > 词法声明 (let、const、function 和 class) 出现在 case或default 子句中，词法声明在整个 switch 语句块中是可见的，但是它只有在运行到它定义的 case 语句时，才会进行初始化操作， 将子句包裹在块中，避免访问未经初始化的词法绑定以及跨 case 语句访问被提升的函数

7. 禁止在 `else` 前有 `return`
    ```js
    // Bad
    function foo() {
        if (x) {
            return y
        } else {
            return z
        }
    }
    ```
    ```js
    // Good
    function foo() {
        if (x) {
            return y
        }

        return z
    }
    ```

8. 禁用 `eval()` `with()`

9. 禁用标签语句
    ```js
    //Bad
    label:
        while(true) {
            break label
        }

    label:
        while(true) {
            continue label
    }
    ```

10. 禁用魔术数字
    ```js
    // Bad
    var dutyFreePrice = 100
    var finalPrice = dutyFreePrice + (dutyFreePrice * 0.25)
    ```

    ```js
    var TAX = 0.25
    var dutyFreePrice = 100
    var finalPrice = dutyFreePrice + (dutyFreePrice * TAX)
    ```

    > 魔术数字是在代码中多次出现的没有明确含义的数字。它最好由命名常量取代

11. 禁止出现多个空格，注释前的空格除外
    ```js
    // Bad
    var a =  1

    if(foo   === "bar") {}

    a <<  b

    var arr = [1,  2]

    a ?  b: c
    ```

12. 禁止多行字符串
    ```js
    // Bad
    var x = "Line 1 \
             Line 2"
    ```
    ```js
    // Good
    var x = "Line 1\n" +
            "Line 2"
    ```
    > 在 JavaScript 中，可以在新行之前使用斜线创建多行字符串，这不是一个好的做法，因为它是 JavaScript 中的一个非正式的特性

13. 禁用Function构造函数

14. 禁止在返回语句中赋值
    ```js
    // Bad
    function doSomething() {
        return foo = bar + 2
    }
    ```
    > 很难断定 return 语句的意图。很有可能这个函数是为了返回 bar + 2，但是如果是这样的话，为什么赋值给 foo 呢？也很有可能使用比较运算符比如 ==，如果是这样的话代码是错误的。正是由于这种模棱两可，在 return 语句中不使用赋值，被认为是一个最佳实践

15. 禁止使用不带 `await` 表达式的 `async` 函数

    > JavaScript 中的异步函数与其他函数在两个重要方面表现不同: 返回值总是一个 Promise; 可以使用其中的 await 操作符

### 风格指南

1. 在左右花括号后前添加一个空格
    ```js
    // Good
    function foo() { return true }
    if (foo) { bar = 0 }
    ```

2. 逗号前不能有空格，逗号后需要一个空格
    ```js
    // Good
    var foo = 1, bar = 2, baz = 3
    var arr = [1, 2]
    var arr = [1,, 3]
    var obj = {"foo": "bar", "baz": "qur"}
    foo(a, b)
    new Foo(a, b)
    function foo(a, b){}
    ```

3. 禁止在函数标识符和其调用之间有空格
    ```js
    // Bad
    fn ()

    // Good 
    fn()
    ```

4. 强制对象属性 `:` 后需要一个空格

5. 