function setTheme(){
	if(!window.localStorage.getItem('theme')){
		window.localStorage.setItem('theme','light');
		document.write('<link rel="stylesheet" type="text/css" href="styles/light.css">');
	} else {
		if(window.localStorage.getItem('theme') === 'light'){
			document.write('<link rel="stylesheet" type="text/css" href="styles/light.css">');
		} else if(window.localStorage.getItem('theme') === 'dark'){
			document.write('<link rel="stylesheet" type="text/css" href="styles/dark.css">');
		} 
	}
}