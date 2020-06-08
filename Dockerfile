# this install the node image from docker hub
FROM node:10
# this is the current working directory in the docker image
WORKDIR /usr/src/app
#copy package.json from local to docker image
COPY package*.json ./
#run npm install commands
RUN npm install
#copy all the files from local directory to docker image
COPY . .
#this port exposed to the docker to map.
EXPOSE 8181
CMD [ "npm" , "run", "prod" ]