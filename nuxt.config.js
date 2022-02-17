import colors from 'vuetify/es5/util/colors'

const isDev = process.env.NODE_ENV == 'development';

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kontora',
    title: 'kontora',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

    '~styles/reset.sass',

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    { src:  '~plugins/http', ssr: true },

    { src:  '~plugins/uuid', ssr: true },

    { src:  '~plugins/THREEx', ssr: false },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxt/http',

    'cookie-universal-nuxt',
  ],

  http: {

		host: isDev ? '10.10.10.242' : '10.10.10.242',
		port: '36000',
		prefix: '/api/virtual_reality/',

		proxy: false,

	},

	server: {

		host: '0.0.0.0',
		port: process.env.PORT || 3000,

	},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // server: {
  //   port: 3000,
  //   host: '0.0.0.0',
  // },  

  pageTransition: 'page',

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {

          primary: '#2DCDFF',

          accent: colors.grey.darken3,

          secondary: '#07305E',

          dark: '#03153d',

          info: colors.teal.lighten1,

          warning: colors.amber.base,

          error: colors.deepOrange.accent4,

          success: colors.green.accent3

        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
