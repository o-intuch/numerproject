FROM node:12.18-alpine
WORKDIR /app
COPY package.json ./
# Create app directory
RUN npm install
# Copy app source code
COPY . ./
#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]