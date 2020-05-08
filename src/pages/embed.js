import React, { useMemo, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import * as pym from "pym.js"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FilterDescription from "../components/filter-description"
import ResourceRow from "../components/resource-row"
import ToastMessage from "../components/toast-message"
import ReportErrorModal from "../components/report-error-modal"

import {
  getFiltersWithValues,
  applyFilters,
  loadQueryParamFilters,
  sortByLevel,
  LEVEL_ENUM,
  PAGE_SIZE,
} from "./index"

const EmbedPage = ({
  location,
  data: {
    site: {
      siteMetadata: { reportErrorPath },
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
  const [filters, setFilters] = useState(defaultFilters)
  const allResults = useMemo(
    () =>
      edges
        .map(({ node: { recordId, data } }) => ({
          id: recordId,
          ...data,
        }))
        .sort(sortByLevel(LEVEL_ENUM)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const results = useMemo(
    () => applyFilters(getFiltersWithValues(filters), allResults),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.search, filters.zip, filters.what, filters.who, filters.languages]
  )
  const [page, setPage] = useState(1)
  const [flagId, setFlagId] = useState(``)
  const [toast, setToast] = useState(``)
  const intl = useIntl()

  useEffect(() => {
    const pymChild = new pym.Child({ polling: 500 })
    pymChild.sendHeight()
    // https://stackoverflow.com/a/59653180
    const urlFilters = loadQueryParamFilters(location, defaultFilters)
    if (Object.keys(getFiltersWithValues(urlFilters)).length) {
      setFilters(urlFilters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout location={location} hide>
      <SEO
        title={`${intl.formatMessage({
          id: "meta-title",
        })} | ${intl.formatMessage({ id: "site-owner" })}`}
        overrideTitle
        lang={intl.locale}
      />
      {flagId && (
        <ReportErrorModal
          reportErrorPath={reportErrorPath}
          id={flagId}
          onSuccess={() =>
            setToast(intl.formatMessage({ id: "flag-resource-success" }))
          }
          onClose={() => setFlagId(``)}
        />
      )}
      <ToastMessage show={toast !== ``} onHide={() => setToast(``)}>
        {toast}
      </ToastMessage>
      <main className="main filter-container">
        <div className="section filter-results-section">
          <FilterDescription
            filters={getFiltersWithValues(filters)}
            count={results.length}
          />
          <div className="filter-results">
            {results.slice(0, page * PAGE_SIZE).map(result => (
              <ResourceRow
                key={result.id}
                onFlag={() => setFlagId(result.id)}
                {...result}
              />
            ))}
          </div>
          <div className="filter-results-footer">
            {results.length > PAGE_SIZE * page ? (
              <button
                type="button"
                className="button is-primary"
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

EmbedPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        reportErrorPath
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
            descriptiones: Description_ES
            who: Who
            what: Category
            languages: Languages
            qualifications: Qualifications
            level: Level
            lastUpdated: Last_Updated
          }
        }
      }
    }
  }
`

export default EmbedPage
