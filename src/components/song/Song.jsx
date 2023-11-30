import s from "./Song.module.scss";
import AudioController from "../../utils/AudioController";
import Scene from "../../webgl/Scene";

const Song = ({ data }) => {
  console.log(data);

  const pickSong = () => {
    AudioController.updateSong(data.preview);
    Scene.cover.updateCover(data.album.cover_xl);
  };

  return (
    <div
      className={s.song}
      onClick={pickSong}
      // onClick={() => AudioController.updateSong(data.preview)}
    >
      <img src={data.album.cover_small} alt="" />
      <span className={s.title}>{data.title}</span>
    </div>
  );
};

export default Song;
