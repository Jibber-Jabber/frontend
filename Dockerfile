# docker build -t jj-ui .
# docker run -it --rm --name jj-run-app jj-ui

# specify the node base image with your desired version node:<version>
FROM node:16-alpine3.11

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# replace this with your application's default port
EXPOSE 3000

# start app
CMD ["npm", "start"]
