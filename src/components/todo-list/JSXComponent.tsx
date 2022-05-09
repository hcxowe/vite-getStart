import { defineComponent, ref, Ref } from 'vue'
import style from './index.module.css'

interface Todo {
    title:string,
    done:boolean
}

export default defineComponent({
    setup(props) {
        const title:Ref<string> = ref('')
        const todos:Ref<Todo[]> = ref([
            { title: '学习 Vue 3', done: true },
            { title: '睡觉', done: false }
        ])

        function addTodo() {
            todos.value.push({
                title: title.value,
                done: false
            })

            title.value = ''
        }

        return () => <div>
            <input type="text" vModel={ title.value } />
            <button onClick={ addTodo }>click</button>
            <ul class={style.list}>
                {
                    todos.value.length ? todos.value.map(todo => <li>{ todo.title }</li>) : <li>no data</li>
                }
            </ul>
        </div>
    }
})