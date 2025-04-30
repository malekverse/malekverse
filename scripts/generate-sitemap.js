const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://malekverse.com';
const PUBLIC_DIR = path.join(__dirname, '../public');
const PAGES_DIR = path.join(__dirname, '../app');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Project data for dynamic routes
const projects = [
  { id: 'tunisiaflicks', priority: 0.8 },
  { id: 'lead-insight', priority: 0.8 },
  { id: 'ipsas-university', priority: 0.8 },
];

// Static routes with priorities
const routes = [
  { path: '/', priority: 1.0, changefreq: 'monthly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/stack', priority: 0.7, changefreq: 'monthly' },
  { path: '/work', priority: 0.8, changefreq: 'monthly' },
  { path: '/music', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
];

// Add dynamic project routes
projects.forEach(project => {
  routes.push({
    path: `/projects/${project.id}`,
    priority: project.priority,
    changefreq: 'monthly'
  });
});

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Generate sitemap XML
const generateSitemap = () => {
  const today = getCurrentDate();
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${route.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
};

// Write sitemap to file
const writeSitemap = () => {
  const sitemap = generateSitemap();
  fs.writeFileSync(OUTPUT_FILE, sitemap);
  console.log(`Sitemap generated at ${OUTPUT_FILE}`);
};

// Execute
writeSitemap();