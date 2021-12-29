/*
 * @Date: 2021-11-09 21:00:50
 * @LastEditors: czhlin
 * @LastEditTime: 2021-12-29 12:37:46
 * @FilePath: \笔记d:\桌面\项目\graduation-project\vue-czhalgo-web\src\store\modules\animation.js
 */
const FINISH = 'finish'
const PAUSE = 'pause'
const CODE = 'code'
const ANIM = 'anim'
const START = 'start'
const state = {
  animState: START,
  nextState: START,
  map: { FINISH, PAUSE, CODE, ANIM, START }
}
const mutations = {
  SET_STATE: (state, animState) => {
    state.animState = animState
  },
  SET_NEXT_STATE: (state, nextState) => {
    state.nextState = nextState
  }
}
const actions = {
  playAnim({ state, commit }, isPlay) {
    let result
    if (isPlay) {
      switch (state.animState) {
        case START:
          result = CODE
          break
        case PAUSE:
          result = state.nextState
          break
        case FINISH:
          result = START
          break
        default:
          result = state.animState
          break
      }
    } else {
      switch (state.animState) {
        case CODE:
          result = PAUSE
          commit('SET_NEXT_STATE', CODE)
          break
        case ANIM:
          result = PAUSE
          commit('SET_NEXT_STATE', ANIM)
          break
        default:
          result = state.animState
          break
      }
    }
    commit('SET_STATE', result)
  },
  startAnim({ state, commit }) {
    switch (state.animState) {
      case CODE:
        commit('SET_STATE', ANIM)
        break
      case PAUSE:
        commit('SET_NEXT_STATE', ANIM)
        break
    }
  },
  startCode({ state, commit }) {
    switch (state.animState) {
      case ANIM:
        commit('SET_STATE', CODE)
        break
      case PAUSE:
        commit('SET_NEXT_STATE', CODE)
        break
    }
  },
  endAll({ commit }) {
    commit('SET_STATE', FINISH)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
