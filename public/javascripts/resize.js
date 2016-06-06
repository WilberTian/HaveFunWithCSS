$(function(){


	function fixDragBtn() {
	  	var editorWidth, editorHeight, editorLeft, editorPadding, dragTop;

	  	var containerLeft = Number(getStyleValue(document.getElementById("main-space"), "left").replace("px", ""));

	  	var containerMargin = Number(getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));
	
	    document.getElementById('dragbar').style.height = '5px';
	    if (window.getComputedStyle) {
	        editorWidth = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('width');
	        editorHeight = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('height');
	        
	    } else {
	        dragTop = $('.CodeMirror')[0].currentStyle['width'];
	    }

	    editorWidth = Number(editorWidth.replace('px', ''));
	    editorHeight = Number(editorHeight.replace('px', ''));

	    dragTop = editorHeight + containerMargin;
	    drapLeft = containerLeft + containerMargin;
	    dragWidth = editorWidth;

	    document.getElementById('dragbar').style.top = dragTop + 'px';
	    document.getElementById('dragbar').style.left = drapLeft + 'px';
	    document.getElementById('dragbar').style.width = dragWidth + 'px';
	    document.getElementById('dragbar').style.cursor = 'row-resize';        
	}

	function getStyleValue(elmnt, style) {
		if (window.getComputedStyle) {
	        return window.getComputedStyle(elmnt,null).getPropertyValue(style);
	    } else {
	        return elmnt.currentStyle[style];
	    }
	}

	function dragstart(e) {
		e.preventDefault();
		dragging = true;
	}

	function dragmove(e) {
		if (dragging) {
			document.getElementById("shield").style.display = "block";        
			
			var containerMargin = Number(getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));

			var percentage = (e.pageY / window.innerHeight) * 100;
			if (percentage > 5 && percentage < 90) {
				var mainPercentage = 100 - percentage;

				editor.setSize('100%', percentage + "%") ;
				document.getElementById("viewer").style.height = mainPercentage + "%";
				fixDragBtn();
			}
		}
	}

	function dragend() {
	    document.getElementById("shield").style.display = "none";
	    dragging = false;
	}

	var dragging = false;

	document.getElementById("dragbar").addEventListener("mousedown", function(e) {dragstart(e);});
	window.addEventListener("mousemove", function(e) {dragmove(e);});
	window.addEventListener("mouseup", dragend);
	window.addEventListener('load', fixDragBtn);
	window.addEventListener('resize', fixDragBtn);

})