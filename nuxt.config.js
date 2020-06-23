import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ko',
    },
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'desc',
        name: 'description',
        content: '웹 기술에 대해 이야기 합니다.'
      },
      {
        hid: 'ogtitle',
        name: 'og:title',
        content: 'Wireframe',
      }, {
        hid: 'ogdesc',
        name: 'og:description',
        content: '웹 기술에 대해 이야기 합니다.',
      }, {
        hid: 'ogtype',
        property: 'og:type',
        content: 'website',
      }, {
        hid: 'ogimage',
        property: 'og:image',
        content: 'https://wireframe.kr/wp-content/uploads/2020/06/shape.png',
      }, {
        hid: 'ogurl',
        property: 'og:url',
        content: 'https://wireframe.kr',
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '16x16',
        href: '/favicon.ico'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap'
      },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/scss/main.scss",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/disqus.js'
    },
    {
      src: '~/plugins/tocbot.js'
    },
    {
      src: '~/plugins/prism.js'
    },
    // { src: '~/plugins/vuex-persistedstate.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || 'https://wireframe.kr/wp-json/wp'
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'pageNotFound',
        path: '*',
        component: resolve(__dirname, './pages/404.vue')
      })
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      light: true,
    }
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, {
      isClient,
      isServer,
      isDev
    }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
      //console.log('webpack', config, isServer, isClient);
    },
  }
}