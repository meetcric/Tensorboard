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
  }, 500);
}

function processFrame(imgData) {
  canvas.width = imgData.width;
  canvas.height = imgData.height;

  var t = canvas.getContext('2d');
  t.drawImage(imgData, 0, 0);
  t.lineWidth = 10;
  t.strokeStyle = "#00b33c";
  t.fillStyle = "#cc3300";
  t.font = "30px Arial";
  var ImageData = t.getImageData(0, 0, canvas.width, canvas.height);
  model.detect(ImageData).then(function(prediction){
      for (var i = 0; i < prediction.length; i++) {
          t.strokeRect((prediction[i].bbox)[0], (prediction[i].bbox)[1], (prediction[i].bbox)[2], (prediction[i].bbox)[3])
          t.fillText(prediction[i].class, (prediction[i].bbox)[0], (prediction[i].bbox)[1]);
      }
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
