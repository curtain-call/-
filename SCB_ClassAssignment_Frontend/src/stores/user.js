import { defineStore } from "pinia";


// 登录获取token
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        userInfo: '',
        roles: []
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
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                // 去除两端空格,然后扔给API
                login({ username: username.trim(), password: password })
                .then(response => {
                    console.log("这里是stores/user.js")
                    console.log(response)
                    const { token } = response.data
                    console.log(token)
                    this.SET_TOKEN(token)
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
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    if (!response) {
                        return reject('验证失败，请重新登录')
                    }
                    // const { roles, username, userAvatar, userGender, email, school, lastLogin, interest, reputation } = response
                    const { user_type, username, user_info } = response
                    commit('SET_NAME', username)
                    commit('SET_USERINFO', user_info)
                    // commit('SET_AVATAR', userAvatar)
                    // commit('SET_GENDER', userGender)
                    // commit('SET_EMAIL', email)
                    // commit('SET_LASTLOGIN', lastLogin)
                    let roles = []
                    if (user_type) {
                        roles = ['admin']
                    } else {
                        roles = ['normal']
                    }

                    /**********************************/
                    roles = ['admin']
                    /**********************************/

                    commit('SET_ROLES', roles)
                    resolve(response)
                }).catch(error => {
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
    }
})
