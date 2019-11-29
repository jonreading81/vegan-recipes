import axios from 'axios';
const KEY = 'AIzaSyBxWJnRFePZvywMC9KZ0XyeCe6oUMosbMo';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
