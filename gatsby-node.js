const path = require(`path`)
const webpack = require(`webpack`)

const PATH_TO_MD_PAGES = path.resolve(`src/markdown`)
const PAGE_TEMPLATE = path.resolve(`src/templates/page-template.js`)

const _getMarkdownNodeIdAndLanguage = ({ fileAbsolutePath }) => {
  const relativePath = path.relative(PATH_TO_MD_PAGES, fileAbsolutePath)
  const toc = relativePath.split("/")
  const pageType = toc[0]
  const mdfile = toc[toc.length - 1]
  const pageId = toc.slice(1, toc.length - 1).join("/")
  const lang = path.basename(mdfile, ".md")
  return { pageType, pageId, lang }
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const { pageType, pageId, lang } = _getMarkdownNodeIdAndLanguage(node)

    const pageData = {
      pageId,
      type: pageType,
      path: `/${pageId}`,
      lang,
    }

    createNodeField({
      node,
      name: "page",
      value: pageData,
    })
  }
}

// https://stackoverflow.com/a/56710438
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const oldPage = Object.assign({}, page)

  page.context.language = page.context.intl.language
  if (page.context.language !== oldPage.context.language) {
    // Replace new page with old page
    deletePage(oldPage)
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage } = actions

  const {
    data: {
      allMarkdownRemark: { nodes },
    },
  } = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            title
            date
          }
          html
          rawMarkdownBody
        }
      }
    }
  `)

  nodes.forEach(({ id, fileAbsolutePath }) => {
    const node = getNode(id)
    const { fields } = node
    const {
      page: { path: pagePath, lang, pageId },
    } = fields

    createPage({
      path: pagePath,
      component: PAGE_TEMPLATE,
      context: {
        fields,
        pageId,
        lang,
        fileAbsolutePath,
      },
    })
  })
}

// Don't load unneeded formatjs formats
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /@formatjs[/\\]intl-relativetimeformat[/\\]dist[/\\]locale-data/,
        path.resolve(`./src/stub.js`)
      ),
      new webpack.NormalModuleReplacementPlugin(
        /@formatjs[/\\]intl-pluralrules[/\\]dist[/\\]locale-data/,
        path.resolve(`./src/stub.js`)
      ),
    ],
  })
}
