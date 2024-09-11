# (c) 2024 Ronan LE MEILLAT for SCTG Development
# This file is licensed under the MIT License
# See the LICENSE file for more information

FROM node:20 as builder
COPY . /app
WORKDIR /app
RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

