import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/Miniplayer.module.css";

export default function Miniplayer({ id, title }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);
  const youtubeId = `https://www.youtube.com/watch?v=${id}`;

  function Miniplayer() {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={Miniplayer}>
      <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
      <span className={`material-icons-outlined ${classes.close}`} onClick={Miniplayer}>
        {" "}
        close{" "}
      </span>

      <ReactPlayer className={classes.player} url={youtubeId} width="300px" height="178px" playing={status} controls />

      <p>{title}</p>
    </div>
  );
}
