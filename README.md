# Overview

This is the Express template built written in TypeScript.

## Installation
- If you don't already have TypeScript installed, you'll need to run
`npm install -g typescript`
- To install relevant dependencies, run
 `npm install`

## Building the application
- run `tsc`, this will compile the .ts files to .js files in a folder called dist

## Starting the application
# Development
- run `npm run dev`, this used nodemon which allows for hot-reloading
# Production
- run `npm start` or `node dist/index.js`

### Configuration
The service name and port number can be updated using the configuration file, found at `src/config/config.ts`. Other attributes can be added as required. Useful where implementing a configuration service or similar. 


### Swagger definition
API definitions can be viewed at `hostname:port/endpoints` (default is `http://localhost:6492/endpoints`)
the swagger definition for the same can be found in `/swagger.yml`.
