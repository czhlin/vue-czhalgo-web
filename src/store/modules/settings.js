import defaultSettings from '@/settings'
import variables from '@/styles/element-variables.scss'
const { showSettings, tagsView, fixedHeader, sidebarLogo,sidebarShow } = defaultSettings
const state = {
  showSettings: showSettings,
  theme:variables.theme,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  sidebarShow: sidebarShow
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

