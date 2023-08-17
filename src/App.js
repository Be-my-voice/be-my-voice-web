import logo from './logo.svg';
import './App.css';
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";

function App() {

  const demoSection = document.getElementById('demos');
  let poseLandmarker = undefined;
  let runningMode = "IMAGE";
  let enableWebcamButton;
  let webcamRunning = false;
  const videoHeight = "720px";
  const videoWidth = "720px";

  const createPoseLandmark = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numPoses: 2
    });
    demoSection.classList.remove("invisible");
  };

  createPoseLandmark();

  return (
    <div className="App">
      <header className="App-header">
        <section id='demos' class='invisible'>
          <div id="liveView" class="videoView">
            <button id="webcamButton" class="mdc-button mdc-button--raised">
              <span class="mdc-button__ripple"></span>
              <span class="mdc-button__label">ENABLE WEBCAM</span>
            </button>
            <div style="position: relative;">
              <video id="webcam" style="width: 1280px; height: 720px; position: abso" autoplay playsinline></video>
              <canvas class="output_canvas" id="output_canvas" width="1280" height="720" style="position: absolute; left: 0px; top: 0px;"></canvas>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
