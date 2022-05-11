# CSS编码规范

### 样式顺序

1. 定位属性
    - `position` `top` `right` `bottom` `left` `display` `float` `...`

2. 布局属性
    - `flex`相关属性
    - `grid`相关属性

3. 盒子属性
    - `width` `height` `max-*` `min-*` `padding` `margin`

3. 文字属性
    - `font` `line-height` `color` `text-align` `...`

4. 背景属性
    - `barground` `border` `outline` `box-shadow` `fitler` `...`

5. 其他
    - `transition` `trasform` `animation` `...`

### 语法规范

1. 小写英文字母
2. 在每个声明块的左花括号前添加一个空格
3. 每条声明语句的 : 后应该插入一个空格
4. 所有声明语句都应当以分号结尾
5. 对于属性值或颜色参数，省略小于 1 的小数前面的 0 
6. 十六进制值全部小写，尽量使用简写形式的十六进制值
7. 0 值不指定单位
8. 属性尽量使用缩写精简代码，提高阅读体验
9. 尽量使用 class 属性
10. 避免选择器深度嵌套，原则上不能超过三层
11. 缩进为4个空格

### 命名规范

1. 根据所要呈现的内容、功能来命名，如果内容实在无法找到合适的命名，可以再根据表现命名

    ```
    .header-title {

    }
    ```

2. 命名使用英文单词，可以增加代码的可读性，但特殊情况下，可以使用拼音命名，但必须简明，结构清晰

3. 命名全部使用小写，多个单词可以使用连字符（-）链接，命名可以使用数字，但不能以数字开头

4. 命名可以使用单词缩写，但必须确保是有效的缩写，即别人能看懂，不能自定义缩写
    ```
    .nav {

    }
    ```

### 例子
```css
.warpper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 1024px;
    height: 800px;
    padding: 0;
    margin: 0;

    font-weight: bold;
    color: #fcd;
    line-height: .5em;

    transition: all .5s;
}
```

### 常用的CSS命名

头： `header`

内容： `content`

脚： `footer`

导航： `nav`

侧栏： `sidebar`

栏目： `column`

页面整体布局：`wrapper`

左右中：`left` `right` `center`

登录条：`loginbar`

标志：`logo`

页面主体：`main`

下载：`download`

子导航：`subnav`

菜单：`menu`

子菜单：`submenu`

搜索：`search`

版权：`copyright`

滚动：`scroll`

标签：`tags`

列表：`list`

提示信息：`msg`

小技巧：`tips`

标题：`title`

指南：`guide`

注册：`regsiter`

状态：`status`

按钮： `btn`

标签页：`tab`

当前: `current`

图标: `icon`

注释：`note`

### 注释

```css
/* Header Start */
.logo {

}

/* header相关样式 */

.user-menu {

}
/* Header End */
```

### CSS变量

```css
:root {
    --font-family: "PingFang SC","Microsoft YaHei","微软雅黑",sans-serif;
    --borderColor: #dcdcdc;
}

body {
    font-family: var(--font-family)
}
```

### 原生嵌套

```css
.btn {
    background: blue;

    span {
        color: #fff;
    }

    &:hover {
        background: green;
    }

    @nest .disable & {
        background: gray;
    }
}

```

使用符合CSS嵌套规范编写，工程中通过 postcss 插件进行转化为如下：

```css
.btn {
    background: blue;
}

.btn span {
    color: #fff;
}

.btn:hover {
    background: green;
}

.disable .btn {
    background: gray;
}
```

### 文件命名

基本共用 `base.css`

布局 `layout.css`

变量定义 `custom.css`

主题 `themes.css`

打印 `print.css`