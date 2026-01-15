#!/bin/bash
# Script to help deploy Docusaurus site to GitHub Pages

echo "Building Docusaurus site..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Deploying to GitHub Pages..."
    
    # Use docusaurus deploy command which handles GitHub Pages deployment
    npm run deploy
else
    echo "Build failed! Please fix the errors before deploying."
fi