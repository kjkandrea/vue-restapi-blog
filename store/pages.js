export const state = () => ({
  slug: '',
  pageData: {
    title: {
      rendered: ''
    },
    content: {
      rendered: ''
    },
    excerpt: {
      rendered: ''
    }
  },
})

export const mutations = {
  memorizeSlug (state, payload) {
    state.slug = payload
  },
  requestPageData (state, payload) {
    state.pageData = payload
  }
}

export const actions = {
  async requestPageData({ state, commit }, payload) {
    if ( payload === state.slug ) return;
    try {
      let res = await this.$axios.get(`/pages?slug=${payload}`)
      commit('memorizeSlug', payload);
      commit('requestPageData', res.data[0]);
    } catch(err) {
        console.log(err)
    }
  }
}