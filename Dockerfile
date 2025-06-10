# Step 1: Build the React (Vite) app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
