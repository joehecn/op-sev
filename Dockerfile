FROM node:lts-alpine
ENV NPM_CONFIG_LOGLEVEL info

# 修改时区
# RUN apk update && apk add bash tzdata \
#     && cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# Create node directory
RUN mkdir /server
RUN mkdir /server/logs
WORKDIR /server

# COPY file
COPY Dockerfile /server
COPY package.json /server
COPY ./src /server/src
COPY ./public /server/public

# Install app dependencies
RUN npm install --production

CMD npm run start
