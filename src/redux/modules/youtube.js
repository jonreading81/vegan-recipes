import youtube from '../../utils/youtube';

const initialState = {
  channel: [],
  videos: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'FETCH_CHANNEL':
      return {
        ...state,
        channel: action.payload
      };
    case 'FETCH_VIDEOS':
      return {
        ...state,
        videos: action.payload
      };
    default:
      return state;
  }
}

export const fetchChannelVideos = channelId => async dispatch => {
  const channelInfo = await youtube.get('/search', { params: { channelId } });
  dispatch({
    type: 'FETCH_CHANNEL',
    payload: channelInfo.data.items
  });
  const strVideoIds = (channelInfo.data.items.filter(item => item.id.videoId).map(video => video.id.videoId)).join();
  const videos = await youtube.get('/videos', { params: { id: strVideoIds }});
  dispatch({
    type: 'FETCH_VIDEOS',
    payload: videos.data.items
  });
};
