<template>
  <div>
    <v-container v-if="postData">
      <h2 v-html="postData.title.rendered"></h2>
      <div v-html="postData.content.rendered">

      </div>
    </v-container>
    <div v-else>
      해당 Post가 존재하지 않습니다.
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      postData() {
        return this.$store.state.posts.postData;
      },
    },
    middleware({ store, params }) {
      store.dispatch('posts/requestPostData', params.slug)
    }
  };
</script>
