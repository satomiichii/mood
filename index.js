const video = document.getElementById('video');
console.log(faceapi.nets);

const setup = async () => {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/public/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/public/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/public/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/public/models');
  startVideo();
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
  console.log(canvas);
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
    // faceapi.draw.drawDetections(canvas, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    if (detections[0]) {
      if (detections[0].expressions.happy > 0.7) console.log('happy');
      if (detections[0].expressions.sad > 0.7) console.log('sad');
      if (detections[0].expressions.neutral > 0.7) console.log('neutral');
    }
  }, 100);
});
