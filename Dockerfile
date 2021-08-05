FROM nginx:alpine

COPY ./build/dist /usr/share/nginx/html
COPY ./nginx/deafult.conf /etc/nginx/conf.d/default.conf