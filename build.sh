#!/bin/bash
set -e
dfx stop
dfx start --background --clean
npm install
npm run build
dfx deploy aio-deck-frontend
: