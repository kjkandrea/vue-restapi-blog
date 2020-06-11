<template>
  <div>
    <v-container v-if="post">
      <em>{{post}} slug</em> 에 대한 Page 입니다.
    </v-container>
    <div v-else>
      해당 Post가 존재하지 않습니다.
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      post() {
        return this.$route.params.slug
      },
    },
  };
</script>
