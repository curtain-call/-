
// const Mock = require('mockjs')
import Mock from 'mockjs'
// const user = require('./user')
// 用户登录返回值

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

Mock.mock('http://127.0.0.1:8392/Login/Login', 'post', () => {
  const username = 'admin'
  const token = tokens[username]
  // console.log(username)

  // mock error
  if (!token) {
    console.log("该请求没有token验证")
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  }
  // console.log("mock响应的确被生成了")

  return {
    code: 20000,
    data: token
  }
})

Mock.mock('http://127.0.0.1:8392/getUserInfo', 'post', () => {
  const username = 'admin'
  const token = tokens[username]
  const info = {
    // 'admin-token': {
    //   roles: ['admin'],
    //   introduction: 'I am a super administrator',
    //   // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    //   name: 'Super Admin'
    // }
    'admin-token': {
      user_type: ['admin'],
      user_info: 'I am a super administrator',
      // avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'Super Admin'
    }
  }
  console.log(info)

  // mock error
  if (!info) {
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  }

  return {
    code: 20000,
    data: info
  }
})