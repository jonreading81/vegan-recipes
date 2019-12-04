import React from 'react';
import { connect } from 'react-redux';
import { fetchChannelVideos } from '../../redux/modules/youtube';
import VideoList from '../VideoList/VideoList';

class YouTubeVideos extends React.Component {
  componentDidMount() {
    this.props.fetchChannelVideos(this.props.channelId);
  }

  render() {
    return (
      <div>
        <VideoList videos={this.props.videos} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channelItems: state.youtube.channel,
    videos: state.youtube.videos
  };
};

export default connect(
  mapStateToProps,
  { fetchChannelVideos }
)(YouTubeVideos);
