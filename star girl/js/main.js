var can;
var ctx;
var w;
var h;
var girlPic=new Image();
var starPic=new Image();
var num=60;
var stars=new Array();
var lastTime;
var deltaTime;

document.body.onload=function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	w=can.width;
	h=can.height;
	girlPic.src="src/girl.jpg";
	starPic.src="src/star.png";
	for (var i = 0; i < num; i++) {
		var obj=new starObj();
		stars.push(obj);
		stars[i].init();
	}
	lastTime=Date.now();
	gameloop();
};

function drawBackground() {
	ctx.fillStyle='#393550';
	ctx.fillRect(0,0,w,h);
}



function drawGirl() {
	ctx.drawImage(girlPic,0,0);
}



function gameloop() {
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	drawBackground();
	drawGirl();
	drawStars();
}

