FROM node:22-alpine as build

WORKDIR /zalo-app/frontend

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN npm run build

FROM nginx:1.23.3

COPY --from=build /zalo-app/frontend/build /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]