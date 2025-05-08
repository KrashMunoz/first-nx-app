# Dockerfile

# Stage 1: Build the Angular app
FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json nx.json ./
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/myngapp/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

