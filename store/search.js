export const state = () => ({
  keyword: '',
  resultPostsData: [{
    title: {
      rendered: ''
    },
    excerpt: {
      rendered: ''
    }
  }]
})

export const mutations = {
  memorizeKeyword (state, payload) {
    state.keyword = payload
  },
  setStateResultPostData (state, payload) {
    state.resultPostsData = payload
  }
}

export const actions = {
  async requestResultPostData({ commit }, payload) {
    if ( payload === state.keyword ) return;
    try {
      let res = await this.$axios.get(`/v2/posts?search=${payload}`)
      commit('memorizeKeyword', payload);
      commit('setStateResultPostData', res.data);
    } catch(err) {
        console.log(err)
    }
  }
}