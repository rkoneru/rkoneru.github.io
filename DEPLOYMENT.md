# Deployment Guide for GitHub Pages

This guide explains how to publish the Troop 242 GrubMaster website to GitHub Pages.

## Current Status

✅ All website files are ready
✅ Icon files have been created
✅ Paths have been fixed for GitHub Pages compatibility
✅ Service worker is configured

## How to Publish

Since this is a `username.github.io` repository, GitHub Pages will automatically serve your website from the `main` branch.

### Option 1: Merge this Pull Request (Recommended)

1. Review and merge this pull request into the `main` branch
2. GitHub Pages will automatically deploy the website within a few minutes
3. Your website will be available at: `https://rkoneru.github.io/`

### Option 2: Manual Deployment

If you need to deploy manually:

```bash
# Switch to main branch
git checkout main

# Merge the changes from this branch
git merge copilot/publish-website

# Push to GitHub
git push origin main
```

## Verifying Deployment

After merging to main:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" section (under "Code and automation")
3. You should see: "Your site is published at https://rkoneru.github.io/"
4. It may take 1-5 minutes for changes to appear

## What Was Fixed

1. **Created Icon Files**: Added `icon-192.png`, `icon-512.png`, and `icon.png` that were referenced but missing
2. **Fixed Manifest Paths**: Changed `start_url` from `/index.html` to `./index.html` for proper GitHub Pages compatibility
3. **Fixed Service Worker**: Updated all cache paths to use relative paths (e.g., `./` instead of `/`)
4. **Added recipes.js**: Included `recipes.js` in the service worker cache
5. **Created .nojekyll**: Added `.nojekyll` file to prevent Jekyll processing

## Testing Locally

To test the website locally before deploying:

```bash
# Navigate to the repository directory
cd /path/to/rkoneru.github.io

# Start a simple HTTP server (Python 3)
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000

# Open http://localhost:8000 in your browser
```

## Troubleshooting

### Website not updating after merge
- Wait 5-10 minutes for GitHub Pages to rebuild
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Actions tab for any build errors

### Service Worker issues
- The service worker caches files for offline use
- After updates, you may need to clear the cache:
  1. Open DevTools (F12)
  2. Go to Application tab
  3. Clear storage and reload

### Icons not showing
- Verify the icon files exist in the root directory
- Check browser console for 404 errors
- Make sure manifest.json is being served correctly

## Next Steps

After the website is published:

1. Visit https://rkoneru.github.io/ to see your live site
2. Test the Progressive Web App features (install button)
3. Share the URL with your troop members
4. Consider setting up a custom domain (optional)

## Progressive Web App Features

Once deployed, users can:
- Install the app on their devices (via browser "Install" prompt)
- Use the app offline (service worker enables offline functionality)
- Add the app to their home screen on mobile devices

Enjoy your published website! 🎉
