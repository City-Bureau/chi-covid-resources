import React from "react"
import PropTypes from "prop-types"
import Script from "react-load-script"

const AirtableEmbed = ({ title, color, embedId }) => (
  <>
    <Script url="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
    <iframe
      title={title}
      className="airtable-embed airtable-dynamic-height"
      src={`https://airtable.com/embed/${embedId}?backgroundColor=${color}`}
      frameBorder="0"
      onWheel={() => {}}
      width="100%"
      height="3059"
      style={{ background: "transparent", border: "1px solid #ccc" }}
    ></iframe>
  </>
)

AirtableEmbed.propTypes = {
  title: PropTypes.string,
  embedId: PropTypes.string.isRequired,
  color: PropTypes.string,
}

AirtableEmbed.defaultProps = {
  title: `Airtable`,
  color: `yellow`,
}

export default AirtableEmbed
