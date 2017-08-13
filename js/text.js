var i=0;
	$(function(){
		$('#texts_all .texts:eq(0)').clone().appendTo(".Hide").hide();
		$('#Button_down').on('click',function(){ 
			
//			alert($('#texts_all .texts').length);
			if($('#texts_all .texts').length<5){
				i++;
//				alert('傻子');
				$('.Hide .texts .editor').text('');				
				$('.Hide .texts ').clone().appendTo('#texts_all').show();
				$('#text_all li').eq(i).show().siblings('.cla').hide();
				$('#texts_all .texts').eq(i).show().siblings().hide();
//				console.log(i);
			}
			else{
				if(i<4){
				i++;}
				$('#text_all li').eq(i).show().siblings('.cla').hide();
				$('#texts_all .texts').eq(i).show().siblings('.texts').hide();
			}
		});
		$('#Button_on').on('click',function(){
			i--;
			if(i>=0){
			$('#text_all li').eq(i).show().siblings('.cla').hide();
			$('#texts_all .texts').eq(i).show().siblings('.texts').hide();
			}
		})
	})