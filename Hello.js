const playIcon = document.getElementById("play-icon");
const myVideo = document.getElementById("my-video");

playIcon.addEventListener("click", () => {
  myVideo.play();
  playIcon.style.display = "none"; // hide the play icon once the video starts playing
});

myVideo.addEventListener("play", () => {
  playIcon.style.display = "none"; // hide the play icon once the video starts playing
});

myVideo.addEventListener("pause", () => {
  playIcon.style.display = "block"; // show the play icon when the video is paused
});
