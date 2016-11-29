$(function(){
	window.resizer = {
		dragging: false,
		initResizer: _initResizer,
		fixDragBtn: _fixDragBtn,
		getStyleValue: _getStyleValue,
		dragstart: _dragstart,
		dragmove: _dragmove,
		dragend: _dragend
	}

	window.resizer.initResizer();

	function _initResizer() {
		if(window.getComputedStyle) {
			var self = this;

			// disable dragbar for IE <= 8
			$('#dragbar').mousedown(function(e){self.dragstart(e);});
			$(window).mousemove(function(e){self.dragmove(e);});
			$(window).mouseup(function(){self.dragend();});
			$(window).resize(self.fixDragBtn);
		} else {
			$('#dragbar').hide();
			console.log('your browser did not support resize');
		}
	}

	function _fixDragBtn() {
	  	var editorWidth, editorHeight, editorLeft, editorPadding, dragTop;

	  	//var sidebarWidth = Number(getStyleValue(document.getElementById("side-bar"), "width").replace("px", ""));

	  	var containerMargin = Number(this.getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));
	
	    document.getElementById('dragbar').style.height = '5px';
	    if (window.getComputedStyle) {
	        editorWidth = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('width');
	        editorHeight = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('height');
	        
	    } else {
	        dragTop = $('.CodeMirror')[0].currentStyle['width'];
	    }

	    editorWidth = Number(editorWidth.replace('px', ''));
	    editorHeight = Number(editorHeight.replace('px', ''));

	    dragTop = editorHeight + containerMargin - 5;
	    drapLeft = containerMargin;

	    dragWidth = editorWidth;

	    document.getElementById('dragbar').style.top = dragTop + 'px';
	    document.getElementById('dragbar').style.left = drapLeft + 'px';
	    document.getElementById('dragbar').style.width = '1%';
	    document.getElementById('dragbar').style.cursor = 'row-resize';        
	}

	function _getStyleValue(elmnt, style) {
		if (window.getComputedStyle) {
	        return window.getComputedStyle(elmnt,null).getPropertyValue(style);
	    } else {
	        return elmnt.currentStyle[style];
	    }
	}

	function _dragstart(e) {
		e.preventDefault();
		this.dragging = true;
	}

	function _dragmove(e) {
		if (this.dragging) {
			document.getElementById("shield").style.display = "block";        
			var detailMenuHeight = $('#detail-menu').height();

			var percentage = ((e.pageY - detailMenuHeight) / (window.innerHeight - detailMenuHeight)) * 100;

			if (percentage > 5 && percentage < 90) {
				var mainPercentage = 100 - percentage;

				editor.setSize('100%', percentage + "%") ;
				document.getElementById("viewer").style.height = mainPercentage + "%";
				this.fixDragBtn();
			}
		}
	}

	function _dragend() {
	    $('#shield').hide();
	    this.dragging = false;
	}

})