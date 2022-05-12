import { defineStore } from 'pinia'

interface UserInfo {
    username: string,
    password: string
}

const TIMERDELAY = 1000

function loginApi() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                username: 'hcxowe',
                password: '123456'
            })
        }, TIMERDELAY)
    })
}

export const useUserStore = defineStore({
    id: 'user',

    state: () => {
        return {
            username: '',
            password: ''
        }
    },

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