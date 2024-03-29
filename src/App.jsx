import s from "./App.module.scss";
import Canvas from "./components/canvas/Canvas";
import Picker from "./components/picker/Picker";
import Search from "./components/search/Search";
import Song from "./components/song/Song";
import useCustomStore from "./customStore";

const App = () => {
  const songs = useCustomStore((state) => state.songs);
  return (
    <div className={s.app}>
      <div className={s.songs}>
        {songs.map((song, key) => {
          return <Song key={key} data={song} />;
        })}
      </div>
      <Canvas />
      <Search />
      <Picker />
    </div>
  );
};

export default App;
