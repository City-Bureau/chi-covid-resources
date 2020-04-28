import React from "react"
import PropTypes from "prop-types"
import { injectIntl } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location, intl }) => (
  <Layout location={location} lang={intl.locale}>
    <SEO
      lang={intl.locale}
      title={intl.formatMessage({ id: "not-found-title" })}
    />
    <main className="main container">
      <div className="content">
        <h1>{intl.formatMessage({ id: "not-found-title" })}</h1>
        <p>{intl.formatMessage({ id: "not-found-text" })}</p>
      </div>
    </main>
  </Layout>
)

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default injectIntl(NotFoundPage)
