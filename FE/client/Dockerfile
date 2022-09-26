# Stage 1
# Build docker image of react app
FROM node:12.18.2 as build-stage

# set working directory
RUN mkdir /usr/app
#copy all files from current directory to docker
COPY . /usr/app

WORKDIR /usr/app

# install and cache app dependencies
RUN npm install

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm run build

# Stage 2
# Copy the react app build above in nginx
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

EXPOSE 3000 
COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

# Copy static assets from builder stage
COPY --from=build-stage /usr/app/build /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]