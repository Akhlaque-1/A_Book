@echo off
REM Batch script to help deploy Docusaurus site to GitHub Pages

echo Building Docusaurus site...
npm run build

if %errorlevel% == 0 (
    echo Build successful!
    echo Deploying to GitHub Pages...
    
    REM Use docusaurus deploy command which handles GitHub Pages deployment
    npm run deploy
) else (
    echo Build failed! Please fix the errors before deploying.
)