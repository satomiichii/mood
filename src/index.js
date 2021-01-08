import {
  smile,
  moop,
  smileAppear,
  smileFade,
  frownAppear,
  frownFade,
} from './anime.js';
import * as faceapi from 'face-api.js';
import regeneratorRuntime from 'regenerator-runtime';

document.getElementsByClassName('frown')[0].style.opacity = 0;

const video = document.getElementById('video');

const setup = async () => {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    startVideo();
  } catch (error) {
    console.log('error');
  }
};

setup();

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    const target = document.getElementsByClassName('anime');
    if (detections[0]) {
      if (
        detections[0].expressions.happy > 0.7 &&
        target[0].attributes[1].value.includes('(0px)')
      ) {
        smile.play();
        smileFade.play();
        frownAppear.play();
      }
      if (
        detections[0].expressions.sad > 0.7 &&
        target[0].attributes[1].value.includes('-9000px')
      ) {
        moop.play();
        smileAppear.play();
        frownFade.play();
      }
    }
  }, 200);
});
