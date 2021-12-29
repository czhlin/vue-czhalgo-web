import { login, logout, getInfo } from '@/api/modules/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录 store.dispatch('user/login')
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 开始真正调接口
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          // 把login登录成功返回的token保存到vuex中
          commit('SET_TOKEN', data.token)
          // 把login登录成功返回的token放进Cookie中
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户信息
  // 这个接口在什么时候调用？
  // 当有token但没有用户信息时调用
  // 路由守卫：在登录流程中，在刷新流程中
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 真正调接口获取用户信息
      // 注意：这个作者是用query参数的方式向后端传递token的
      getInfo({}).then(response => {
        const { data } = response
        // 如果data不存在，这说明token要么是假的，要么过期了。
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        // 这里肯定拿到了用户信息
        const { roles, name, avatar, introduction } = data

        // roles必须为非空数组
        if (!roles || roles.length <= 0) {
          reject(new Error('getInfo: roles must be a non-null array!'))
        }
        // 把用户信息都放进vuex中(用户不要放进Cookie或localStore中)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        // 给.then()使用
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录:清除token、清除角色信息、重置router、清除缓存
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 调接口退出登录，入参是token
      logout(state.token).then(() => {
        // 把vuex中的token和角色信息清除
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // 把Cookie中的token清除
        removeToken()
        // 重置路由
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // 把vuex中tagViews、缓存的视图都清除
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  // 改变用户角色
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    // 改变vuex中的token
    commit('SET_TOKEN', token)
    // 改变cookie中的token
    setToken(token)
    // 得到用户信息
    const { roles } = await dispatch('getInfo')
    // 重置路由
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
