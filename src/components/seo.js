import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { rtlLanguages } from "../constants"

function SEO({ location, description, lang, meta, title, overrideTitle }) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            twitterAuthor
            siteUrl
          }
        }
      }
    `
  )

  const intl = useIntl()
  const siteTitle = intl.formatMessage({ id: "site-title" })
  const metaDescription =
    description || intl.formatMessage({ id: "site-description" })

  return (
    <Helmet
      htmlAttributes={{
        lang,
        dir: rtlLanguages.includes(lang) ? `rtl` : `ltr`,
      }}
      title={title}
      titleTemplate={overrideTitle ? `%s` : `%s | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: siteMetadata.author,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: `${siteMetadata.siteUrl}${location.pathname}`,
        },
        {
          property: `og:site_name`,
          content: siteTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMetadata.twitterAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link rel="stylesheet" href="https://use.typekit.net/zck0ikq.css"></link>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Symbol,Array.prototype.flat" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  overrideTitle: false,
}

SEO.propTypes = {
  location: PropTypes.object.isRequired,
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  overrideTitle: PropTypes.bool,
}

export default SEO
