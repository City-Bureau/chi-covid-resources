import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AirtableEmbed from "../components/airtable-embed"

const FeedbackPage = ({ location }) => {
  const intl = useIntl()

  return (
    <Layout location={location}>
      <SEO location={location} title={intl.formatMessage({ id: "feedback" })} />
      <main className="main container">
        <article className="content">
          <h2>{intl.formatMessage({ id: "feedback" })}</h2>
          <p>{intl.formatMessage({ id: "feedback-intro" })}</p>
          <AirtableEmbed
            title={intl.formatMessage({ id: "feedback" })}
            embedId={intl.formatMessage({ id: "feedback-form-id" })}
          />
        </article>
      </main>
    </Layout>
  )
}

FeedbackPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default FeedbackPage
