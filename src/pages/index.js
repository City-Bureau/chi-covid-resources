import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilterDescription from "../components/filter-description"
import ResourceRow from "../components/resource-row"
import CheckboxGroup from "../components/checkbox-group"
import ScrollTopButton from "../components/scroll-top-button"

import fromEntries from "object.fromentries"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PAGE_SIZE = 25

const getUniqueOptions = (results, prop) => [
  ...new Set(
    results.reduce((prev, curr) => {
      const val = curr[prop] || []
      return [...prev, ...(Array.isArray(val) ? val : [val])]
    }, [])
  ),
]

const getFiltersWithValues = filters =>
  fromEntries(
    Object.entries(filters).filter(
      ([key, value]) =>
        !(Array.isArray(value) && value.length === 0) && value !== ``
    )
  )

const applyFilters = (filters, data) =>
  data.filter(d =>
    Object.entries(filters).every(([key, value]) => {
      if (Array.isArray(value)) {
        // If data value is array, check for overlap
        return Array.isArray(d[key])
          ? d[key].some(v => value.includes(v))
          : value.includes(d[key])
      } else if (typeof value === `string`) {
        return (d[key] || ``).toLowerCase().includes(value.toLowerCase().trim())
      }
      return true
    })
  )

const updateQueryParams = filters => {
  const params = new URLSearchParams(filters)
  const suffix = params.toString() === `` ? `` : `?${params}`
  window.history.replaceState(
    {},
    window.document.title,
    `${window.location.protocol}//${window.location.host}${window.location.pathname}${suffix}`
  )
}

const IndexPage = ({
  location,
  data: {
    allAirtable: { edges },
  },
}) => {
  const defaultFilters = { zip: ``, who: [], what: [] }
  const allResults = edges.map(({ node: { id, data } }) => ({ id, ...data }))
  const [filters, setFilters] = useState(defaultFilters)
  const filtersWithValues = getFiltersWithValues(filters)
  const [results, setResults] = useState(
    applyFilters(filtersWithValues, allResults)
  )
  const [expanded, setExpanded] = useState(false)
  const [page, setPage] = useState(1)
  const intl = useIntl()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const params = fromEntries(
      Object.entries(fromEntries(urlParams))
        .filter(([key, value]) => value !== "" && key in filters)
        .map(([key, value]) =>
          Array.isArray(filters[key]) ? [key, value.split(",")] : [key, value]
        )
    )
    setFilters(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filterValues = getFiltersWithValues(filters)
    updateQueryParams(filterValues)
    setPage(1)
    setResults(applyFilters(filterValues, allResults))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <Layout location={location}>
      <SEO title={intl.formatMessage({ id: "home" })} />
      <main className="main filter-container">
        <aside className="section filter-controls">
          <div className="filter-header">
            <h1 className="header">
              {intl.formatMessage({ id: "filter-title" })}
            </h1>
            <button
              type="button"
              className="is-hidden-tablet is-primary button"
              aria-haspopup="true"
              aria-expanded={expanded.toString()}
              aria-controls="filter-form"
              onClick={() => setExpanded(!expanded)}
            >
              <FontAwesomeIcon icon="filter" />
              &nbsp;{intl.formatMessage({ id: "toggle-filters" })}
            </button>
          </div>
          <form
            id="filter-form"
            className={expanded ? `` : `is-hidden-mobile`}
            method="GET"
            name="filter"
            action=""
          >
            <CheckboxGroup
              name="what"
              label={intl.formatMessage({ id: "what-label" })}
              options={getUniqueOptions(allResults, `what`)}
              value={filters.what}
              onChange={what => setFilters({ ...filters, what })}
              classNames="filter-group"
            />
            <CheckboxGroup
              name="who"
              label={intl.formatMessage({ id: "who-label" })}
              options={getUniqueOptions(allResults, `who`)}
              value={filters.who}
              onChange={who => setFilters({ ...filters, who })}
              classNames="filter-group"
            />
            <div className="filter-group">
              <label className="label" htmlFor="zip-search">
                {intl.formatMessage({ id: "zip-label" })}
              </label>
              <input className="input" id="zip-search" />
            </div>
            <CheckboxGroup
              name="languages"
              label={intl.formatMessage({ id: "languages-label" })}
              options={getUniqueOptions(allResults, `languages`)}
              value={filters.languages}
              onChange={languages => setFilters({ ...filters, languages })}
              classNames="filter-group"
            />
            <button
              className={`button is-info clear-filters ${
                Object.entries(filtersWithValues).length === 0
                  ? `is-hidden`
                  : ``
              }`}
              type="button"
              onClick={() => setFilters(defaultFilters)}
            >
              {intl.formatMessage({ id: "clear-filters" })}
            </button>
          </form>
          <ScrollTopButton />
        </aside>
        <div className="section filter-results-section">
          <FilterDescription
            filters={filtersWithValues}
            count={results.length}
          />
          <div className="filter-results">
            {results.slice(0, page * PAGE_SIZE).map(result => (
              <ResourceRow key={result.id} {...result} />
            ))}
          </div>
          <div className="filter-results-footer">
            {results.length > PAGE_SIZE * page ? (
              <button
                type="button"
                className="button"
                onClick={() => setPage(page + 1)}
              >
                {intl.formatMessage({ id: "load-more-results" })}
              </button>
            ) : (
              ``
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query {
    allAirtable {
      edges {
        node {
          id
          data {
            name: Name
            link: Link
            phone: Phone
            email: Email
            hours: Hours
            address: Address
            zip: ZIP
            description: Description
            descriptionen: Description_EN
            descriptiones: Description_ES
            who: Who
            what: Category
            restrictions: Restrictions
            languages: Languages
            level: Level
            type: Type
            created: Created
            lastUpdated: Last_Updated
          }
        }
      }
    }
  }
`

export default IndexPage
