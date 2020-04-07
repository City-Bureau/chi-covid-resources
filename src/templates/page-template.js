import React from "react"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"
import { getResolvedVersionForLanguage } from "../utils"

const processor = remark()
  .use(recommended)
  .use(html)

export const Page = ({ markdown }) => (
  <main className="main container">
    <article>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: processor.processSync(markdown),
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
          current: {
            fields: {
              page: { lang: fallbackLang, versions },
            },
          },
        } = data
        const { title, markdown } = getResolvedVersionForLanguage({
          versions,
          lang: currentLanguage,
          fallbackLang,
        })

        return (
          <>
            <SEO location={location} title={title} lang={currentLanguage} />
            <Page markdown={markdown} />
          </>
        )
      }}
    </IntlContextConsumer>
  </Layout>
)

export default PageTemplate

export const pageQuery = graphql`
  fragment FileFields on File {
    fields {
      page {
        path
        type
        lang
        versions {
          lang
          date
          title
          markdown
        }
      }
    }
  }
  query($relativePath: String!) {
    current: file(relativePath: { eq: $relativePath }) {
      ...FileFields
    }
  }
`
