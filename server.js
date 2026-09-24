// Production Express Server for Hostinger Node.js Deployment
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

// 1. Health check endpoint for Hostinger load balancers & monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    app: 'ATTRXNWEAR'
  });
});

// 2. Check if build directory exists
if (fs.existsSync(distPath)) {
  // Serve static assets with long-term caching
  app.use(
    express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      index: false,
      setHeaders: (res, filePath) => {
        // Never cache index.html so updates are immediately visible
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    })
  );

  // Fallback to index.html for Single Page Application client-side routing
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
} else {
  // Helpful fallback if build hasn't run yet
  app.get('*', (req, res) => {
    res.status(503).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ATTRXNWEAR - Build Required</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fafafa; color: #171717; }
            .card { background: white; border: 1px solid #e5e5e5; padding: 2rem; border-radius: 12px; max-width: 500px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            code { background: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Building ATTRXNWEAR...</h2>
            <p>The production distribution directory (<code>dist/</code>) is not yet compiled.</p>
            <p>Please run <code>npm run build</code> in your Hostinger Terminal or SSH, then restart the application.</p>
          </div>
        </body>
      </html>
    `);
  });
}

// Start server
app.listen(PORT, HOST, () => {
  console.log(`[Hostinger] ATTRXNWEAR server running at http://${HOST}:${PORT}`);
});
