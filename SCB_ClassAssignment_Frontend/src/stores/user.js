import { defineStore } from "pinia";


// 登录获取token
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        userInfo: '',
        roles: [],
        userId: ''
    }
}

export const useUser = defineStore('user', {
    state: () => {
        return getDefaultState()
    },
    getters: {

    },
    actions: {
        RESET_STATE() {
            this.$reset()
            
        },
        SET_TOKEN(token) {
            this.token = token
        },
        SET_NAME(name) {
            this.name = name
        },
        SET_USERINFO(userInfo) {
            this.userInfo = userInfo
        },
        SET_ROLES(roles) {
            this.roles = roles
        },
        set_userid(userId){
            this.userId = userId
        },
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                // 去除两端空格,然后扔给API
                login({ username: username.trim(), password: password })
                .then(response => {
                    console.log("这里是stores/user.js")
                    console.log(response)
                    const token = response.data
                    const userId = response.userId
                    console.log(token)
                    this.SET_TOKEN(token)
                    this.set_userid(userId)
                    console.log(this.userId)
                    // commit('SET_TOKEN', token)
                    setToken(token)
                    resolve()
                })
                .catch(error => {
                    console.log("这里是stores/user.js的错误处理部分")
                    console.log(error)
                    reject(error)
                })
            })
        },

        // get user info
        getInfo() {
            return new Promise((resolve, reject) => {
                console.log("getinfo")
                getInfo().then(response => {
                    console.log("getting info then")
                    console.log(response)
                    if (!response) {
                        console.log("no response")
                        return reject('验证失败，请重新登录')
                    }
                    // const { roles, username, userAvatar, userGender, email, school, lastLogin, interest, reputation } = response
                    // const { admin_token:{user_type, username, user_info} } = response.data
                    const { user_type, username, user_info } = response.data
                    console.log(response.data)
                    console.log(user_info)
                    // commit('SET_NAME', username)
                    this.SET_NAME(username)
                    this.SET_USERINFO(user_info)

                    let roles = []
                    if (user_type) {
                        roles = ['admin']
                    } else {
                        roles = ['normal']
                    }

                    /**********************************/
                    roles = ['admin']
                    /**********************************/

                    // commit('SET_ROLES', roles)
                    this.SET_ROLES(roles)
                    console.log(this.$state)

                    resolve(response)
                }).catch(error => {
                    console.log("failed getting info")
                    reject('验证失败，请重新登录')
                })
            })
        },

        // user logout
        logout() {
            removeToken() // must remove token first
            resetRouter()
            // commit('RESET_STATE')
            this.RESET_STATE()
        },

        // remove token
        resetToken() {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                // commit('RESET_STATE')
                this.RESET_STATE()
                resolve()
            })
        }
    },
    persist: true
}
)
