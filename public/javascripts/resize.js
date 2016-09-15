$(function(){


	function fixDragBtn() {
	  	var editorWidth, editorHeight, editorLeft, editorPadding, dragTop;

	  	var sidebarWidth = Number(getStyleValue(document.getElementById("side-bar"), "width").replace("px", ""));

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
	    drapLeft = sidebarWidth + containerMargin - 10;

	    dragWidth = editorWidth;

	    document.getElementById('dragbar').style.top = dragTop + 'px';
	    document.getElementById('dragbar').style.left = drapLeft + 'px';
	    document.getElementById('dragbar').style.width = '1%';
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
	if(window.getComputedStyle) {
		// disable dragbar for IE <= 8
		$('#dragbar').mousedown(function(e) {dragstart(e);});
		$(window).mousemove(function(e){dragmove(e);});
		$(window).mouseup(dragend);
		$(window).load(fixDragBtn);
		$(window).resize(fixDragBtn);
	} else {
		$('#dragbar').hide();
	}
})