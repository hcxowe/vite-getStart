import axios from './request'

export function modifyPwd(newpassword: string, oldpassword: string, showMesasge: string) {
    return axios({
        url: '/modifyPwd',
        method: 'post',
        data: {
            newpassword,
            oldpassword
        }
    }, showMesasge)
}