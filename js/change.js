var index_li=0;
			$('.banner').unslider({
				speed: 500,               
				delay: 55000,              
				complete: function() {
					index_li++;
				},  
				keys: true,               
				dots: true,   
				fluid: true             
			});
				var banner_ul=document.getElementById('banner_ul');
				function load() {
				var banner=document.getElementById('banner');
					banner.addEventListener('touchstart',touch, false);
					banner.addEventListener('touchmove',touch, false);
					banner.addEventListener('touchend',touch, false);
				function touch (event){
				    event = event || window.event;
				    switch(event.type){
				        case "touchstart":
				            var touch = event.touches[0];
				            m = touch.clientX;
				            break;
				        case "touchmove":
				            event.preventDefault();
				            
				            break;
				        case "touchend":
				            event.preventDefault();
				            n= event.changedTouches[0].clientX;
				            var banner_ul=document.getElementById('banner_ul');
				            if(m-n>50){
				            	index_li++;
				            	if(index_li>3){
				            		index_li=0;
				            	}
				            	console.log(index_li);
				            	if (index_li==0) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="0%";}
				            	else if (index_li==1) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-100%";}
				            	else if (index_li==2) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-200%";}
				            	else if (index_li==3) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-300%";}
				            }
				            if(n-m>50){
				                index_li--;
				                if (index_li<0) {index_li=3;}
				                console.log(index_li);
				            	if (index_li==0) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="0%";}
				            	else if (index_li==1) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-100%";}
				            	else if (index_li==2) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-200%";}
				            	else if (index_li==3) {banner_ul.style.transition="left 0.5s ease 0s";banner_ul.style.left="-300%";}
				            }
				           
				            break;
				    }    
				}
			}
			window.addEventListener('load',load, false);