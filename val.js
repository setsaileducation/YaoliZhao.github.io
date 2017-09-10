window.onload=function () {
	document.getElementById('two').onclick=function () {
		var a=document.getElementById('one').value;
		if (Number(a)===5050){
			window.open('love/index.html','_self',"width=300,height=200,menubar=yes,toolbar=yes,status=no,srollbars=yes");
		}
		else if (Number(a)===9090){
			window.open('loves/index.html','_self',"width=300,height=200,menubar=yes,toolbar=yes,status=no,srollbars=yes");
		}
		else if(a===''){
			alert("The password cannot be empty!");
		}
		else{
			alert("Your password is wrong!");
			a='';
		}
	};
	
};