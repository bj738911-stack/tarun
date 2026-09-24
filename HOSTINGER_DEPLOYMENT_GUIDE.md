# Hostinger Web Hosting Deployment Guide for ATTRXNWEAR

This project is now fully configured and debugged for **Hostinger Web Hosting** (both Shared/Cloud Apache/LiteSpeed Hosting and Hostinger Node.js Application Hosting).

---

## Why Deployments Commonly Fail on Hostinger (And What Was Fixed)

1. **404 Not Found on Page Refresh / Deep Links**:
   - *Problem*: In single-page React apps, reloading pages like `/shop` or `/product` returns a 404 error on Hostinger's LiteSpeed/Apache web server without an `.htaccess` rewrite rule.
   - *Fix*: Created a production `.htaccess` with `mod_rewrite` fallback to `index.html`, Gzip/Brotli compression, and security headers.
2. **Module MIME Type Error ("text/plain")**:
   - *Problem*: Hostinger LiteSpeed servers can block `.js` and `.mjs` ES modules with MIME type errors.
   - *Fix*: Added explicit `AddType application/javascript .js .mjs` to `.htaccess`.
3. **Missing "start" script in Hostinger Node.js Manager**:
   - *Problem*: Hostinger's Node.js application runner throws `npm ERR! Missing script: "start"` or fails to find `server.js`.
   - *Fix*: Added a production `server.js` Express runner and configured `"start": "node server.js"` in `package.json`.
4. **Subdirectory and Preview Domain Asset 404s**:
   - *Problem*: Absolute paths like `/assets/index.js` fail when hosted under Hostinger temporary preview domains or subfolders.
   - *Fix*: Configured `base: './'` in `vite.config.ts` so all assets load with clean relative paths.

---

## Method 1: Hostinger Shared / Cloud Hosting (Recommended & Simplest)

If you have standard Hostinger Web Hosting (Single, Premium, Business, or Cloud):

1. **Build the production package**:
   In your terminal, run:
   ```bash
   npm run build
   ```
   This generates the `dist/` folder containing `index.html`, `.htaccess`, and the `assets/` folder.

2. **Open Hostinger hPanel**:
   - Log in to your Hostinger dashboard.
   - Go to **Websites** -> Select your domain -> Click **Manage**.
   - Open **File Manager** (Files -> File Manager).

3. **Upload to `public_html`**:
   - Navigate into the **`public_html/`** folder.
   - Delete any default Hostinger placeholder file (e.g. `default.php`).
   - Upload all files from **inside** your local `dist/` directory into `public_html/`:
     - `.htaccess` *(Make sure "Show Hidden Files" is enabled in Hostinger File Manager settings)*
     - `index.html`
     - `assets/` directory (containing the optimized CSS and JS bundles)
     - `public/` assets

4. **Done!**:
   Visit your domain. The website will load instantly, and refreshing any page will work seamlessly.

---

## Method 2: Hostinger Node.js Application Hosting

If you are using Hostinger's **Node.js** feature (available on Business Hosting, Cloud Hosting, or VPS):

1. **In Hostinger hPanel**:
   - Go to **Advanced** -> **Node.js**.
   - Click **Create Application**.
   - **Node.js version**: Choose `v20.x` or `v22.x`.
   - **Application root**: `/public_html` (or your chosen app folder).
   - **Application startup file**: `server.js`.
   - Click **Create**.

2. **Deploy your code**:
   - Upload your repository files (or connect via Git repository).
   - In the Hostinger Node.js manager, click **Run NPM Install** (or run `npm install` via SSH/Terminal).
   - Click **Run NPM Build** (or run `npm run build` via SSH/Terminal).
   - Click **Restart Application**.

3. **Health Check**:
   - Your app includes a built-in health check at `https://yourdomain.com/api/health`.

---

## Useful Commands

- `npm run dev` — Starts local development server on port 3000
- `npm run build` — Compiles optimized production bundle with `.htaccess` in `dist/`
- `npm start` — Runs the production Node.js Express server on `process.env.PORT || 3000`
- `npm run lint` — Type-checks the codebase (`tsc --noEmit`)
