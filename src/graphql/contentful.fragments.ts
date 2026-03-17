import { graphql } from "gatsby"

export const ContentfulCategoryFragment = graphql`
  fragment ContentfulCategoryFragment on ContentfulCategory {
    id
    slug
    title
    iconName
  }
`

export const ContentfulAuthorFragment = graphql`
  fragment ContentfulAuthorFragment on ContentfulBlogPostAuthor {
    username
    firstName
    lastName
    bio {
      bio
    }
    avatar {
      description
      gatsbyImage(cropFocus: CENTER, height: 300, width: 300, aspectRatio: 1)
    }
  }
`

export const ContentfulCoverImageFragment = graphql`
  fragment ContentfulCoverImageFragment on ContentfulAsset {
    gatsbyImage(width: 1200)
  }
`

export const ContentfulBlogPostFragment = graphql`
  fragment ContentfulBlogPostFragment on ContentfulBlogPost {
    id
    slug
    seoKeywords
    title
    abstract
    categories {
      ...ContentfulCategoryFragment
    }
    author {
      ...ContentfulAuthorFragment
    }
    coverImage {
      ...ContentfulCoverImageFragment
    }
    content {
      raw
    }
  }
`

