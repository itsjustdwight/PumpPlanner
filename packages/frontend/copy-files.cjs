const fs = require('fs');
const path = require('path');

const filesToCopy = [
  'staticwebapp.config.json',
  'tracking.html',
  'exercise.html',
  'signup.html',
  'settings.html',
  'login.html',
  '6390166-hd_1280_720_25fps.mp4',
  'contact.html'
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
