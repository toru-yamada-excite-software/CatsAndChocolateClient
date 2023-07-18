#!/bin/sh

echo "START Install"

npm install
npm audit fix

echo "FINISH Install"