import React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import SEO from "./seo"

const Redirect = ({ intl }) => (
  <SEO
    title={`${intl.formatMessage({
      id: "meta-title",
    })} | ${intl.formatMessage({ id: "city-bureau" })}`}
    overrideTitle
    lang={intl.locale}
  />
)

export default injectIntl(Redirect)
