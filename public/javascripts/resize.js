$(function(){


	function fixDragBtn() {
	  	var editorWidth, editorHeight, editorLeft, editorPadding, dragTop;

	  	var containerLeft = Number(getStyleValue(document.getElementById("main-space"), "left").replace("px", ""));

	  	var containerMargin = Number(getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));
	 
	    document.getElementById('dragbar').style.height = '5px';
	    if (window.getComputedStyle) {
	        editorWidth = window.getComputedStyle(document.getElementById('editor'),null).getPropertyValue('width');
	        editorHeight = window.getComputedStyle(document.getElementById('editor'),null).getPropertyValue('height');
	        
	        editorPadding = window.getComputedStyle(document.getElementById("editor"),null).getPropertyValue("padding-top");
	    } else {
	        dragTop = document.getElementById('editor').currentStyle['width'];
	    }

	    editorWidth = Number(editorWidth.replace('px', ''));
	    editorHeight = Number(editorHeight.replace('px', ''));
	    editorPadding = Number(editorPadding .replace('px', ''));

	    dragTop = editorHeight + editorPadding*2 + containerMargin;
	    drapLeft = containerLeft + containerMargin;
	    dragWidth = editorWidth + editorPadding*2;

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

			var percentage = ((e.pageY - containerMargin*2) / window.innerHeight) * 100;
			if (percentage > 5 && percentage < 90) {
				var mainPercentage = 97.5 - percentage;

				document.getElementById("editor").style.height = percentage + "%";
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