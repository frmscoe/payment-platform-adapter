FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/of-watchdog:0.8.4 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:14-alpine as ship

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog

RUN addgroup -S app && adduser -S -g app app

RUN apk --no-cache add curl ca-certificates

RUN apk add --no-cache -t build-dependencies git make gcc g++ python3 libtool autoconf automake yarn

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

# chmod for tmp is for a buildkit issue
RUN chown app:app -R /home/app \
    && chmod 777 /tmp

# Create a folder named function
RUN mkdir -p /home/app

# Wrapper/boot-strapper
WORKDIR /home/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

# Install dependencies
# RUN yarn run cleanup

# Install dependencies
RUN yarn install

COPY ./src ./src

# Build the project
RUN yarn run build

# Environment variables for openfaas
ENV cgi_headers="true"
ENV fprocess="node ./build/index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

ENV prefix_logs="false"

ENV FUNCTION_NAME=payment-platfrom-adapter
ENV PORT=3000

ENV TMS_ENDPOINT=TMS_ENDPOINT
ENV TMS_PAIN001_ENDPOINT=TMS_PAIN001_ENDPOINT
ENV TMS_PAIN013_ENDPOINT=TMS_PAIN013_ENDPOINT
ENV TMS_PACS002_ENDPOINT=TMS_PACS002_ENDPOINT
ENV TMS_PACS008_ENDPOINT=TMS_PACS008_ENDPOINT

ENV KAFKA_URI=KAFKA_URI
ENV KAFKA_CLIENT_ID=KAFKA_CLIENT_ID
ENV KAFKA_CONSUMER_GROUP=KAFKA_CONSUMER_GROUP
ENV KAFKA_TOPIC_TO_CONSUME=KAFKA_TOPIC_TO_CONSUME
ENV REDIS_URL=REDIS_URL
ENV REDIS_PORT=REDIS_PORT
ENV NODE_ENV=dev

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

# Execute watchdog command
CMD ["fwatchdog"]
