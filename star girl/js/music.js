var music=document.getElementById('music'); 

function playPause()
{ 
	if (music.paused) {
	  music.play(); 
	  this.innerHTML="&#xe9e0";
	}
	else {
	  music.pause();
	  this.innerHTML="&#xe9f6"; 
	}
} 
document.getElementById('span').onclick=playPause;
