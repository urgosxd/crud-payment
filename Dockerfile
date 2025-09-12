# Stage 1: Build the Angular application
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ng build --configuration production

# Stage 2: Serve the application from Nginx
FROM nginx:alpine

COPY --from=build /app/dist/myapp/browser /usr/share/nginx/html

EXPOSE 80
