const fs = require('fs-extra');
const path = require('path');

const novncPath = path.join(__dirname, 'node_modules', '@novnc', 'novnc');
const buildPath = path.join(__dirname, 'build', 'novnc');

// Копируем необходимые файлы noVNC
fs.copySync(
  path.join(novncPath, 'core'),
  path.join(buildPath, 'core')
);

console.log('noVNC files copied successfully'); 