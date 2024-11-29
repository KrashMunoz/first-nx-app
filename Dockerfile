# Dockerfile

# Stage 1: Build the Angular app
FROM node:lts-alpine AS build
# FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json nx.json ./
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build
# RUN npm run build --prod
# RUN nx run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/myngapp/browser /usr/share/nginx/html
# Move the default conf out of the way
# RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig 
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

