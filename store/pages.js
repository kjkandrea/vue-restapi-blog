export const state = () => ({
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
  RequestPageData (state, payload) {
    state.pageData = payload.data[0]

    console.log(state.pageData)
  }
}

export const actions = {
  RequestPageData({ commit }, payload) {
    this.$axios.get(`https://wireframe.kr/wp-json/wp/v2/pages?slug=${payload.slug}`)
      .then((res) => {
        commit('RequestPageData', {
          data: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}