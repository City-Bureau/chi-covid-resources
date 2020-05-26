.PHONY: clean install build deploy

clean:
	rm -rf public .cache

install:
	npm install

build:
	npm run build

deploy:
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control "public, max-age=31536000" --size-only --exclude "*.html" --exclude "page-data/*.json" --exclude "manifest.webmanifest" --exclude "sitemap.xml"
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control "public, max-age=0, must-revalidate" --size-only --exclude "*" --include "*.html" --include "page-data/*.json" --include "manifest.webmanifest" --include "sitemap.xml"
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"

src/intl/i18n.csv:
	wget -O $@ 'https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&id=${SPREADSHEET_ID}&gid=0'
