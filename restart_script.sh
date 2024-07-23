#!/bin/bash

# Navigate to the application directory
cd RemoteGateWay

# Install dependencies
npm install

# Restart the application (assuming you're using pm2)
pm2 restart all
