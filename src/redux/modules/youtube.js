import youtube from '../../utils/youtube';

const initialState = {
  channel: {},
  videos: [],
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CHANNEL':
      return {
        ...state,
        loading: true,
        channel: action.payload
      };
    case 'FETCH_VIDEOS':
      return {
        ...state,
        loading: false,
        videos: action.payload
      };
    case 'YOUTUBE_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

const getVideoIdsFromChannel = channel =>
  channel.filter(item => item.id.videoId)
  .map(video => video.id.videoId)
  .join();

export const fetchChannel = channelId => async dispatch => {
  const channel = await youtube.get('/search', { params: { channelId } });
  dispatch({
    type: 'FETCH_CHANNEL',
    payload: channel.data
  });
  return channel.data;
};

export const fetchVideos = channel => async dispatch => {
  const videos = await youtube.get('/videos', { params: { id: getVideoIdsFromChannel(channel) }});
  dispatch({
    type: 'FETCH_VIDEOS',
    payload: videos.data.items
  });
  return videos;
};

export const fetchChannelVideos = channelId => async dispatch => {
  dispatch({
    type: 'YOUTUBE_LOADING'
  });
  const channel = await fetchChannel(channelId)(dispatch);
  return fetchVideos(channel.items)(dispatch);
};
