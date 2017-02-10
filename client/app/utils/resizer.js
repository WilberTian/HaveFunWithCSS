define([
    'jquery'
], function($) {
    var resizer = {
		dragging: false,
		initialized: false,
		viewMode: 'column',
		initResizer: _initResizer,
		cleanUpResizer: _cleanUpResizer,
		fixDragBtn: _fixDragBtn,
		getStyleValue: _getStyleValue,
		dragstart: _dragstart,
		dragmove: _dragmove,
		dragend: _dragend
	};

    function _initResizer($dragBarEle, $eleA, $eleB, viewMode) {
		var self = this;

		self.viewMode = viewMode;
		// if(self.initialized) return;

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
		if(this.viewMode === 'row') {
			_horizontalFixDrapBtn.bind(this)();
		} else {
			_verticalFixDragBtn.bind(this)();
		}
	}

	function _verticalFixDragBtn() {
        var editorHeight, dragTop, dragLeft;

        var containerPadding = Number(_getStyleValue(document.getElementById("main-space"), "padding-top").replace("px", ""));

        var dragIconHeight = 20;

        this.$dragBarEle.width(dragIconHeight + 'px');
        if (window.getComputedStyle) {
            editorHeight = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('height');

        } else {
            dragTop = $('.CodeMirror')[0].currentStyle['width'];
        }

        editorHeight = Number(editorHeight.replace('px', ''));

        dragTop = editorHeight + containerPadding - dragIconHeight/2;
        dragLeft = containerPadding - dragIconHeight/2;

        this.$dragBarEle.css('top', dragTop + 'px');
        this.$dragBarEle.css('left', dragLeft + 'px');
        this.$dragBarEle.css('cursor', 'row-resize');
	}

	function _horizontalFixDrapBtn() {
        var editorWidth, dragTop, dragLeft;

        var containerPadding = Number(_getStyleValue(document.getElementById("main-space"), "padding-left").replace("px", ""));

        var dragIconHeight = 20;

        this.$dragBarEle.width(dragIconHeight + 'px');
        if (window.getComputedStyle) {
            editorWidth = window.getComputedStyle($('.CodeMirror')[0],null).getPropertyValue('width');
        } else {
            dragTop = $('.CodeMirror')[0].currentStyle['width'];
        }

        editorWidth = Number(editorWidth.replace('px', ''));

        dragTop = containerPadding - dragIconHeight/2;
        dragLeft = editorWidth + containerPadding - dragIconHeight/2;

        this.$dragBarEle.css('top', dragTop + 'px');
        this.$dragBarEle.css('left', dragLeft + 'px');
        this.$dragBarEle.css('cursor', 'col-resize');
	}

	function _getStyleValue(elmnt, style) {
		if (window.getComputedStyle) {
	        return window.getComputedStyle(elmnt, null).getPropertyValue(style);
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
            if (this.viewMode === 'row') {
                _horizontalDragMove.bind(this)(e);
            } else {
                _verticalDragMove.bind(this)(e);
            }
        }
	}

	function _verticalDragMove(e) {
		document.getElementById("shield").style.display = "block";
		var detailMenuHeight = $('.ui.top.attached.menu').height();
        var containerMargin = Number(_getStyleValue(document.getElementById("main-space"), "margin-top").replace("px", ""));

        var mainSpaceHeight = Number((_getStyleValue(document.getElementById("main-space"), "height").replace("px", "")));

        var $eleAHeight = e.pageY - detailMenuHeight - containerMargin;
        var $eleBHeight = mainSpaceHeight - $eleAHeight;

        this.$eleA.setSize('100%', $eleAHeight + 'px') ;
        this.$eleB.height($eleBHeight + "px");
        this.fixDragBtn();
	}

	function _horizontalDragMove(e) {
        document.getElementById("shield").style.display = "block";
        var containerPadding = Number(_getStyleValue(document.getElementById("main-space"), "padding-left").replace("px", ""));

        var mainSpaceWidth = Number((_getStyleValue(document.getElementById("main-space"), "width").replace("px", "")));

        var $eleAWidth = e.pageX - containerPadding;
        var $eleBWidth = mainSpaceWidth - $eleAWidth;

        this.$eleA.setSize($eleAWidth, '100%') ;
        this.$eleB.width($eleBWidth + "px");
        this.fixDragBtn();
	}

	function _dragend() {
	    $('#shield').hide();
	    this.dragging = false;
	}

    return resizer;
});
