import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"

const FilterDescription = ({ filters, count }) => {
  const intl = useIntl()
  return <h2>{intl.formatMessage({ id: "filter-description" }, { count })}</h2>
}

FilterDescription.propTypes = {
  filters: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
}

export default FilterDescription
