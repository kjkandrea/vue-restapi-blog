export const state = () => ({
  slug: '',
  postData: {
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
  requestPostData (state, payload) {
    state.postData = payload
  }
}

export const actions = {
  async requestPostData({ state, commit }, payload) {
    if ( payload === state.slug ) return;
    try {
      let res = await this.$axios.get(`/posts?slug=${payload}`)
      commit('memorizeSlug', payload);
      commit('requestPostData', res.data[0]);
    } catch(err) {
        console.log(err)
    }
  }
}