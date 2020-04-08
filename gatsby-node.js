const fs = require(`fs`)
const path = require(`path`)
const grayMatter = require(`gray-matter`)
const PATH_TO_MD_PAGES = path.resolve(`src/markdown`)
const PAGE_TEMPLATE = path.resolve(`src/templates/page-template.js`)
const {
  siteMetadata: { defaultLanguage },
} = require("./gatsby-config")

const _getMarkdownNodeIdAndLanguage = node => {
  const relativePath = path.relative(PATH_TO_MD_PAGES, node.absolutePath)
  const toc = relativePath.split("/")
  const pageType = toc[0]
  const mdfile = toc[toc.length - 1]
  const pageId = toc.slice(1, toc.length - 1).join("/")
  const lang = path.basename(mdfile, ".md")
  return { pageType, pageId, lang }
}

const _isMarkdownNode = n => n.internal.mediaType === `text/markdown`

const _loadMarkdownFile = n =>
  grayMatter(fs.readFileSync(n.absolutePath, "utf-8").toString())

const _generatePagePath = ({ pageType, pageId }) => `/${pageId}`
// pageType === `resources` ? `/resources/${pageId}` : `/${pageId}`

const _wrapGraphql = graphql => async str => {
  const result = await graphql(str)
  if (result.errors) {
    throw result.errors
  }
  return result
}

const _createMarkdownPages = ({ pages, getNode, createPage }, cb) => {
  pages.forEach(({ id, relativePath }, index) => {
    const node = getNode(id)
    const { fields } = node
    const {
      page: { path: pagePath, type, lang },
    } = fields

    if (defaultLanguage === lang) {
      createPage({
        path: pagePath,
        // component: type === "resources" ? RESOURCE_TEMPLATE : PAGE_TEMPLATE,
        component: PAGE_TEMPLATE,
        context: {
          fields,
          relativePath,
          ...(cb ? cb(index, node) : null),
        },
      })
    }
  })
}

exports.onCreateNode = ({ node, getNodes, actions }) => {
  const { createNodeField } = actions

  // From https://hiddentao.com/archives/2019/05/07/building-a-multilingual-static-site-with-gatsby
  if (_isMarkdownNode(node)) {
    // pageType = "blog" or "static"
    // pageId = page slug
    // lang = "en" or "zh-TW"
    const { pageType, pageId, lang } = _getMarkdownNodeIdAndLanguage(node)

    // these values are extracted from within the markdown
    const {
      data: { title, date, draft },
      content: body,
    } = _loadMarkdownFile(node)

    const pageData = {
      pageId,
      type: pageType,
      path: _generatePagePath({ pageType, pageId, date }),
      lang,
      date,
      draft: !!draft,
      versions: [],
    }

    // if is default language node then load in versions in other languages
    if (lang === defaultLanguage) {
      // generate all versions of the node (including default language version)
      getNodes().forEach(n => {
        if (_isMarkdownNode(n)) {
          const r = _getMarkdownNodeIdAndLanguage(n)

          if (r.pageId === pageId) {
            const gm = _loadMarkdownFile(n)

            pageData.versions.push({
              lang: r.lang,
              summary: gm.data.summary,
              title: gm.data.title,
              date: gm.data.date,
              markdown: gm.content,
            })
          }
        }
      })
    }

    // this adds all the data above to Gatsby's internal representation of the node
    createNodeField({
      node,
      name: "page",
      value: pageData,
    })
  }
}

exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage } = actions

  const _graphql = _wrapGraphql(graphql)
  const {
    data: {
      allFile: { nodes: staticPages },
    },
  } = await _graphql(`
    {
      allFile( filter: { fields: { page: { type: { in: ["static"] } } } } ) {
        nodes {
          id
          relativePath
        }
      }
    }
  `)
  _createMarkdownPages({ pages: staticPages, getNode, createPage })
}
