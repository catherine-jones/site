# -- Base images
# Pinned to specific versions, and updated by Renovate
FROM node:10.15.3-alpine@sha256:b85a3b0ef76f5543b3f467e8a25694e72594d2c2bfcf140fa584d4f40ace4130 AS node
FROM buildkite/puppeteer:v1.13.0@sha256:6931e9c6272c45ae1e735982fdcff690aaaf32b7009e4ac7033c7e7d67df60f3 AS puppeteer

# -- Production environment
FROM    node AS production
ENV     NODE_ENV=production
EXPOSE  3000
WORKDIR /app
COPY    package.json yarn.lock .yarnclean /app/
RUN     apk --no-cache --virtual build-dependencies add python make g++ && \
        yarn install --frozen-lockfile --silent && \
        apk del build-dependencies
COPY    . /app
RUN     yarn run build
CMD     ["yarn", "run", "start"]

# -- Development
# We can just override NODE_ENV and re-run install to get the additional dev
# deps.
FROM production as development
ENV  NODE_ENV=development
RUN  yarn install

# -- Test
# Same deps as development
FROM development as test

# -- Integration tests
# Has headless chrome and puppeteer, and adds in Mocha so we can run our tests
# directly inside it
FROM     puppeteer AS integration-tests
RUN      npm i -g mocha@5
ENV      PATH="${PATH}:/node_modules/.bin"
WORKDIR  /tests
CMD      ["mocha", "--recursive", "--no-timeouts", "."]

# -- Default target
FROM production
