import React from 'react';
import { connect } from 'react-redux';
import { fetchChannelVideos } from '../../redux/modules/youtube';
import { VideoItem } from 'components';

class YouTubeVideos extends React.Component {
  componentDidMount() {
    this.props.fetchChannelVideos(this.props.channelId);
  }

  render() {
    return (
      <div className="body-panel">
        <h3>Youtube Videos</h3>
        {!!this.props.loading && <p>Loading YouTube videos ... </p>}
        <div className="row">
          {this.props.videos.map(video => {
            return <VideoItem key={video.id} video={video} />;
          })}
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.youtube.channel,
    videos: state.youtube.videos,
    loading: state.youtube.loading
  };
};


export default connect(
  mapStateToProps,
  { fetchChannelVideos }
)(YouTubeVideos);
