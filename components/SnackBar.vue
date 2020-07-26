<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    style="bottom:16px"
  >
  {{ text }}

    <v-btn
      color="pink"
      text
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({ 
    snackbar: true,
    text: '🚀 Wireframe은 현재 싱글 페이지 애플리케이션으로 베타 운영중에 있습니다.',
    timeout: 30000
  }),
}
</script>
