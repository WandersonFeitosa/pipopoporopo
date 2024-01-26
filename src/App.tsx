import video1 from "../src/assets/videos/video1.mp4";
import video2 from "../src/assets/videos/video2.mp4";
import video3 from "../src/assets/videos/video3.mp4";
import video4 from "../src/assets/videos/video4.mp4";
import video5 from "../src/assets/videos/video5.mp4";
import video6 from "../src/assets/videos/video6.mp4";

function App() {
  const videosArray = [video1, video2, video3, video4, video5, video6];

  const randomVideo =
    videosArray[Math.floor(Math.random() * videosArray.length)];

  function playVideo() {
    const videoEl = document.getElementsByClassName(
      "video-element"
    )[0] as HTMLVideoElement;

    videoEl.classList.remove("d-none");

    videoEl.play();

    videoEl.volume = 0.8;
  }

  function liberarDownload() {
    playVideo();
    const libera = document.getElementsByClassName("Liberar-butao")[0];
    const tiulto = document.getElementsByClassName("tiulto")[0];
    const butao = document.getElementsByClassName("butao2")[0];
    libera.classList.add("d-none");
    tiulto.classList.remove("d-none");
    butao.classList.remove("d-none");
  }

  return (
    <div>
      <video className="d-none video-element" src={randomVideo} loop></video>
      <div className="download-modal">
        <div className="modal-dentro">
          <div className="butao Liberar-butao" onClick={liberarDownload}>
            CLIQUE AQUI PARA LIBERAR O SEU DOWNLOAD
          </div>
          <div className="tiulto d-none">
            NÃO É VIRUS CONFIA BAIXA É SÓ O SÉRVER
          </div>
          <a
            href="http://34.30.90.184:3000/getImages/backup-2023-12-02.zip"
            download={true}
            className="butao butao2 d-none"
          >
            BAIXAR SEM VIRUS ATUALIZADO 2024
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
