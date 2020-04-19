HTML_PATHS = / /index.html /404.html /about/ /about/index.html /feedback/ /feedback/index.html /suggest-resource/ /suggest-resource/index.html /404/ /404/index.html
LANGUAGES = en es
.PHONY: clean install build deploy

clean:
	rm -rf public .cache

install:
	yarn

build:
	yarn build

deploy:
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control "public, max-age=31536000" --exclude "*.html" --exclude "page-data/*.json" --exclude "manifest.webmanifest"
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control "public, max-age=0, must-revalidate" --exclude "*" --include "*.html" --include "page-data/*.json" --include "manifest.webmanifest"
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/page-data/*" $(foreach p,$(HTML_PATHS),"$(p)") $(foreach l,$(LANGUAGES),$(foreach p,$(HTML_PATHS),"/$(l)$(p)"))

src/intl/i18n.csv:
	wget -O $@ 'https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&id=${SPREADSHEET_ID}&gid=0'