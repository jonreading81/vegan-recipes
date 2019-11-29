import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onVideoSelect }) => {
  const renderedList = videos.map(video => {
    return (
      <VideoItem key={video.id.videoId} video={video} onVideoSelect={onVideoSelect} />
    );
  });
  return (
    <div className="body-panel">
      <h3>Youtube Videos</h3>
      <div className="row">
        <div className="">{renderedList}</div>
      </div>
    </div >
  );
};

export default VideoList;
