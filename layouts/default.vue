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
        <span>Wireframe</span>
      </v-toolbar-title>
      <!-- <v-spacer /> -->
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        style="max-width: 585px"
      ></v-text-field>
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

import TheNavigationMenu from '~/components/TheNavigationMenu'

export default {
  components: {
    TheNavigationMenu
  },
  props: {
    source: String,
  },
  data: () => ({
    items: [
      { icon: 'mdi-home', text: 'Home' },
      { icon: 'mdi-account', text: 'About' },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Categories',
        model: false,
        children: [
          { text: 'TIL (Today I Learned)' },
          { text: 'javascript' },
          { text: 'Vuejs' },
          { text: 'React' },
          { text: 'nodejs' },
          { text: 'git' },
          { text: 'webpack' },
          { text: 'MySQL' },
          { text: 'etc' }
        ],
      }
    ],
  }),
  methods: {
    onClickNavIcon() {
      this.$store.commit('setStateToggleDrawer')
    }
  }
}
</script>
