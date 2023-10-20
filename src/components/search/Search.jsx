import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import useCustomStore from "../../customStore";
import AudioController from "../../utils/AudioController";
import s from "./Search.module.scss";

const Search = () => {
  const [artist, setArtist] = useState("");
  const setSongs = useCustomStore((state) => state.setSongs);

  // ça c'est bof je crois
  useEffect(() => {
    AudioController.setup();
  }, []);

  // il faut utiliser le .resume() pour relancer la musique en publique (verssel)

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      getSongs();
      console.log("enter");
    }
  };

  const getSongs = async () => {
    let response = await fetchJsonp(
      `https://api.deezer.com/search?q=${artist}&output=jsonp`
    );

    response = await response.json(response);

    const data = response.data.slice(0, 5);
    AudioController.ctx.resume();

    setSongs(data);

    console.log(response);
  };

  return (
    <div className={s.searchWrapper}>
      <input
        type="text"
        onChange={(e) => setArtist(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Search;
