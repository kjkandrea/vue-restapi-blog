<template>
  <div>
    <v-container v-if="pageData">
      <h2 v-html="pageData.title.rendered"></h2>
      <div v-html="pageData.content.rendered">

      </div>
    </v-container>
    <div v-else>
      해당 Page가 존재하지 않습니다.
    </div>
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
    }
  };
</script>
