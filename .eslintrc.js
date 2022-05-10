module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
		'vue/setup-compiler-macros': true
    },
	"parser": "vue-eslint-parser",
    'extends': [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        'vue',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4										// 缩进4个空格
        ],
        'quotes': [
            'error',
            'single'								// 单引号
        ],
        'semi': [
            'error',
            'never'
        ],
		'vue/multi-word-component-names': 0,		// 组件名称不强制多单词模式
		'default-case': 'error', 					// switch 必须有 default 分支
		'eqeqeq': 'error',							// 使用 === !==
		'no-unmodified-loop-condition': 'error',	// 防止死循环
		'require-await': 'error',					// 禁止不带 await 的 async
		'block-spacing': 'error',					// 花括号前后有一个空格， 对象除外
		'brace-style': [							// if else 的 { 跟 if 同行， } 要换行，或者 { } 在同一行
			'error',
			'1tbs',
			{
				'allowSingleLine': true
			}
		],
		'comma-spacing': 'error',					// 逗号前不能有空格，逗号后需要一个空格
		'comma-style': 'error',						// 逗号放在数组元素，对象属性值之后，且在同一行
		'computed-property-spacing': 'error',		// obj[ 'a' ] 不允许出现空格
		'key-spacing': 'error',						// 强制对象属性 : 后需要一个空格
		'new-cap': 'error',							// 构造函数首字母大写
		'no-multiple-empty-lines': 'error',			// 限制最多出现两个空行
		'no-trailing-spaces': 'error', 				// 禁止在空行使用空白字符
    	'no-unneeded-ternary': 'error', 			// 禁止多余的三元表达式，如a === 1 ? true : false应缩写为 a === 1
    	'no-whitespace-before-property': 'error', 	// 禁止属性前有空白，如console. log(obj['a'])，log前面的空白有问题
    	'nonblock-statement-body-position': 'error',// 强制单行语句不换行
    	'object-curly-newline': [					// 对象数属性要有一致的换行，都换行或都不换行
			'error', 
			{ 
				'multiline': true 
			}
		], 
    	'object-curly-spacing': [					// 强制对象/解构赋值/import等花括号前后有空格
			'error',
			'always'
		], 
    	'operator-assignment': 'error', 			// 尽可能的简化赋值操作，如 x=x+1 应简化为 x+=1
    	'semi-spacing': 'error', 					// 强制分号后面有空格，如for (let i=0; i<20; i++)
    	'space-before-blocks': 'error', 			// 强制块（for循环/if/函数等）前面有一个空格，如 for (...) {}
    	'space-infix-ops': 'error', 				// 强制操作符（ + - / * ）前后有一个空格
    	'spaced-comment': 'error', 					// 强制注释（//或/*）后面要有一个空格
		
		/* ES6相关 */
    	//'arrow-body-style': 'error', 				// 当箭头函数体的花括号可以省略时，不允许出现花括号
    	// 'arrow-parens': [							// 箭头函数参数只有一个时，不允许写圆括号
		// 	'error', 
		// 	'as-needed'
		// ], 	
    	'arrow-spacing': 'error', 					// 要求箭头函数的 => 前后有空格
    	'no-confusing-arrow': 'error', 				// 禁止在可能与比较操作符混淆的地方使用箭头函数
    	//'no-duplicate-imports': 'error', 			// 禁止重复导入
    	'no-var': 'error', 							// 要求使用let或const，而不是var
    	'object-shorthand': 'error', 				// 要求对象字面量使用简写
    	'prefer-const': 'error', 					// 要求使用const声明不会被修改的变量
    	'prefer-template': 'error', 				// 使用模板字符串，而不是字符串拼接
    	'rest-spread-spacing': 'error', 			// 扩展运算符...和表达式之间不允许有空格
    	'template-curly-spacing': 'error' 			// 禁止模板字符串${}内前后有空格
	}
}