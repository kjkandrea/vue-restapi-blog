<template>
  <v-app id="inspire">

    <!-- aside navigation -->
    <the-navigation-menu />
    <!-- // navigation -->

    <!-- header bar -->
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="onClickNavIcon"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 204px"
        class="ml-0 pl-4"
      >
        <nuxt-link to="/"><span class="typography-logo">Wireframe</span></nuxt-link>
      </v-toolbar-title>
      <!-- <v-spacer /> -->
      <the-search-form />
    </v-app-bar>
    <!--// header bar -->

    <!-- content area -->
    <v-content
      style="padding-left: 0"
    >
      <v-container
        class="fill-height"
        fluid
        align-start
      >
        <v-row>
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
    <!--// content area -->
  </v-app>
</template>

<script>

import TheSearchForm from '~/components/TheSearchForm'
import TheNavigationMenu from '~/components/TheNavigationMenu'

export default {
  components: {
    TheSearchForm,
    TheNavigationMenu
  },
  methods: {
    onClickNavIcon() {
      this.$store.commit('setStateToggleDrawer')
    }
  }
}
</script>