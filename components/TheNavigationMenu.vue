<template>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <div
      class="aside-navigation-wrap"
    >
      <the-profile />
      <hr>
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            :key="item.id"
            :value="item.post_excerpt === 'opened' ? true : false"
            :prepend-icon="item.classes[0]"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <nuxt-link
                  v-if="item.url !== '#'"
                  :to="navigationAnchor(item)" 
                  class="nav-link" 
                  :title="item.title"
                />
                <v-list-item-title>
                  <span class="nav-title">{{ item.title }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.child_items"
              :key="i"
              link
              style="padding-left: 72px; background-color:#f5f5f5"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <nuxt-link
                  v-if="child.url !== '#'"
                  :to="navigationAnchor(child)" 
                  class="nav-link" 
                  :title="child.title"
                />
                <v-list-item-title>
                  <span class="nav-title">{{ child.title }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <p class="powered-by">Powered by <a href="https://nuxtjs.org" target="_blank">Nuxt</a> and <a href="https://wordpress.org" target="_blank">Wordpress</a></p>
    </div>
  </v-navigation-drawer>
</template>


<script>

import TheProfile from '~/components/TheProfile';

export default {
  components: {
    TheProfile
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.navigationDrawer
      },
      set(state) {
        if (state !== this.$store.state.navigationDrawer) {
          this.$store.commit('setStateToggleDrawer')
        }
      }
    },
    items() {
      return this.$store.state.navigationData
    },
  },
  mounted() {
    this.$store.dispatch('requestNavigationData', 'header-navigation')
  },
  methods: {
    navigationAnchor(obj) {
      if(obj.object) {
        if (obj.object === 'custom') return `${obj.url}`;
        if (obj.object === 'post_tag') return `/tag/${obj.slug}`;
        return `/${obj.object}/${obj.slug}`;
      }
    }
  }
}
</script>
