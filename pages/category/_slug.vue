<template>
  <div class="content-wrap">
    <template v-if="pages">
      <h1 class="content-lists-title"><em>{{taxonomy}}</em> 에 대한 Post 목록 입니다.</h1>
      <ul class="content-lists">
        <li v-for="item in taxonomyPostsData" :key="item.id">
          <nuxt-link :to="{ name: 'post-slug',  params: { slug: item.slug } }">
            <header>
              <h2 v-html="item.title.rendered" />
              <time-stamp :time=item.date />
            </header>
            <div class="excerpt" v-html="item.excerpt.rendered" />
          </nuxt-link>
        </li>
      </ul>

      <v-pagination
        v-model="page"
        :length="pages"
      />
    </template>
    <div v-else>
      해당 Taxonomy가 존재하지 않습니다.
    </div>
  </div>
</template>

<script>

import TimeStamp from '~/components/TimeStamp'

export default {
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
    return store.dispatch('posts/requestTaxonomyPostsData', {
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
      return this.$store.dispatch('posts/requestTaxonomyPostsData', {
        type: 'categories',
        taxonomy : this.taxonomy,
        page : this.page
      })
    },
  },
  head() {
    return {
      title: this.$route.params.slug,
      meta: [
        {
          hid: 'desc', name: 'description', content: `${this.$route.params.slug}에 대한 Post 목록 입니다.`,
        },
        {
          hid: 'ogtitle', property: 'og:title', content: this.$route.params.slug,
        },
        {
          hid: 'ogdesc', property: 'og:description', content: `${this.$route.params.slug}에 대한 Post 목록 입니다.`,
        },
        {
          hid: 'ogurl', property: 'og:url', content: `https://wireframe.kr/category/${this.$route.params.slug}`,
        }
      ],
    }
  }
};
</script>
