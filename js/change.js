var in_Width=window.innerWidth;
console.log(in_Width);
if(in_Width<1025){
	dots_boolean=false;
	delay_time=2700*1000;
}
else{
	dots_boolean=true;
	delay_time=5000;
}
$('.banner').unslider({
	speed: 500,               
	delay: delay_time,               
	keys: true,               
	dots: dots_boolean,   
	fluid: true             
});
var banner_ul=document.getElementById('banner_ul');
function load() {
	var banner=document.getElementById('banner');
		banner.addEventListener('touchstart',touch, false);
		banner.addEventListener('touchmove',touch, false);
		banner.addEventListener('touchend',touch, false);

	var index_li=0;
	var timer;
	function auto_change() {
			index_li++;
			if(index_li>3){
				index_li=0;
			}
			console.log(index_li);
    		if (index_li==0) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="0%";}
    		else if (index_li==1) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-100%";}
    		else if (index_li==2) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-200%";}
    		else if (index_li==3) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-300%";}
    }
	if(in_Width<1025){
		timer=setInterval(auto_change,2000);
	}
	
function a_change() {
            	if(m-n>50){
            		index_li++;
            		if(index_li>3){
            			index_li=0;
            		}
            		console.log(index_li);
            		if (index_li==0) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="0%";}
            		else if (index_li==1) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-100%";}
            		else if (index_li==2) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-200%";}
            		else if (index_li==3) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-300%";}
            	}
            	if(n-m>50){
            	    index_li--;
            	    if (index_li<0) {index_li=3;}
            	    console.log(index_li);
            		if (index_li==0) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="0%";}
            		else if (index_li==1) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-100%";}
            		else if (index_li==2) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-200%";}
            		else if (index_li==3) {banner_ul.style.transition="left 0.5s ease-in-out 0s";banner_ul.style.left="-300%";}
            	}
            }
function touch (event){
    event = event || window.event;
    switch(event.type){
        case "touchstart":
        	window.clearInterval(timer); 
            var touch = event.touches[0];
            m = touch.clientX;
            break;
        case "touchmove":
            event.preventDefault();
            
            break;
        case "touchend":
            event.preventDefault();
            n= event.changedTouches[0].clientX;
           	a_change();
           	timer=setInterval(auto_change,2000);
            break;
    }    
}
}
window.addEventListener('load',load, false);