import React from "react"
import PropTypes from "prop-types"
import { Link, injectIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AirtableEmbed from "../components/airtable-embed"

const SuggestResourcePage = ({ location, intl }) => (
  <Layout location={location}>
    <SEO
      title={intl.formatMessage({ id: "suggest-resource" })}
      lang={intl.locale}
    />
    <main className="main container">
      <article className="content">
        <h2>{intl.formatMessage({ id: "suggest-resource" })}</h2>
        <p>{intl.formatMessage({ id: "suggest-resource-intro" })}</p>
        <p>
          {intl.formatMessage(
            { id: "suggest-resource-intro-alt-form" },
            {
              thisFormLink: (
                <Link to="/feedback/">
                  {intl.formatMessage({ id: "this-form" })}
                </Link>
              ),
            }
          )}
        </p>
        <AirtableEmbed
          title={intl.formatMessage({ id: "suggest-resource" })}
          embedId={intl.formatMessage({ id: "suggest-resource-form-id" })}
        />
      </article>
    </main>
  </Layout>
)

SuggestResourcePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default injectIntl(SuggestResourcePage)
