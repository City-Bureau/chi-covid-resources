require(`dotenv`).config()

const siteUrl = process.env.SITE_URL || `https://covid.citybureau.org`

const languages = [`en`, `es`, `pl`, `tl`, `ur`]

module.exports = {
  siteMetadata: {
    title: `Chicago COVID Resources`,
    siteUrl,
    author: `City Bureau`,
    twitterAuthor: `@city_bureau`,
    defaultLanguage: `en`,
    flagResourcePath: process.env.FLAG_RESOURCE_PATH,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages,
        // language file path
        defaultLanguage: `en`,
        redirect: true,
        redirectComponent: require.resolve(`./src/components/redirect.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit: {
          id: `pbz7tnn`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`UA-68381272-7`],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE,
            tableName: process.env.AIRTABLE_TABLE,
            tableView: process.env.AIRTABLE_VIEW,
            queryName: `resources`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `COVID Resource Finder`,
        short_name: `COVID Resources`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sentry`,
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled:
          process.env.NODE_ENV === `production` && !siteUrl.includes(`stage`),
        ignoreErrors: [`ChunkLoadError`],
        blacklistUrls: [/extensions\//i, /^chrome:\/\//i],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        resolveEnv: () =>
          siteUrl.includes(`stage`) ? `development` : `production`,
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          production: {
            policy: [{ userAgent: "*", disallow: [""] }],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/embed*`],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage(filter: {context: {intl: {routed: {eq: false}}}}) {
            edges {
              node {
                path
              }
            }
          }
        }
        `,
        serialize: ({
          site: {
            siteMetadata: { siteUrl },
          },
          allSitePage,
        }) =>
          allSitePage.edges.map(({ node: { path } }) => ({
            url: siteUrl + path,
            changefreq: `daily`,
            priority: path === `/` ? 1.0 : 0.7,
            links: languages
              .map(lang => ({ lang, url: `${siteUrl}/${lang}${path}` }))
              .concat([{ lang: `x-default`, url: siteUrl + path }]),
          })),
      },
    },
    // `gatsby-plugin-offline`,
  ],
}
