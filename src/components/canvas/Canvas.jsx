import s from "./Canvas.module.scss";
import Scene from "../../webgl/Scene";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    Scene.setup(canvasRef.current);
  }, []);
  return <canvas className={s.canvas} ref={canvasRef}></canvas>;
};

export default Canvas;
