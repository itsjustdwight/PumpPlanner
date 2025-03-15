const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'staticwebapp.config.json',
  'tracking.html',
  'exercise.html'
];

const srcDir = path.resolve(__dirname); // Root frontend directory
const destDir = path.resolve(__dirname, 'dist'); // Build output directory

filesToCopy.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file} to dist/`);
  } else {
    console.warn(`⚠️ Warning: ${file} not found, skipping.`);
  }
});
