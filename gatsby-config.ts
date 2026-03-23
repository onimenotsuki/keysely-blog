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
  }, {
   resolve: "gatsby-plugin-typesense",
   options: {
     rootDir: `${__dirname}/public`,
     exclude: /^\/(?!articles\/).*/,
     collectionSchema: {
       name: process.env.TYPESENSE_BLOG_COLLECTION ?? "blog_articles_v1",
       fields: [
         {
           name: "title",
           type: "string",
         },
         {
           name: "slug",
           type: "string",
           optional: true,
         },
        {
          name: "category",
          type: "string",
          optional: true,
        },
        {
          name: "cover_image",
          type: "string",
          optional: true,
        },
         {
           name: "page_path",
           type: "string",
         },
         {
           name: "page_priority_score",
           type: "int32",
         },
       ],
       default_sorting_field: "page_priority_score",
     },
     server: {
       apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
       nodes: [
         {
           host: process.env.TYPESENSE_HOST ?? "localhost",
           port: process.env.TYPESENSE_PORT ?? "8108",
           protocol: process.env.TYPESENSE_PROTOCOL ?? "http",
         },
       ],
     },
   },
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-postcss", {
   resolve: "gatsby-plugin-google-tagmanager",
   options: {
     id: process.env.GATSBY_GOOGLE_TAG_MANAGER_ID,
     includeInDevelopment: false,
     defaultDataLayer: { platform: "gatsby" },
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
