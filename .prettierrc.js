module.exports = {
    printWidth: 100,                // 打印宽度
    tabWidth: 4,                    // 缩进空格数
    useTabs: false,                 // 使用制表符而不是空格缩进行
    semi: false,                    // 分号（针对脚本代码）
    singleQuote: true,              // 单引号（针对脚本代码）
    quoteProps: 'preserve',         // 对象属性的引号使用 as-needed: 仅在需要的时候使用; consistent: 有一个属性需要引号，就都需要引号; preserve: 保留用户输入的情况
    trailingComma: 'es5',           // 末尾逗号 none: 末尾没有逗号; es5: es5有效的地方保留; all: 在可能的地方都加上逗号
    bracketSpacing: true,           // 字面量对象括号中的空格
    arrowParens: 'always',          // 箭头函数中的括号 (x) => x
    bracketSameLine: false,         // 将多行 HTML 元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
    vueIndentScriptAndStyle: false, // 是否缩进 Vue 文件中的代码<script>和<style>标签
    endOfLine: 'lf'                 // 统一换行符，防止一个仓库中存在不同系统风格的行尾
}