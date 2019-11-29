import React from 'react';
const youTubeURL = 'https://www.youtube.com/watch?v=';

const createMarkup = (string) => {
  return {__html: string};
};
const VideoItem = ({ video }) => {
  return (
    <div className="promoUnit" key={video.id.videoId}>
      <a target="_blank" href={`${youTubeURL}${video.id.videoId}`}>
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-5">
            <img className="image-wrapper"
              alt={video.snippet.title}
              src={video.snippet.thumbnails.medium.url}
            />
          </div>
          <div className="col-xs-12 col-sm-8 col-md-7">
            <div>
              <h4 dangerouslySetInnerHTML={createMarkup(video.snippet.title)}/>
              <p dangerouslySetInnerHTML={createMarkup(video.snippet.description)} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default VideoItem;
