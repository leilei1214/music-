let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// function draw(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle="red";
ctx.beginPath();

ctx.arc(1,2,0.5,0,2*Math.PI);

ctx.strokeStyle="dodgerblue";
ctx.stroke();
ctx.beginPath();

ctx.arc(50,2,0.5,0,2*Math.PI);

ctx.strokeStyle="dodgerblue";
ctx.stroke();
// ctx.clearRect(0, 0,2,1);
    // console.log("100//")
// }