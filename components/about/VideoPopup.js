import React from "react";
import ModalVideo from "react-modal-video";

const VideoPopup = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "TYYf8zYjP5k",
}) => {
  return (
    <ModalVideo
      channel="youtube"
      isOpen={isVideoOpen}
      videoId={videoId}
      onClose={() => setIsVideoOpen(false)}
    />
  );
};

export default VideoPopup;
