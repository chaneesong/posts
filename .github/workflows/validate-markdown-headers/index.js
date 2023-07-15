import fs from 'fs';
import checkHeaderValidity from './checkHeaderValidity/index.js';

// Read all Markdown files and validate headers
const markdownFiles = fs.readdirSync('./');
let hasValidationFailed = false;

markdownFiles.forEach((file) => {
  if (file.endsWith('.md')) {
    try {
      checkHeaderValidity(file);
    } catch (error) {
      hasValidationFailed = true;
      console.error(error);
    }
  }
});

// Exit with a non-zero status code if any validation has failed
if (hasValidationFailed) {
  process.exit(1);
}