import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Keysely Blog — Guías y consejos sobre espacios de trabajo`,
    description: `Descubre tendencias, guías y consejos sobre espacios de trabajo flexibles, coworking y oficinas en México.`,
    siteUrl: `https://blog.keysely.com`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      "spaceId": process.env.GATSBY_CONTENTFUL_SPACE_ID,
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-postcss", {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: [ process.env.GATSBY_GOOGLE_TAG_MANAGER_ID],
    }
  }, "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: "Keysely Blog",
      short_name: "Keysely",
      start_url: "/",
      background_color: "#ffffff",
      theme_color: "#0f172a",
      display: "standalone",
      icon: "src/images/manifest-icon.png",
      icon_options: {
        purpose: "any maskable",
      },
      include_favicon: false,
    }
  }, "gatsby-transformer-remark", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};

export default config;
