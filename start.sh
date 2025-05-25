#!/bin/bash
node backend/start.js &
cd frontend
PORT=3001 npm start