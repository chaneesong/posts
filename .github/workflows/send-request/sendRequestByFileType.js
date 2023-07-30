import axios from 'axios';
import { ADDED, MODIFIED, DELETED } from './utils/getCommitState.js';

const sendRequestByFileType = async (type, header, body) => {
  try {
    const postData = { ...header, content: body };
    console.log('url', process.env.SERVER_URL);
    console.log('postData', postData);
    let res;
    if (type === MODIFIED) {
      res = await axios.patch(
        `${process.env.SERVER_URL}/posts/${postData.title}`,
        postData
      );
    } else if (type === ADDED) {
      res = await axios.post(`${process.env.SERVER_URL}/posts`, postData);
    } else if (type === DELETED) {
      res = await axios.delete(
        `${process.env.SERVER_URL}/posts/${postData.title}`
      );
    }
    return res;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default sendRequestByFileType;
