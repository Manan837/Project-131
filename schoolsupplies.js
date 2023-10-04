status1 = "";
schoolsupplies_image = "";

function preload(){
    schoolsupplies_image = loadImage("schoolsupplies.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.center();
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
    object_Detector.detect(schoolsupplies_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
}

/* function draw(){
    image(schoolsupplies_image,0,0,640,350);
}*/