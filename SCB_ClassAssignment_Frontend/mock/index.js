
// const Mock = require('mockjs')
import Mock from 'mockjs'
// const user = require('./user')
// 用户登录返回值

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

Mock.mock('http://127.0.0.1:8392/login', 'post', () => {
    const username = 'admin' 
    const token = tokens[username]
    console.log(username)

    // mock error
    if (!token) {
        console.log("该请求没有token验证")
        return {
            code: 60204,
            message: 'Account and password are incorrect.'
        }
    }
    console.log("mock响应的确被生成了")

    return {
        code: 20000,
        data: token
    }
})