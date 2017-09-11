var index_li=0;
			$('.banner').unslider({
				speed: 500,               
				delay: 5000,              
				complete: function() {
					index_li++;
				},  
				keys: true,               
				dots: true,   
				fluid: true             
			});
