import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { rtlLanguages } from "../constants"

function SEO({ description, lang, meta, title, overrideTitle }) {
  const {
    site: { siteMetadata },
    socialImage: {
      childImageSharp: { fixed: socialImg },
    },
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
        socialImage: file(relativePath: { eq: "social.jpg" }) {
          childImageSharp {
            fixed(width: 1023) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  const intl = useIntl()
  const siteTitle = intl.formatMessage({ id: "meta-title" })
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
          property: `og:image`,
          content: `${siteMetadata.siteUrl}${socialImg.src}`,
        },
        {
          property: `og:image:width`,
          content: socialImg.width,
        },
        {
          property: `og:image:height`,
          content: socialImg.height,
        },
        {
          property: `og:image:alt`,
          content: intl.formatMessage({ id: "logo-alt" }),
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
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
        {
          name: `twitter:image:src`,
          content: `${siteMetadata.siteUrl}${socialImg.src}`,
        },
        {
          property: `twitter:image:alt`,
          content: intl.formatMessage({ id: "logo-alt" }),
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  overrideTitle: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  overrideTitle: PropTypes.bool,
}

export default SEO
