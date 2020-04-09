import React, { useMemo, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import fromEntries from "object.fromentries"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Fuse from "fuse.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilterDescription from "../components/filter-description"
import ResourceRow from "../components/resource-row"
import CheckboxGroup from "../components/checkbox-group"
import DebouncedInput from "../components/debounced-input"
import ScrollTopButton from "../components/scroll-top-button"
import ToastMessage from "../components/toast-message"

import { useDebounce } from "../hooks"
import { ZIP_MAP } from "../zips"
import { DEFAULT_DEBOUNCE } from "../constants"

const PAGE_SIZE = 10

const WHAT_OPTIONS = [
  "Money",
  "Food",
  "Housing",
  "Health",
  "Utilities",
  "Legal Help",
]
const WHO_OPTIONS = [
  "Families",
  "Immigrants",
  "LGBTQI",
  "Business Owners",
  "Students",
]

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

const applyFilters = (filters, data) => {
  const filtered = data.filter(d =>
    Object.entries(filters).every(([key, value]) => {
      // Ignore search, apply afterwards to save time
      if (key === `search`) {
        return true
      }
      if (key === `zip` && value.replace(/\D/g, ``) in ZIP_MAP) {
        const zipVal = value.replace(/\D/g, ``)
        return (
          !!d[key] &&
          d.level &&
          d.level === "Neighborhood" &&
          ZIP_MAP[zipVal].some(z => d[key].includes(z))
        )
      } else if (Array.isArray(value)) {
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
  if (filters.search?.trim()) {
    return new Fuse(filtered, {
      minMatchCharLength: 3,
      shouldSort: true,
      threshold: 0.3,
      distance: 500,
      keys: [
        `name`,
        `description`,
        `descriptiones`,
        `who`,
        `what`,
        `languages`,
      ],
    })
      .search(filters.search.trim())
      .map(({ item }) => item)
  } else {
    return filtered
  }
}

const loadQueryParamFilters = (location, filters) =>
  fromEntries(
    Object.entries(fromEntries(new URLSearchParams(location.search)))
      .filter(([key, value]) => value !== "" && key in filters)
      .map(([key, value]) =>
        Array.isArray(filters[key]) ? [key, value.split(",")] : [key, value]
      )
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

const sendGaQueryParams = () => {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    !window.location.host.includes("stage") &&
    window.location.search
  ) {
    window.gtag("event", "filter", {
      event_category: window.location.pathname,
      event_label: window.location.search,
    })
  } else {
    console.log(window.location.search)
  }
}

const IndexPage = ({
  location,
  data: {
    site: {
      siteMetadata: { flagResourcePath },
    },
    allAirtable: { edges },
  },
}) => {
  const defaultFilters = {
    search: ``,
    zip: ``,
    who: [],
    what: [],
    languages: [],
  }
  const urlFilters = loadQueryParamFilters(location, defaultFilters)
  const allResults = edges.map(({ node: { recordId, data } }) => ({
    id: recordId,
    ...data,
  }))

  // Set initial filters from URL params
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...urlFilters,
  })
  const debounceFilters = useDebounce(filters, DEFAULT_DEBOUNCE)
  const results = useMemo(
    () => applyFilters(getFiltersWithValues(debounceFilters), allResults),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      debounceFilters.search,
      debounceFilters.zip,
      debounceFilters.what,
      debounceFilters.who,
      debounceFilters.languages,
    ]
  )
  const langOptions = useMemo(
    () => getUniqueOptions(allResults, `languages`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const [expanded, setExpanded] = useState(false)
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState(``)
  const intl = useIntl()

  const translateOptions = options =>
    options.map(value => ({ value, label: intl.formatMessage({ id: value }) }))

  // Function for creating a new flagged resource record in Airtable
  const flagResource = ({ id }) =>
    fetch(`${flagResourcePath}?Resource=[${id}]`)
      .then(res => res.json())
      .then(() => setToast(intl.formatMessage({ id: "flag-resource-success" })))
      .catch(err => console.error(err))

  useEffect(() => {
    updateQueryParams(getFiltersWithValues(debounceFilters))
    sendGaQueryParams()
    if (page !== 1) setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debounceFilters.search,
    debounceFilters.zip,
    debounceFilters.what,
    debounceFilters.who,
    debounceFilters.languages,
  ])

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={`${intl.formatMessage({
          id: "site-title",
        })} | ${intl.formatMessage({ id: "city-bureau" })}`}
        overrideTitle
        lang={intl.locale}
      />
      <ToastMessage show={toast !== ``} onHide={() => setToast(``)}>
        {toast}
      </ToastMessage>
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
              &nbsp;
              {intl.formatMessage({
                id: expanded ? "hide-filters" : "show-filters",
              })}
            </button>
          </div>
          <form
            id="filter-form"
            className={expanded ? `` : `is-hidden-mobile`}
            method="GET"
            name="filter"
            role="search"
            action=""
          >
            <div className="filter-group search">
              <DebouncedInput
                name="search"
                id="search"
                classNames="search"
                inputType="search"
                value={filters.search}
                aria-label={intl.formatMessage({ id: "search-label" })}
                placeholder={intl.formatMessage({ id: "search-label" })}
                onChange={search => setFilters({ ...filters, search })}
              />
              <FontAwesomeIcon icon="search" />
            </div>
            <CheckboxGroup
              name="what"
              label={intl.formatMessage({ id: "what-label" })}
              options={translateOptions(WHAT_OPTIONS)}
              value={filters.what}
              onChange={what => setFilters({ ...filters, what })}
              classNames="filter-group"
            />
            <CheckboxGroup
              name="who"
              label={intl.formatMessage({ id: "who-label" })}
              options={translateOptions(WHO_OPTIONS)}
              value={filters.who}
              onChange={who => setFilters({ ...filters, who })}
              classNames="filter-group"
            />
            <div className="filter-group">
              <label className="label" htmlFor="zip-search">
                {intl.formatMessage({ id: "zip-label" })}
              </label>
              <DebouncedInput
                name="zip"
                id="zip-search"
                value={filters.zip}
                placeholder={intl.formatMessage({
                  id: "zip-placeholder",
                })}
                onChange={zip => setFilters({ ...filters, zip })}
              />
            </div>
            <CheckboxGroup
              name="languages"
              label={intl.formatMessage({ id: "languages-label" })}
              options={translateOptions(langOptions)}
              value={filters.languages}
              onChange={languages => setFilters({ ...filters, languages })}
              classNames="filter-group"
            />
            <button
              className={`button is-info clear-filters ${
                Object.entries(getFiltersWithValues(debounceFilters)).length ===
                0
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
            filters={getFiltersWithValues(debounceFilters)}
            count={results.length}
          />
          <div className="filter-results">
            {results.slice(0, page * PAGE_SIZE).map(result => (
              <ResourceRow
                key={result.id}
                onFlag={() => flagResource(result)}
                {...result}
              />
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
    site {
      siteMetadata {
        flagResourcePath
      }
    }
    allAirtable {
      edges {
        node {
          recordId
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
            languages: Languages
            level: Level
            lastUpdated: Last_Updated
          }
        }
      }
    }
  }
`

export default IndexPage
