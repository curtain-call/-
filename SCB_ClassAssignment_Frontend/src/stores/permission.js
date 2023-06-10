import { asyncRoutes, constantRoutes } from '../router/index'
import { defineStore } from 'pinia'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  // routes.forEach(route => {
  //   const tmp = { ...route }
  //   if (hasPermission(roles, tmp)) {
  //     if (tmp.children) {
  //       tmp.children = filterAsyncRoutes(tmp.children, roles)
  //     }
  //     res.push(tmp)
  //   }
  // })

  return res
}

export const usePermissions = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: []
  }),
  getters: {},
  actions: {
    SET_ROUTES(routes) {
      this.addRoutes = routes
      this.routes = constantRoutes
    },
    generateRoutes(roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          // console.log("normal: " + JSON.stringify(accessedRoutes))
          // console.log("普通用户权限长度: " + accessedRoutes.length)
        }
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // commit('SET_ROUTES', accessedRoutes)
        this.SET_ROUTES(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  },
  persist: true
})

