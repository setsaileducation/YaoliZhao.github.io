window.onload=function () {
	document.getElementById('input').onfocus=function () {
		this.setAttribute('style','box-shadow:0 0 8px rgba(038, 198, 218, 0.85);');
	};
	document.getElementById('input').onblur=function () {
		this.setAttribute('style','box-shadow:0 0 0 rgba(038, 198, 218, 0.85);');
	};
};