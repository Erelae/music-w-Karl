import fetchJsonp from "fetch-jsonp";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useCustomStore from "../../customStore";
import AudioController from "../../utils/AudioController";
import s from "./Search.module.scss";

const Search = () => {
  const [artist, setArtist] = useState("");
  const setSongs = useCustomStore((state) => state.setSongs);

  const onDrop = useCallback(
    (audio) => {
      console.log("dropped", audio);
      const src = URL.createObjectURL(audio[0]);

      const audioObject = {
        title: audio[0].name,
        album: {
          cover_small: "",
        },
        preview: src,
      };

      setSongs([audioObject]);
      console.log(audioObject);
    },
    [setSongs]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });

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
    <div className={s.searchWrapper} {...getRootProps()}>
      <input
        type="text"
        className={s.searchInput}
        onChange={(e) => setArtist(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {isDragActive && <input {...getInputProps()} />}
    </div>
  );
};

export default Search;
