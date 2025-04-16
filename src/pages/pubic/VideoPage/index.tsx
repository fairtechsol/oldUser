import { useParams } from "react-router-dom";
import { cardUrlMain } from "../../../utils/Constants";
import { memo } from "react";

const VideoPage = () => {
  const { vidId } = useParams();
  const iframeStyles: any = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    zIndex: -1,
  };

  const containerStyles: any = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -1,
  };

  return (
    <div style={containerStyles}>
      <iframe
        style={iframeStyles}
        src={`${cardUrlMain}${vidId}`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default memo(VideoPage);
