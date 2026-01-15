# GitHub Pages Deployment Guide

This guide explains how to deploy your Docusaurus site to GitHub Pages.

## Prerequisites

1. Your repository must be public
2. GitHub Pages must be enabled in your repository settings
3. You need to configure the correct settings in `docusaurus.config.js`

## Configuration

Before deploying, make sure to update the following in `docusaurus.config.js`:

```js
// docusaurus.config.js
module.exports = {
  // ...
  url: 'https://your-github-username.github.io', // Replace with your GitHub username
  baseUrl: '/robot-system/', // Replace with your repository name
  organizationName: 'your-github-username', // Usually your GitHub org/user name
  projectName: 'robot-system', // Usually your repo name
  // ...
};
```

## Automatic Deployment with GitHub Actions

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch. The workflow is defined in `.github/workflows/github-pages.yml`.

## Manual Deployment

If you prefer to deploy manually, run:

```bash
npm run deploy
```

This command will build your site and push the built files to the `gh-pages` branch, which GitHub Pages serves from.

## Accessing Your Site

Once deployed, your site will be available at:
`https://your-github-username.github.io/robot-system/`

Note: Replace `your-github-username` with your actual GitHub username and `robot-system` with your repository name.

## Enabling GitHub Pages in Repository Settings

To enable GitHub Pages for your repository:

1. Go to your GitHub repository page
2. Click on the "Settings" tab
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose the "gh-pages" branch from the dropdown
6. Select "/ (root)" as the folder
7. Click "Save"
8. Wait a few minutes for GitHub to process and deploy your site

## Troubleshooting

If you're still getting a 404 error:

1. Check that your repository is public
2. Verify that GitHub Pages is enabled in your repository settings (see instructions above)
3. Confirm that the `baseUrl` in `docusaurus.config.js` matches your repository name
4. Wait a few minutes after deployment for GitHub Pages to process the files
5. Check that the GitHub Actions workflow completed successfully
6. Make sure you've pushed your changes to the main branch