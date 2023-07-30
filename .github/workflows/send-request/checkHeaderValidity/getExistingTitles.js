import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const getExistingTitles = () => {
  const files = fs.readdirSync('./');

  const markdownFiles = files.filter((file) => file.endsWith('.md'));
  const titles = [];

  markdownFiles.forEach((file) => {
    const filePath = path.join('./', file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const markdownData = frontMatter(content);

    titles.push(markdownData['title']);
  });

  return titles;
};

export default getExistingTitles;
