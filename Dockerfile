FROM node:lts-jod AS build 

ENV HUSKY=0

WORKDIR /app

COPY . . 
RUN apt update -y && apt upgrade -y 
RUN npm install -g @angular/cli

RUN npm install 

RUN ng build 

FROM nginxinc/nginx-unprivileged:stable-alpine-slim

COPY --from=build /app/dist/web-museum/browser /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080







