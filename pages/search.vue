<template>
  <div>
    <client-only placeholder="Loading...">
      <template v-if="keyword">
        <h1>'{{keyword}}' 에 대한 검색 결과입니다.</h1>
          <ul v-if="resultPostsData[0]">
            <li v-for="item in resultPostsData" :key="item.id">
              <nuxt-link :to="{ name: 'post-slug',  params: { slug: item.slug } }">
                <h4 v-html="highlight(item.title.rendered)" />
                <p v-html="highlight(item.excerpt.rendered)" />
              </nuxt-link>
            </li>
          </ul>
        
        <div v-else>
          해당 키워드에 대한 검색결과가 존재하지 않습니다.
        </div>
      </template>
      <h1 v-else>
        키워드를 입력해주세요.
      </h1>
    </client-only>
  </div>
</template>

<script>


export default {
  computed: {
    keyword() {
      return decodeURIComponent(this.$store.state.search.keyword);
    },
    resultPostsData() {
      return this.$store.state.search.resultPostsData;
    }
  },
  async middleware( { store, query } ) {
    let key = await query.keyword

    if(key) return store.dispatch('search/requestResultPostData', key)
  },
  methods: {
    highlight(el) {
      return el.replace(new RegExp(this.keyword, "gi"), match => {
          return '<em class="highlightText">' + match + '</em>';
      });
    }
  }
};
</script>

<style>
.highlightText {
    background: yellow;
}
</style>