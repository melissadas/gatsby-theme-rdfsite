const path = require('path');
const tailwindcss = require(`tailwindcss`);

module.exports = {
  plugins: [
    // RDF processing
    // theme base data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rdfData`,
        path: `${__dirname}/data`
      }
    },
    // user data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rdfData`,
        path: `./data`
      }
    },
    // `gatsby-transformer-rdf`,
    {
      // Standard plugin with options example
      resolve: require.resolve(`./plugins/gatsby-transformer-rdf`)
    },

    // mdx processing
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./pages`
      }
    },
    `gatsby-plugin-mdx`,
    // support for embeds from third-parties
    `@pauliescanlon/gatsby-mdx-embed`,

    // svg inlining
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },

    // postcss support
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          tailwindcss(path.join(__dirname, '/tailwind.config.js')),
          require(`postcss-nested`),
          require(`autoprefixer`),
          require(`cssnano`)({
            preset: `default`
          })
        ]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/main.css`, `src/styles/custom.css`],
        content: [
          path.join(__dirname, 'src/**/!(*.d).{ts,js,jsx,tsx}'),
          path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),
          path.join(process.cwd(), '..', 'data/**/*.ttl'),
          path.join(process.cwd(), '..', 'pages/**/*.{md,mdx}')
        ],
        extractors: [
          {
            extractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
            extensions: ['ttl']
          }
        ]
      }
    },

    // emotion styling support
    `gatsby-plugin-emotion`,

    // default gatsby plugins
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        background_color: `#50b4c8`,
        theme_color: `#50b4c8`,
        display: `minimal-ui`,
        icon: `./images/site-icon.png`
      }
    }
  ]
};
