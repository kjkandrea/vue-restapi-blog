export const state = () => ({
  slug: '',
  taxonomies: [],
  pageIndex: '',
  taxonomyId: '',
  lastFetchTexonomy: null,
  taxonomiesLastFetchDates: null,
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
  taxonomyPostsData: [{
    title: {
      rendered: ''
    },
    excerpt: {
      rendered: ''
    }
  }]
})

export const mutations = {
  memorizeSlug (state, payload) {
    state.slug = payload
  },
  memorizePageIndex (state, payload) {
    state.pageIndex = payload
  },
  memorizeTaxonomyId (state, payload) {
    state.taxonomyId = payload
  },
  setStateTaxonomiesData (state, payload) {
    state.taxonomies = payload
  },
  memorizeLastFetchTexonomy (state, payload) {
    state.lastFetchTexonomy = payload
  },
  memorizeLastFetchDates (state) {
    state.taxonomiesLastFetchDates = new Date()
  },
  setStateTaxonomyPostsData (state, payload) {
    state.taxonomyPostsData = payload
  },
  setStatePostData (state, payload) {
    state.postData = payload
  },
}

export const actions = {
  async requestTaxonomiesData({ state, commit }, payload) {
    let lastDate = parseInt(new Date(state.taxonomiesLastFetchDates).getTime()/ 1000 / 60 / 60);
    let now = parseInt(new Date().getTime()/ 1000 / 60 / 60);
    
    if(lastDate === now && state.lastFetchTexonomy === payload) return;
    
    try {
      let res = await this.$axios.get(`/v2/${payload}?_fields=id,count,name,slug`)
      commit('setStateTaxonomiesData', res.data);
      commit('memorizeLastFetchTexonomy', payload);
      commit('memorizeLastFetchDates');
    } catch(err) {
        console.log(err)
    }
  },
  async requestTaxonomyPostsData({ state, commit }, payload) {
    const _taxonomyObj = state.taxonomies.find(el => el.slug === payload.taxonomy)

    if(!_taxonomyObj){
      return
    }

    if ( _taxonomyObj.id === state.taxonomyId && payload.page === state.pageIndex) return;

    try {
      let res = await this.$axios.get(`/v2/posts?_fields=title,slug,date,excerpt&${payload.type}=${_taxonomyObj.id}&page=${payload.page}`)
      commit('memorizePageIndex', payload.page);
      commit('memorizeTaxonomyId', _taxonomyObj.id);
      commit('setStateTaxonomyPostsData', res.data);
    } catch(err) {
        console.log(err)
    }
  },
  async requestPostData({ state, commit }, payload) {
    if ( payload === state.slug ) return;
    try {
      let res = await this.$axios.get(`/v2/posts?slug=${payload}&_embed=wp:term`)
      commit('memorizeSlug', payload);
      commit('setStatePostData', res.data[0]);
    } catch(err) {
        console.log(err)
    }
  },
}