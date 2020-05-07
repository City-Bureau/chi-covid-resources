# Chicago COVID Resource Finder

[![Build status](https://github.com/City-Bureau/chi-covid-resources/workflows/Deploy/badge.svg)](https://github.com/City-Bureau/chi-covid-resources/actions)

Find updated, verified information on resources in the Chicago area during the coronavirus pandemic. Maintained by [City Bureau](https://www.citybureau.org/).

## Setup

You'll need [Node](https://nodejs.org/en/) installed and an [Airtable](https://airtable.com/) account set up with the fields in [`src/pages/index.js`](./src/pages/index.js).

Make a copy of the Airtable [COVID Resource Finder base template](https://airtable.com/universe/expTcZwYlcgfz7c3U/covid-resource-finder-template). Copy the `.env.sample` to `.env` and fill in the values with your Airtable [API key](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-) and information about your base. Then make sure to replace the `form-id` keys in `src/intl/` with the Airtable IDs of your forms. 

Once you've set up the prerequisites, you can install dependencies and start a server at [localhost:8000](http://localhost:8000) with:

```bash
npm install
npm start
```

### Reporting Resource Errors

If you want to use the functionality for reporting errors with resources, you'll need to deploy an AWS Lambda function using the [`serverless-airtable-button`](https://github.com/City-Bureau/serverless-airtable-button) repo. Alternatively you can replace the custom form modal with an Airtable embed using the `AirtableEmbedModal` component and setting the `prefill_Resource` param in the `queryParams` property to prefill the flagged resource.

## Deploy

To deploy the AWS S3 and Cloudfront, create an S3 bucket that allows static site hosting and a Cloudfront distribution pointing to the bucket's web hosting endpoint. Set the `S3_BUCKET` and `CLOUDFRONT_ID` environment variables with your bucket and distribution ID, and then with GNU Make installed run `make deploy`.

## Acknowledgments

We thank the input of our community partners including Chicago United for Equity, Rohingya Cultural Center, West Side United, Organized Communities Against Deportations, The Middle Eastern Immigrant and Refugee Alliance (MIRA), Austin Coming Together, The Goodie Shop and The Firehouse Community Arts Center. Resources were compiled from original research by City Bureau’s editorial team and thanks to the existing lists created by the City of Chicago, Block Club Chicago, South Side Weekly, West Side United, Accion and ICIRR.

The setup for this project is directly inspired by the Education Justice Project's [Illinois Reentry Resources](https://reentryillinois.net/resources/), which is a fork of DataMade's [Cook County Probation Community Resources](https://probationcommunityresources.org/).

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
