<template>
  <div>
    <v-container v-if="category">
      <em>{{category}}</em> 에 대한 Post 목록 입니다.
    </v-container>
    <div v-else>
      해당 Category가 존재하지 않습니다.
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      category() {
        return this.$route.params.slug
      },
    },
  };
</script>
