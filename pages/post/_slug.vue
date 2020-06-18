<template>
  <v-layout
    column
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="content-wrap">
        <template v-if="postData">
          <div class="content-header">
            <h1 v-html="postData.title.rendered" />
            <time-stamp :time=postData.date />
          </div>
          <div class="js-toc">
            <!-- tocbot -->
          </div>
          <div id="content-body" class="content-body" v-html="postData.content.rendered" />
        </template>
        <h2 v-else>해당 Post가 존재하지 않습니다.</h2>
      </div>
    </v-flex>
  </v-layout>
      <Disqus />
</template>

<script>
import TimeStamp from '~/components/TimeStamp'

export default {
  components: {
    TimeStamp
  },
  data() {
    return {
      postContent: ''
    }
  },
  computed: {
    postData() {
      return this.$store.state.posts.postData;
    }
  },
  middleware({ store, params }) {
    return store.dispatch('posts/requestPostData', params.slug)
  },
  mounted () {
    this.$InjectedTOC()
    this.$InjectedPrism()
  }
};
</script>