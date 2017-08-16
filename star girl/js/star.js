var starObj=function () {
	this.x;
	this.y;
	this.picNo;
	this.timer;
	this.xSpd;
	this.ySpd;
};
starObj.prototype.init = function() {
	this.x=Math.random()*1200;
	this.y=Math.random()*600;
	this.picNo=Math.floor(Math.random()*7);
	this.xSpd=Math.random()-0.5;
	this.ySpd=Math.random()-0.5;
};
starObj.prototype.update = function() {
	this.x+=this.xSpd;
	this.y+=this.ySpd;
	if (this.x>1200||this.x<0) {
		this.init();
	}
	if (this.y<0||this.y>600) {
		this.init();
	}
	this.timer+=deltaTime;
	if (this.timer>50) {
		this.picNo+=1;
		if (this.picNo>6) {
		this.picNo=0;
	}
	}
	
	
};
starObj.prototype.draw = function() {
	ctx.drawImage(starPic ,this.picNo*7,0,7,7,this.x,this.y,7,7);
};



function drawStars() {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}