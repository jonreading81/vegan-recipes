import React from 'react';
import youtube from '../../../api/actions/youtube';
import VideoList from '../VideoList/VideoList';

class YouTubeVideos extends React.Component {
  state = {videos: []};
  componentDidMount() {
    this.getChannelInfo(this.props.channelId);
  }
  getChannelInfo = async () => {
    const response = await youtube.get('/search', {
      params: {
        channelId: this.props.channelId,
      }
    });
    this.createVideosArr(response.data);
  }
  getVideo = (videoId) => {
    return youtube.get('/search', {
      params: {
        q: videoId,
      }
    });
  }
  createVideosArr = async (channelInfo) => {
    const videos = await Promise.all(
      channelInfo.items.filter(item => item.id.videoId).map(item => { return this.getVideo(item.id.videoId); })
    );
    this.setState({
      videos: videos.map(video => {return video.data.items[0]; })
    });
  }
  render() {
    if (this.state.videos.length === 0) {
      return (
        <div>
          Loading ...
        </div>
      );
    }
    return (
      <div>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default YouTubeVideos;
