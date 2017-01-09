define([
    'jquery'
], function($) {
    var resizer = {
		dragging: false,
		initialized: false,
		initResizer: _initResizer,
		cleanUpResizer: _cleanUpResizer,
		fixDragBtn: _fixDragBtn,
		getStyleValue: _getStyleValue,
		dragstart: _dragstart,
		dragmove: _dragmove,
		dragend: _dragend
	};

    function _initResizer($dragBarEle, $eleA, $eleB) {
		var self = this;

		if(self.initialized) return;

		if(window.getComputedStyle) {
            self.$dragBarEle = $dragBarEle;
            self.$eleA = $eleA;
            self.$eleB = $eleB;

			// disable dragbar for IE <= 8
			self.$dragBarEle.mousedown(function(e){self.dragstart(e);});
			$(window).mousemove(function(e){self.dragmove(e);});
			$(window).mouseup(function(){self.dragend();});
			$(window).resize(function(){self.fixDragBtn();});
		} else {
			self.$dragBarEle.hide();
			console.log('your browser did not support resize');
		}

        self.fixDragBtn();
		self.initialized = true;
	}

	function _cleanUpResizer() {
		if(this.initialized) {
			console.log('clean up listeners of resizer');

			this.$dragBarEle.off('mousedown');
			$(window).off('mousemove');
			$(window).off('mouseup');
			$(window).off('resize');

			this.$dragBarEle = null;
            this.$eleA = null;
            this.$eleB = null;

			this.initialized = false;
		}
	}

	function _fixDragBtn() {
	  	var editorWidth, editorHeight, editorLeft, editorPadding, dragTop;

	  	//var sidebarWidth = Number(getStyleValue(document.getElementById("side-bar"), "width").replace("px", ""));

	  	var containerMargin = Number(this.getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));
	
	    this.$dragBarEle.height('5px');
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

        this.$dragBarEle.css('top', dragTop + 'px');     
        this.$dragBarEle.css('left', drapLeft + 'px');     
	    this.$dragBarEle.width('1%');
	    this.$dragBarEle.css('cursor', 'row-resize');        
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
			var detailMenuHeight = $('.ui.top.attached.menu').height();

			var percentage = ((e.pageY - detailMenuHeight) / (window.innerHeight - detailMenuHeight)) * 100;
			if (percentage > 5 && percentage < 90) {
				
				var mainPercentage = 100 - percentage;

				this.$eleA.setSize('100%', percentage + "%") ;
                this.$eleB.height(mainPercentage + "%");
				this.fixDragBtn();
			}
		}
	}

	function _dragend() {
	    $('#shield').hide();
	    this.dragging = false;
	}

    return resizer;
});
