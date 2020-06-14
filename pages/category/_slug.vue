<template>
  <div>
    <v-container v-if="pages" style="max-width:760px">
      <em>{{taxonomy}}</em> 에 대한 Post 목록 입니다.
      <ul>
        <li v-for="item in taxonomyPostsData" :key="item.id">
          <nuxt-link :to="{ name: 'post-slug',  params: { slug: item.slug } }">
            <h4 v-html="item.title.rendered" />
            <time-stamp :time=item.date />
            <p v-html="item.excerpt.rendered" />
          </nuxt-link>
        </li>
      </ul>

      <v-pagination
        v-model="page"
        :length="pages"
      />
    </v-container>
    <div v-else>
      해당 Taxonomy가 존재하지 않습니다.
    </div>
  </div>
</template>

<script>

import TimeStamp from '~/components/TimeStamp'

export default {
  asyncData({query}) { 
    if(query.page){
      //console.log(query.page)
    }
  },
  components: {
    TimeStamp
  },
  data() {
    return {
      page : 1,
      howmany: 10,
    }
  },
  computed: {
    taxonomy() {
      return this.$route.params.slug
    },
    taxonomyPostsData() {
      return this.$store.state.posts.taxonomyPostsData;
    },
    pages() {
      const i = this.$store.state.posts.taxonomies.find(el => el.slug === this.taxonomy);
      
      if(!i){
        return
      }

      return Math.ceil(i.count/10);
    },
    pageRoute() {
      return this.$route.query.page
    }
  },
  watch: {
    page(){
      this.$router.push({ query: { page: this.page }})
    }
  },
  async middleware( { store, params, query } ) {
    let page = 1
    if(query.page) page = query.page
    await store.dispatch('posts/requestTaxonomiesData', 'categories')
    store.dispatch('posts/requestTaxonomyPostsData', {
      type: 'categories',
      taxonomy : params.slug,
      page : page
    })
  },
  created(){
    if(this.$route.query.page) {
      this.page = Number(this.$route.query.page)
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch('posts/requestTaxonomyPostsData', {
        type: 'categories',
        taxonomy : this.taxonomy,
        page : this.page
      }
    )},
  }
};
</script>
