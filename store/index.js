export const state = () => ({
  navigationDrawer: null,
  navigationData: [],
})

export const mutations = {
  setStateToggleDrawer (state) {
    state.navigationDrawer = !state.navigationDrawer
  },
  setStateNavigationData (state, payload) {
    state.navigationData = payload
  }
}

export const actions = {
  async requestNavigationData({ commit }, payload) {
    try {
      let res = await this.$axios.get(`/menus/v1/menus/${payload}`)
      commit('setStateNavigationData', res.data.items);
    } catch(err) {
        console.log(err)
    }
  }
}

export const getters = {
  navigationDrawer: (state) => {
      return state.navigationDrawer;
  }
}