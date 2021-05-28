# docker build -t jj-ui .
# docker run -it --rm --name jj-run-app jj-ui

# specify the node base image with your desired version node:<version>
FROM node:16-alpine3.11 AS build

COPY package.json package-lock.json ./
RUN npm install && mkdir /frontend && mv ./node_modules ./frontend

WORKDIR /frontend

COPY . .

RUN npm run build

# add app
FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
COPY --from=build /frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
