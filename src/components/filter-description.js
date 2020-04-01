import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"

const getFilterValues = filters =>
  Object.values(filters)
    .map(value => (Array.isArray(value) ? value : [value]))
    .flat()

const FilterDescription = ({ filters, count }) => {
  const intl = useIntl()
  let description = ``
  const filterText = getFilterValues(filters)
    .map(filter => intl.formatMessage({ id: filter }))
    .join(", ")
  if (count === 0) {
    description = intl.formatMessage(
      { id: "filter-description-no-results" },
      { filters: filterText }
    )
  } else {
    description = intl.formatMessage(
      { id: "filter-description" },
      { count: count.toLocaleString(intl.locale), filters: filterText }
    )
  }
  return (
    <div className="filter-description">
      <h2>{description}</h2>
    </div>
  )
}

FilterDescription.propTypes = {
  filters: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
}

export default FilterDescription
