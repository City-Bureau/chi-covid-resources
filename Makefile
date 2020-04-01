.PHONY: clean install build deploy

clean:
	rm -rf public .cache

install:
	yarn

build:
	yarn build

deploy:
	aws s3 sync public/ s3://${S3_BUCKET} --acl=public-read --cache-control max-age=10800
