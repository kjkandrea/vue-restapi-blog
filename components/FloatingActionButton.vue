<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Scroll to top"
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      title="Scroll to top"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>

  export default {
    name: 'DocumentationFab',

    data: () => ({ fab: false }),

    methods: {
      onScroll () {
        if (typeof window === 'undefined') return

        const top = (
          window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        )

        this.fab = top > 300
      },
      toTop () {
        this.$router.push({ hash: '' })
        this.$vuetify.goTo(0)
      },
    },
  }
</script>
