#!/bin/bash

# Navigate to the application directory
cd RemoteGateWay

# Install dependencies
npm install

# Check if the app is already managed by pm2 and restart it, otherwise start it
if pm2 describe "server" > /dev/null; then
  pm2 restart "server"
else
  pm2 start index.js --name "server"
fi
