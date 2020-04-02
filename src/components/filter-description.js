import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"

const getFilterValues = filters =>
  Object.values(filters)
    .map(value => (Array.isArray(value) ? value : [value]))
    .flat()

const FilterDescription = ({ filters, count }) => {
  const intl = useIntl()
  const filterText = getFilterValues(filters)
    .map(filter => intl.formatMessage({ id: filter }))
    .join(", ")
  const params = {
    filters: filterText,
    count: count.toLocaleString(intl.locale),
  }

  let messageId = `filter-description-filters`
  if (filterText === ``) {
    messageId = `filter-description`
  } else if (count === 0) {
    messageId = `filter-description-no-results`
  } else if (count === 1) {
    messageId = `filter-description-one-result`
  }
  return (
    <div className="filter-description">
      <h2>{intl.formatMessage({ id: messageId }, params)}</h2>
    </div>
  )
}

FilterDescription.propTypes = {
  filters: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
}

export default FilterDescription
