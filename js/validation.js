document.getElementById('button').onclick=function () {
	var a=document.getElementById('input').value;
	if(Number(a)===0038){
		window.open('star girl/star girl.html','_self','width=1200,height=600,menubar=yes,toolbar=yes, status=yes,scrollbars=no');

	}
	else if(a===''){
		alert("The password cannot be empty!");
	}
	else{
		alert("The password is wrong!");
		document.getElementById('input').value='';
	}
};