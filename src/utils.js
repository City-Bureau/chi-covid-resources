export const getBasePath = ({ pathname, language }) => {
  if (pathname.startsWith(`/${language}/`)) {
    return pathname.slice(`/${language}`.length)
  }
  return pathname
}

export const objectFromSearchParams = params => {
  const obj = {}
  params.forEach((val, key) => {
    obj[key] = val
  })
  return obj
}

export const fromEntries = iterable => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  })
}

/* eslint-disable */
// Debounce function from underscore
export const debounce = (func, wait, immediate) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
/* eslint-enable */
