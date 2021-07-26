song = "";
song2 = "";
leftwrist_y = "";
leftwrist_x = "";
leftWristscore = "";
rightWristscore = "";
rightwrist_x = "";
rightwrist_y = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 500);
    posenet = ml5.poseNet(video, model_loaded);
    posenet.on("pose", gotposes);
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        rightwrist_x = results[0].pose.rightWrist.x
        rightwrist_y = results[0].pose.rightWrist.y
        leftwrist_x = results[0].pose.leftWrist.x
        leftwrist_y = results[0].pose.leftWrist.y
        leftWristscore = results[0].pose.keypoints[9].score
        rightWristscore = results[0].pose.keypoints[10].score
    }
}

function model_loaded() {
    console.log('model loaded');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red")
    stroke("red")
    if (leftWristscore > 0.2) {
        circle(leftwrist_x, leftwrist_y, 20)
        if (song2.isPlaying() == false) {
            song.stop();
            song2.play();
            document.getElementById("songname").innerHTML = "peter pan song"
        }
    }
    if (rightWristscore > 0.2) {
        circle(rightwrist_x, rightwrist_y, 20)
        if (song.isPlaying() == false) {
            song2.stop();
            song.play();
            document.getElementById("songname").innerHTML = "harry porter theme song"
        }

    }
}

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play() {
    song.play();
}

function stop() {
    song.stop();
    song2.stop();
}