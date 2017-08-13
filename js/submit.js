	var i=1,j=1;
		$(function(){
			
			$('#add').bind('click',function(){	//增加方法	
			
				$('.team_all .judge').each(function(){
					
					if(($(this).val().length>0)&&$(this).hasClass('judge_1')){	
						
							if($(".teamr .input_2 .judge_1").val().length!=10){
							
								layer.msg('学号输错了吗', {
									  offset: 't',
									  anim: 6
									});
									console.log(j);
							
							}
							else{
								j++;
								$(this).removeClass('judge');
							}
							
					
						console.log(j);																		
						
					}
					else if(($(this).val().length>0)&&($(this).not('.judge_1'))){
						j++;
						$(this).removeClass('judge');
					}
					else{
						
					layer.msg('请注意将所有内容填写完整');				
					}
					
				})
				//去掉judge
				
				console.log(j);
				if(j==5){
						
					console.log(j);
					$(".team_all .team_1").hide();
					$(".team_clone .team_1").clone().appendTo(".teamr");
					
					$('.team_nav').find('input:eq('+(i)+')').show();
					i++;
					if(i==5){
					$('#add').hide(); 
					}
					j=1;
				}
				
			})			
			 $('.team_nav .button').bind('click',function(){
			 	
			 	var num=$(this).index();
			 	$(".team_all .team_1").each(function(){
			 		if($(this).index()==num){
			 			$(this).show().siblings().hide();
			 		}
			 	})
			 } ) 
		})