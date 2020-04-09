import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AirtableEmbed from "../components/airtable-embed"

const SuggestResourcePage = ({ location }) => {
  const intl = useIntl()

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={intl.formatMessage({ id: "suggest-resource" })}
      />
      <main className="article container">
        <article className="content">
          <AirtableEmbed
            embedId={intl.formatMessage({ id: "suggest-resource-form-id" })}
          />
        </article>
      </main>
    </Layout>
  )
}

SuggestResourcePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default SuggestResourcePage
