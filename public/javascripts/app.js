window.onload = function() {
    var myCanvas = document.getElementById("myCanvas");
    var curColor = "black";
    if (myCanvas) {
        var isDown = false;
        var ctx = myCanvas.getContext("2d");
        var canvasX,
            canvasY;
        ctx.lineWidth = 15;

        $(myCanvas).mousedown(function(e) {
            isDown = true;
            ctx.beginPath();
            canvasX = e.pageX - myCanvas.offsetLeft;
            canvasY = e.pageY - myCanvas.offsetTop;
            ctx.moveTo(canvasX, canvasY);
        }).mousemove(function(e) {
            if (isDown != false) {
                canvasX = e.pageX - myCanvas.offsetLeft;
                canvasY = e.pageY - myCanvas.offsetTop;
                ctx.lineTo(canvasX, canvasY);
                ctx.strokeStyle = curColor;
                ctx.stroke();
            }
        }).mouseup(function(e) {
            isDown = false;
            ctx.closePath();
        });
    }
};

async function modd() {
    return model = await tf.loadModel('/model/savemodel/model.json');
}
var model = modd();
function capture() {
    var c = document.getElementById('myCanvas');
    var t = c.getContext('2d', {alpha: false});

    const scaled = t.drawImage(c, 0, 0, 28, 28);
    var ImageData = t.getImageData(0, 0, 28, 28);

    var data = ImageData.data
    // var c2 = document.getElementById('myCan');
    // var t2 = c2.getContext('2d');
    // t2.putImageData(ImageData, 0, 0);
    // var data = ImageData.data;
    var normalArray = []
    for (var i = 3; i < data.length; i += 4) {
        var avg = data[i];
        normalArray.push(avg)
    }
    // $.post('predict',{normalArray}, function(data) {
    //     alert(data);
    // });

    var z = model.predict(tf.tensor(normalArray, [1, 28, 28, 1]));
    var result = z.dataSync();

    for (var i = 0; i < result.length; i++) {
        if(result[i] == 1){
            document.getElementById("results").innerHTML = i;
            break
        }
    }
};
function erase() {
    var c = document.getElementById('myCanvas');
    var t = c.getContext('2d', {alpha: false});
    t.clearRect(0, 0, 400, 400);
    document.getElementById("results").innerHTML = '';
}
