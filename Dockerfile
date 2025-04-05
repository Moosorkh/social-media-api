FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install without bcrypt
RUN rm -rf node_modules
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcryptjs --save

# Copy source files (after modifying them to use bcryptjs)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Start the application
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"