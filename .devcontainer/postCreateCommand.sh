#!/bin/sh

echo "START Install"

sudo chown -R node:node node_modules
npm install
npm audit fix

echo "FINISH Install"