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
      <div class="content-wrap" v-html="pageData.content.rendered" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    pageData() {
      return this.$store.state.pages.pageData;
    },
  },
  middleware({ store }) {
    return store.dispatch('pages/requestPageData', 'home')
  }
}
</script>
