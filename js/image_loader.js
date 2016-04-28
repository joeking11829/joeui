'use strict';

var ImageAnimationLoader = (function() {

	console.log("construct for ImageAnimationLoader");

	var photo,
		preimg,
		curimg,
		animationimg;

	var i = 0;
    var imgs = [
        {img:'style/images/tara01.jpg'},
        {img:'style/images/tara02.jpg'},
        {img:'style/images/tara03.png'},
        {img:'style/images/tara04.jpg'},
        {img:'style/images/tara05.jpg'},
        {img:'style/images/tara06.jpg'},
        {img:'style/images/tara07.jpg'},
        {img:'style/images/tara08.jpg'},
        {img:'style/images/tara09.jpg'},
        {img:'style/images/tara10.jpg'},
        {img:'style/images/snsd01.jpg'}
    ];

	var init = function init(){
		photo = document.getElementById("photo");
	}

	var reSizeImage = function reSizeImage(callbacks) {
        try{
        	var return_obj;
            var image = this;
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
    
            var scaleX = 1280 / image.width;
            var scaleY = 800 / image.height;
            var scale = Math.max(scaleX, scaleY);

            var sw = image.width * scale;
            var sh = image.height * scale;

            canvas.width = sw;
            canvas.height = sh;

            context.drawImage(image, 0, 0, sw, sh);

            
            canvas.toBlob(function(resizedBlob) {
                var local_url = window.URL.createObjectURL(resizedBlob);
                callbacks(local_url);
            }, 'image/jpeg');

        }catch(error){
            console.log('error: ' + error);
        }
    };

    var nextImg = function nextImg(callbacks){
    	try{
    		var local_img = new Image();
    		local_img.onload = reSizeImage.bind(local_img, callbacks);
    		local_img.src = imgs[(i%11)].img;
        	i++;
        	return;
    	}catch(error){
    		console.log("error: " + error);
    	}
    };

    var showImg = function showImg(){
    	try{
    		console.log("run showImg");
    		nextImg(createDiv);
			//console.log(curimg + " " + preimg);
    		/*
    		if(preimg && !animationimg){
    			console.log("a");
    			scaleDiv();
    		}else if(curimg){
    			console.log("b");
    			preimg = curimg;
    			//preimg.classList.add("preimg");
    			curimg = undefined;
    			//load new curimg
    			nextImg(showImg);
    		}else{
    			console.log("c");
    			//load new curimg
    			nextImg(showImg);
    		}
    		*/


    		return;
    	}catch(error){
    		console.log("error: " + error);
    	}
    };

    var createDiv = function createDiv(imgurl){
    	try{
    		var local_img = this;
    		local_img = document.createElement("div");
        	local_img.style.backgroundImage = "url(" + imgurl + ")";
        	//curimg.classList.add("curimg");
        	photo.appendChild(local_img);
        	scaleDiv(local_img);
    	}catch(error){
    		console.log("error: " + error);
    	}
    };

    var scaleDiv = function scaleDiv(local_img){
    	try{
    		/*
    		local_img.addEventListener('animationstart', function callbackscalestart() {
            	//remove animationstart EventListener
            	local_img.removeEventListener('animationstart', callbackscalestart);
        	}.bind(local_img));
			*/
			
        	local_img.addEventListener('animationend', function callbackscaleend() {
        		console.log("scaleDiv animationend");
            	//remove animationend EventListener
            	local_img.removeEventListener('animationend', callbackscaleend);
            	local_img.classList.add("scaled");
            	local_img.classList.remove("scaleImg");
            	//window.setTimeout(showImg, 1);
            	//fadeOut curimg Div
            	fadeOutDiv(local_img);
        	}.bind(local_img));
        	//scale image
        	local_img.classList.add("scaleImg");
        	//window.setTimeout(showImg, 8000);
    	}catch(error){
    		console.log("error: " + error);
    	}
    };

    var fadeOutDiv = function fadeOutDiv(fadeout_img){
    	try{
    		
    		fadeout_img.addEventListener('animationstart', function callbackfadeoutstart() {
            	//remove animationstart EventListener
            	fadeout_img.removeEventListener('animationstart', callbackfadeoutstart);
            	window.setTimeout(showImg, 1);
        	}.bind(fadeout_img));
			
        	fadeout_img.addEventListener('animationend', function callbackfadeoutend() {
        		console.log("fadeOutDiv animationend");
            	//remove animationend EventListener
            	fadeout_img.removeEventListener('animationend', callbackfadeoutend);
            	fadeout_img.classList.add("hide");
            	window.URL.revokeObjectURL(fadeout_img.getAttribute("src"));
            	fadeout_img.parentNode.removeChild(fadeout_img);
        	}.bind(fadeout_img));
        	//fadeOut image
        	fadeout_img.classList.add("fadeOut");
    	}catch(error){
    		console.log("error: " + error);
    	}
    };

    //public method
	return {
		'init': init,
		'showImg': showImg
	};

})();