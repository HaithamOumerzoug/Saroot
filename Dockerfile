FROM node:15
WORKDIR /appapp/Saroot/Api
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]