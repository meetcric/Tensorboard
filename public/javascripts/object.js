async function modd() {
    return model = await cocoSsd.load();
}

var model = modd();

const canvas = document.getElementById('canvas1');

var interval;
var track;

navigator.mediaDevices.getUserMedia({video: true})
  .then(gotMedia)
  .catch(err => console.error('getUserMedia() failed: ', err));

function gotMedia(mediastream) {
  track = mediastream.getVideoTracks()[0];
  var imageCapture = new ImageCapture(track);
  interval = setInterval(function () {
    imageCapture.grabFrame()
      .then(processFrame)
      .catch(err => console.error('grabFrame() failed: ', err));
  }, 100);
}

function processFrame(imgData) {
  canvas.width = imgData.width;
  canvas.height = imgData.height;

  var t = canvas.getContext('2d');
  t.drawImage(imgData, 0, 0);

  var ImageData = t.getImageData(0, 0, canvas.width, canvas.height);
  model.detect(ImageData).then(function(prediction){
      t.lineWidth = 10;
      t.strokeStyle = "#00b33c"
      t.font = "30px Arial";
      t.strokeRect((prediction[0].bbox)[0], (prediction[0].bbox)[1], (prediction[0].bbox)[2], (prediction[0].bbox)[3])
      t.fillText(prediction[0].class, (prediction[0].bbox)[0], (prediction[0].bbox)[1]);
  });
}

function stopGrabFrame(e) {
  clearInterval(interval);
  track.stop();
}

// console.log(video);
// function detectFrame() {
//
// }
//
// console.log(model);
// while (true) {
//     detectFrame();
// }
