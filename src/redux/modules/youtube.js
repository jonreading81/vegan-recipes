import youtube from '../../utils/youtube';

export const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'FETCH_CHANNEL':
      return {
        ...state,
        entity: action.result
      };
    case 'FETCH_VIDEO':
      return {
        ...state,
        entity: action.result
      };
    default:
      return state;
  }
};

export const fetchChannel = channelId => async dispatch => {
  const response = await youtube.get('/search', { params: { channelId} });
  dispatch({
    type: 'FETCH_CHANNEL',
    payload: response.data
  });
};

export const fetchVideo = videoId => async dispatch => {
  const response = await youtube.get('/search', { q: { videoId} });
  dispatch({
    type: 'FETCH_VIDEO',
    payload: response.data
  });
};
