import axios from './index'

export function modifyPwd(newpassword: string, oldpassword: string) {
    return axios.post('/modifyPwd', {
        newpassword,
        oldpassword
    })
}