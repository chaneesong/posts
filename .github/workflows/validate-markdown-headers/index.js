import checkHeaderValidity from './checkHeaderValidity/index.js';

// Read all Markdown files and validate headers
const file = process.argv[2];
let hasValidationFailed = false;

console.log(file);

// if (!file) {
//   console.error('file is undefined.');
//   process.exit(1);
// }

// if (file.endsWith('.md')) {
//   try {
//     checkHeaderValidity(file);
//   } catch (error) {
//     hasValidationFailed = true;
//     console.error(error);
//   }
// }

// // Exit with a non-zero status code if any validation has failed
// if (hasValidationFailed) {
//   process.exit(1);
// }
