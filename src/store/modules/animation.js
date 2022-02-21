/*
 * @Date: 2021-11-09 21:00:50
 * @LastEditors: czhlin
 * @LastEditTime: 2022-02-21 00:14:17
 * @FilePath: \graduation-project\vue-czhalgo-web\src\store\modules\animation.js
 */
const FINISH = 'finish'
const PAUSE = 'pause'
const CODE = 'code'
const ANIM = 'anim'
const START = 'start'
const PEND='pend'
const state = {
  animState: START,
  nextState: START,
  preState: START,
  keepState: null,
  map: { FINISH, PAUSE, CODE, ANIM, START,PEND }
}
const mutations = {
  SET_STATE: (state, animState) => {
    state.preState=state.animState
    state.animState = animState
  },
  SET_NEXT_STATE: (state, nextState) => {
    state.nextState = nextState
  },
  SET_KEEP_STATE:(state,keepState)=>{
    state.keepState=keepState
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
        case ANIM:
          result=PEND
          commit('SET_KEEP_STATE',ANIM)
          break
        case CODE:
          result=PEND
          commit('SET_KEEP_STATE',CODE)
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
        case PEND:
          result=PAUSE
          commit('SET_NEXT_STATE',PEND)
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
      case ANIM:
        commit('SET_KEEP_STATE',ANIM)
        commit('SET_STATE',PEND)
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
      case CODE:
        commit('SET_KEEP_STATE',CODE)
        commit('SET_STATE',PEND)
        break
    }
  },
  continue({state,commit}){
    switch(state.animState){
      case PEND:
        commit('SET_STATE',state.keepState)
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
