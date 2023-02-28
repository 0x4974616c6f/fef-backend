#!/bin/bash

npm install
npm run build
# npm run start:dev
node --inspect=0.0.0.0:9229 ./node_modules/@nestjs/cli/bin/nest.js start --watch

