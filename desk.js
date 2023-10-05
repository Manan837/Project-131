status1 = "";
desk_image = "";
objects = [];

function preload() {
    desk_image = loadImage("desk.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(448, 240);
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    object_Detector.detect(desk_image, gotResults);
}

function gotResults(error, results) {
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(desk_image, 0, 0, 640, 420);
    if (status1 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 240, objects[i].y - 230);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 250,  objects[i].y - 250, objects[i].width - 150, objects[i].height - 250);
        }
    }
}