const fs = require('fs');
const path = require('path');

// Function to recursively copy files from src to dist directory
function copyFiles(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

// Copy .gql files from src/type to dist/type
copyFiles(path.join(__dirname, 'src/type'), path.join(__dirname, 'dist/type'));