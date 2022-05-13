# VUE规范
  
#### 组件名为多个单词

```js
const app = Vue.createApp({...})

app.component('component-name', {
    /* ... */
})
```

```js
export default {
    name: 'ComponentName',
    /* ... */
}
```
    
#### 组件的 `data` 必须是一个函数

> 当 data 的值是一个对象时，它会在这个组件的所有实例之间共享

#### `Prop` 定义应该尽量详细，至少指定类型
```js
props: {
    status: {
        type: String,
        require: true,

        validator: value => {
            return value.length < 16
        }
    }
}
```

```js
// vue3
const props = defineProps({
    status: {
        type: String,
        require: true,

        validator: value => {
            return value.length < 16
        }
    }
})
```

```ts
// vue3-ts
interface PropsObj {
    path: string,
    title?: string,
    count?: number
}

const props = defineProps<PropsObj>()

// 设置默认值
const props = withDefaults(defineProps<PropsObj>(), {
    path: 'unknow',
    title: 'props define',
    count: 1
})
```
        
> 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源

#### 总是用 `key` 配合 `v-for`

> vue渲染时会尽可能的复用DOM节点， 指定key则让vue知道该节点唯一，不能进行复用

#### 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上

> 当 Vue 处理指令时，v-if 比 v-for 具有更高的优先级，可以通过遍历一个计算属性来解决，也可以使用 template 标签和 v-for 来包裹元素

```js
<ul>
    <template v-for="user in users" :key="user.id">
        <li v-if="user.isActive">{{ user.name }}</li>
    </template>
</ul>
```
#### 为组件样式设置作用域

> 对于单文件组件，顶级 App 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的; 对于组件库来说，应该倾向于选用基于 class 的策略

```css
<!-- 使用 `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```css
<!-- 使用 CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```css
<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

#### 单文件组件文件的大小写

> 始终是单词大写开头 (PascalCase)，如： MyComponent.vue

#### 基础组件名称

> 应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V；如： BaseButton.vue， VIcon

#### 单例组件名称

> 只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性，这些组件永远不接受任何 prop ，因为它们是为你的应用所定制的。如： TheHeading.vue，TheSidebar.vue

#### 紧密耦合的组件名称

> 与父组件紧密耦合的子组件应该以父组件名作为前缀命名。如： TodoList.vue，TodoListItem.vue，TodoListItemButton.vue

#### 组件名称中的单词顺序

> 组件名称应该以高阶的 (通常是一般化描述的) 单词开头，并以描述性的修饰词结尾

```js
SearchButtonClear.vue
SearchButtonRun.vue
SearchInputQuery.vue
SearchInputExcludeGlob.vue
SettingsCheckboxTerms.vue
SettingsCheckboxLaunchOnStartup.vue
```

#### 自闭合组件

> 在单文件组件、字符串模板和 JSX 中，没有内容的组件应该是自闭合的

```html
<MyComponent/>
```

#### `Prop` 命名

> 在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case

```js
props: {
  greetingText: String
}
```

```html
<WelcomeMessage greeting-text="hi"/>
```

#### 多个 attribute 的元素应该分多行撰写，每个 attribute 一行

```html
<MyComponent
    foo="a"
    bar="b"
    baz="c"
/>
```

#### 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法

#### 把复杂计算属性尽可能多地分割为更简单的计算属性

#### 始终使用缩写，用 `:` 表示 `v-bind`，`@` 表示 `v-on` 和用 `#` 表示 `v-slot`

#### 组件/实例选项的顺序

1. 全局感知 

    > name

2. 模板依赖

    > components，directives

3. 组合
    > extends，mixins，provide，inject 

4. 接口
    > props，emits，expose

5. 组合式 API
    > setup

6. 本地状态
    > data，computed

7. 事件
    > watch

    > 生命周期事件: beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，activated，deactivated，beforeUnmount，unmounted，errorCaptured，renderTracked，renderTriggered

8. 非响应式的 property 
    > methods

9. 渲染
    > template，render

#### 元素 (包括组件) 的 `attribute` 统一的顺序

1. 定义 (提供组件的选项)
    > is

2. 列表渲染 (创建相同元素的多个变体)
    > v-for

3. 条件 (元素是否渲染/显示)
    > v-if，v-else-if，v-else，v-show，v-cloak

4. 渲染修饰符 (改变元素的渲染方式)
    > v-pre，v-once

5. 全局感知 (要求在组件以外被感知)
    > id

6. 唯一性 `Attribute` (需要唯一值的 `attribute`)
    > ref，key

7. 双向绑定 (结合了绑定与事件)
    > v-model

8. 其他 `Attribute` (所有普通的、绑定或未绑定的 `attribute`)

9. 事件 (组件事件监听器)
    > v-on

10. 内容 (覆写元素的内容)
    > v-html，v-text

#### 元素选择器应该避免在 `scoped` 中出现，使用类替代

```css
// Bad
<style scoped>
button {
  background-color: red;
}
</style>
```

#### 优先通过 `prop` 和 `emit` 进行父子组件之间的通信，而不是通过 `this.$parent` 或对 `prop` 做出变更