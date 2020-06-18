<template>
  <div class="content-wrap" v-html="pageData.content.rendered" />
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
