# Use official Node.js base image (Debian/Ubuntu-based = Linux)
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["node", "index.js"]
