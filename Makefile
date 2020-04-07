.PHONY: clean install build deploy

clean:
	rm -rf public .cache

install:
	yarn

build:
	yarn build

deploy:
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control max-age=604800 --exclude "*.html"
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control max-age=10800 --exclude "*" --include "*.html"
	aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths /*
