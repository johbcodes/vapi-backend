FROM node:18
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application files
COPY . ./

# Set environment variables
ENV NODE_ENV production
ENV PORT 5000

# Expose the specified port
EXPOSE $PORT

# Run your application
CMD ["npm", "start"]
