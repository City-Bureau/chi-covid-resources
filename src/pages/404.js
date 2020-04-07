import React from "react"
import PropTypes from "prop-types"
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ location }) => {
  const intl = useIntl()
  return (
    <Layout location={location} lang={intl.locale}>
      <SEO title="404: Not found" />
      <main className="main container">
        <div className="content">
          <h1>
            <FormattedMessage id="not-found-title" />
          </h1>
          <p>
            <FormattedMessage id="not-found-text" />
          </p>
        </div>
      </main>
    </Layout>
  )
}

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default NotFoundPage
