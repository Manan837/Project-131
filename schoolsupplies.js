status1 = "";
schoolsupplies_image = "";
objects = [];

function preload() {
    schoolsupplies_image = loadImage("schoolsupplies.jpg");
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
    object_Detector.detect(schoolsupplies_image, gotResults);
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
    image(schoolsupplies_image, 0, 0, 640, 420);
    if (status1 != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,  objects[i].y, objects[i].width, objects[i].height);
        }
    }
}