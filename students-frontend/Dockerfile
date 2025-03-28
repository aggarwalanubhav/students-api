# Step 1: Build the Angular app
FROM node:22.14 AS build-stage

WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the Angular project
COPY . .

# Build the Angular app
RUN npm run build --prod

# Step 2: Serve the Angular app using Nginx
FROM nginx:alpine AS production-stage

# Copy the built Angular app from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
