import fs from 'fs';
import { ADDED } from '../utils/getCommitState';

// 응답 객체를 가공하는 함수
const selectProperties = (response) => {
  const { id, title, content, category: categoryData, tagsData } = response;
  const { category } = categoryData;
  const tags = tagsData.map((tagData) => tagData.keyword);
  return { id, title, category, tags, content };
};

// 헤더 객체를 통해 마크다운 헤더를 다시 만드는 함수
const setHeader = (header) => {
  let result = '';
  const entiry = Object.entries(header);
  for (const value of entiry) {
    result = `${result}${value[0]}: ${value[1]}\n`;
  }
  return result.trim();
};

// id가 포함된 마크다운을 다시 만드는 함수
const rebuildMarkdown = (object) => {
  const { content, ...header } = object;
  const headerText = setHeader(header);
  const markdownText = `---
${headerText}
---

${object.content}`;

  return markdownText;
};

// 마크다운 파일에 id를 포함하여 덮어쓰는 함수
const overwriteFile = (title, markdown) => {
  try {
    fs.writeFileSync(`${title}.md`, markdown);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

// 서버에서 받아온 id를 마크다운 문서에 삽입하는 함수
export const injectId = (data, fileType) => {
  if (fileType !== ADDED) {
    return;
  }
  try {
    const parsedResponse = selectProperties(data);
    const markdown = rebuildMarkdown(parsedResponse);
    overwriteFile(data.title, markdown);
    console.log('File overwritten successfully.');
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};