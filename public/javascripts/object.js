const video = document.getElementById("video")

navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        facingMode: "user",
        width: 600,
        height: 500
    }
}).then(stream => {
    video.srcObject = stream
    video.onloadedmetadata = () => {
        video.play()
    }
});

async function modd() {
    return model = await cocoSsd.load();
}
var model = modd();

function detectFrame() {
    model.detect(video).then(predictions => {
        console.log(predictions);
        renderOurPredictions(predictions)
        requestAnimationFrame(detectFrame)
    })
}

console.log(model);
while (true) {
    detectFrame();
}
