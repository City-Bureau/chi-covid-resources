import React from "react"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const Page = ({ html }) => (
  <main className="main container">
    <article>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </article>
  </main>
)

const PageTemplate = ({ location, data }) => (
  <Layout location={location}>
    <IntlContextConsumer>
      {({ language: currentLanguage }) => {
        const {
          current,
          default: {
            frontmatter: { title: defaultTitle },
            html: defaultHTML,
          },
        } = data
        const title = current.frontmatter
          ? current.frontmatter.title
          : defaultTitle
        const html = current.html || defaultHTML
        return (
          <>
            <SEO title={title} lang={currentLanguage} />
            <Page html={html} />
          </>
        )
      }}
    </IntlContextConsumer>
  </Layout>
)

export default PageTemplate

export const pageQuery = graphql`
  query($pageId: String!, $language: String!) {
    current: markdownRemark(
      fields: { page: { pageId: { eq: $pageId }, lang: { eq: $language } } }
    ) {
      html
      frontmatter {
        title
        date
      }
      fields {
        page {
          path
          type
          lang
        }
      }
    }
    default: markdownRemark(
      fields: { page: { pageId: { eq: $pageId }, lang: { eq: "en" } } }
    ) {
      html
      frontmatter {
        title
        date
      }
      fields {
        page {
          path
          type
          lang
        }
      }
    }
  }
`
