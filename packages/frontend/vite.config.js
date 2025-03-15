import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';

const copyFiles = () => {
  const filesToCopy = ['staticwebapp.config.json', 'tracking.html', 'exercise.html'];
  filesToCopy.forEach(file => {
    try {
      copyFileSync(file, `dist/${file}`);
      console.log(`✅ Copied ${file} to dist/`);
    } catch (err) {
      console.warn(`⚠️ Warning: ${file} not found, skipping.`);
    }
  });
};

export default defineConfig({
  build: {
    outDir: 'dist',  // Make sure built files go to "dist"
    emptyOutDir: false  // 🔥 Prevents Vite from deleting "dist/"
  },
  plugins: [
    {
      name: 'copy-static-files',
      closeBundle: copyFiles  // Runs after the build finishes
    }
  ]
});
