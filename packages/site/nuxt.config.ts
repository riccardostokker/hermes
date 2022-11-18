// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({

    modules: [
        '@nuxtjs/tailwindcss'
    ],

    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],

    app: {
        head: {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Lobster&family=Lobster+Two&display=swap'
                }
            ]
        }
    }

    // i18n: {
    //     strategy: 'prefix',
    //     locales: [
    //         {
    //             code: 'en',
    //             file: 'en.json'
    //         }
    //     ],
    //     defaultLocale: 'en',
    //     lazy: true,
    //     langDir: 'locales/',
    //     vueI18n: {
    //         datetimeFormats: {
    //             'en': {
    //                 short: {
    //                     year: 'numeric',
    //                     month: 'short',
    //                     day: 'numeric'
    //                 },
    //                 long: {
    //                     year: 'numeric',
    //                     month: 'long',
    //                     day: 'numeric',
    //                     weekday: 'long',
    //                     hour: 'numeric',
    //                     minute: 'numeric'
    //                 }
    //             }
    //         }
    //     }
    // }

});
