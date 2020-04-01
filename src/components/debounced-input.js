import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const DebouncedInput = ({
  name,
  id,
  value,
  placeholder,
  classNames,
  onChange,
  debounceTime,
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    const handler = window.setTimeout(() => onChange(localValue), debounceTime)
    return () => window.clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue])

  return (
    <input
      name={name}
      id={id}
      className={`input ${classNames}`}
      value={localValue}
      placeholder={placeholder}
      onChange={e => setLocalValue(e.target.value)}
    />
  )
}

DebouncedInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  classNames: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
}

DebouncedInput.defaultProps = {
  value: ``,
  placeholder: ``,
  debounceTime: 500,
}

export default DebouncedInput
