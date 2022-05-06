import { defineStore } from 'pinia'

interface UserInfo {
    username: string,
    password: string
}

function loginApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                username: 'hcxowe',
                password: '123456'
            })
        }, 1000)
    })
}

export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        username: '',
        password: ''
    }),

    actions: {
        async getUser() {
            const userInfo: UserInfo = await loginApi() as UserInfo
            this.$patch(userInfo)
        },

        logout() {
            this.$patch({
                username: '',
                password: ''
            })
        },

        modify(username: string, password: string) {
            this.$patch({
                username,
                password
            })
        }
    }
})