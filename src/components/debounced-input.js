import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import { DEFAULT_DEBOUNCE } from "../constants"

const DebouncedInput = ({
  name,
  id,
  value,
  label,
  placeholder,
  inputType,
  classNames,
  onChange,
  debounceTime,
}) => {
  const [didMount, setDidMount] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => setDidMount(true), [])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (!didMount) return
    if (localValue !== value) {
      const handler = window.setTimeout(
        () => onChange(localValue),
        debounceTime
      )
      return () => window.clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue])

  return (
    <input
      name={name}
      id={id}
      aria-label={label || null}
      className={`input ${classNames}`}
      type={inputType}
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
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  classNames: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
}

DebouncedInput.defaultProps = {
  value: ``,
  placeholder: ``,
  inputType: `text`,
  classNames: ``,
  debounceTime: DEFAULT_DEBOUNCE,
}

export default DebouncedInput
