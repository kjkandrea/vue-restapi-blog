<template>
  <form
    class="d-flex"
    style="flex: 1 1 auto"
    @submit.prevent="onSubmitSearch"
  >
    <v-text-field
      v-model="search"
      ref="search"
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="포스트 검색하기"
      class="hidden-sm-and-down"
      style="max-width: 585px;"
    ></v-text-field>
  </form>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onSubmitSearch() {
      if(this.$refs.search.value.trim()) {
        let keyword = encodeURIComponent(this.search);

        this.$router.push({  path: '/search', query: { keyword : keyword} })
        this.search = '';
      }
    }
  }
}
</script>