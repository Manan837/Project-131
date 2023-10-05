status1 = "";
bedroom_image = "";
objects = [];

function preload() {
    bedroom_image = loadImage("bedroom.png");
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
    object_Detector.detect(bedroom_image, gotResults);
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
    image(bedroom_image, 0, 0, 640, 420);
    if (status1 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 120, objects[i].y - 310);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 150, objects[i].y - 350, objects[i].width - 253, objects[i].height - 446);
        }
    }
}