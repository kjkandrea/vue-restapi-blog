<template>
  <div class="content-wrap">
    <template v-if="pageData">
      <div class="content-header">
        <h1 v-html="pageData.title.rendered" />
      </div>
      <hr>
      <div id="content-body" class="content-body" v-html="pageData.content.rendered" />
    </template>
    <h2 v-else>해당 Page가 존재하지 않습니다.</h2>
  </div>
</template>

<script>
  export default {
    computed: {
      pageData() {
        return this.$store.state.pages.pageData;
      },
    },
    middleware({ store, params }) {
      store.dispatch('pages/requestPageData', params.slug)
    },
    head() {
      return {
        title: this.pageData.title.rendered,
        meta: [
          {
            hid: 'ogtitle', property: 'og:title', content: this.pageData.title.rendered,
          },
          {
            hid: 'ogurl', property: 'og:url', content: `https://wireframe.kr/page/${this.pageData.slug}`,
          }
        ],
      }
    }
  };
</script>
