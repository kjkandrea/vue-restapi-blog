<template>
  <div class="content-wrap">
    <template v-if="postData">
      <div class="content-header">
        <h1 v-html="postData.title.rendered" />
        <time-stamp :time=postData.date />
      </div>
      <div class="js-toc">
        <!-- tocbot -->
      </div>
      <hr>
      <div id="content-body" class="content-body" v-html="postData.content.rendered" />
      <Disqus />
    </template>
    <h2 v-else>해당 Post가 존재하지 않습니다.</h2>
  </div>
</template>

<script>
import TimeStamp from '~/components/TimeStamp'

export default {
  components: {
    TimeStamp
  },
  computed: {
    postData() {
      return this.$store.state.posts.postData;
    }
  },
  middleware({ store, params }) {
    return store.dispatch('posts/requestPostData', params.slug)
  },
  mounted() {
    this.$InjectedTOC()
    this.$InjectedPrism()
  },
  head() {
    return {
      title: this.postData.title.rendered,
      meta: [
        {
          hid: 'desc', name: 'description', content: this.postData.description,
        }, {
          hid: 'ogtitle', property: 'og:title', content: this.postData.title.rendered,
        }, {
          hid: 'ogdesc', property: 'og:description', content: this.postData.description,
        }, 
        {
          hid: 'ogimage', property: 'og:image', content: this.postData.featured_image_url ? this.postData.featured_image_url : 'https://wireframe.kr/wp-content/uploads/2020/06/shape.png',
        }, 
        {
          hid: 'ogurl', property: 'og:url', content: `https://wireframe.kr/post/${this.postData.slug}`,
        }
      ],
    }
  }
};
</script>