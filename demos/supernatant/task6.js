var clickme = document.getElementById('clickme');
var but = document.getElementById('but');
var screen = document.getElementById('screen');
var supernatant = document.getElementById('supernatant');
var head = document.getElementById('head');

var computedStyle = document.defaultView.getComputedStyle(supernatant, null); //新版本IE11支持，否则用	supernatant.currentStyle
var super_width = computedStyle.width.slice(0, -2);
var super_height = computedStyle.height.slice(0, -2);

var docHeight;
var docWidth;

var left_;
var top_;

clickme.addEventListener('click', show);
window.addEventListener('resize', resize);
but.addEventListener('click', unshow);
head.addEventListener('mousedown', drag);

//显示浮层和遮罩
function show() {
	getwidthAndheight();
	setwidthAndheight();

	supernatant.style.display = 'block';
	screen.style.display = 'block';
	document.documentElement.style.overflow = 'hidden'; //禁止滚动
}

function unshow() {
	supernatant.style.display = 'none';
	screen.style.display = 'none';
	document.documentElement.style.overflow = 'auto';
}

function resize() {
	getwidthAndheight();
	setwidthAndheight();
}
//获取视口的宽和高
function getwidthAndheight() {
	docHeight = document.documentElement.clientHeight;
	docWidth = document.documentElement.clientWidth;
}
//给元素定位
function setwidthAndheight() {
	left_ = (docWidth - super_width) / 2;
	top_ = (docHeight - super_height) / 2;
	supernatant.style.left = left_ + 'px';
	supernatant.style.top = top_ + 'px';
	screen.style.width = docWidth + 'px';
	screen.style.height = docHeight + 'px';
}

//实现拖拽
function drag(e) {
	e = e || window.event;

	var diffX = e.clientX - supernatant.offsetLeft;
	var diffY = e.clientY - supernatant.offsetTop;

	document.onmousemove = function(e) {
		e = e || window.event;
		var super_left = e.clientX - diffX;
		var super_top = e.clientY - diffY;
		supernatant.style.left = e.clientX - diffX <= 0 ? 0 : (super_left + supernatant.offsetWidth) >= docWidth ? super_left : (e.clientX - diffX) + 'px';
		supernatant.style.top = e.clientY - diffY <= 0 ? 0 : (super_top + supernatant.offsetHeight) >= docHeight ? super_top : e.clientY - diffY + 'px';
	}
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}