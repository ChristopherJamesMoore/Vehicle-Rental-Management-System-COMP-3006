FROM node:22.9.0

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD [ "node", "server.js" ]
