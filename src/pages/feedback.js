import React from "react"
import PropTypes from "prop-types"
import { Link, injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AirtableEmbed from "../components/airtable-embed"

const FeedbackPage = ({ location, intl }) => (
  <Layout location={location}>
    <SEO title={intl.formatMessage({ id: "feedback" })} lang={intl.locale} />
    <main className="main container">
      <article className="content">
        <h2>{intl.formatMessage({ id: "feedback" })}</h2>
        <p>{intl.formatMessage({ id: "feedback-intro" })}</p>
        <p>
          {intl.formatMessage(
            { id: "feedback-intro-alt-form" },
            {
              thisFormLink: (
                <Link to="/suggest-resource/">
                  {intl.formatMessage({ id: "this-form" })}
                </Link>
              ),
            }
          )}
        </p>
        <AirtableEmbed
          title={intl.formatMessage({ id: "feedback" })}
          embedId={intl.formatMessage({ id: "feedback-form-id" })}
        />
      </article>
    </main>
  </Layout>
)

FeedbackPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default injectIntl(FeedbackPage)
