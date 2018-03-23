// 现在只能执行完一次，点击一次，结果正确。没有解决连续多次点击后让小方块正确执行
var exec = document.getElementById('exec');
var seletion = document.getElementById('seletion');
var box = document.getElementById('box');
var wrapper = document.getElementById('wrapper');
var flag = 'top';
var current = 0; //全局变量，保存角度

function add() {
	for (var i = 0; i < 100; i++) {
		var node = document.createElement('div');
		wrapper.appendChild(node);
	}
}
add(); //创建网格
exec.addEventListener('click', show);

function show() {

	var top_ = parseInt(box.style.top.slice(0, -2)); //使用offset不能改变，只读
	var left_ = parseInt(box.style.left.slice(0, -2)); //每次更新位置

	switch (seletion.value) {
		case 'go':
			if (current === 0 || current === -0) {
				check_top(top_, 't', box, 50);
			} else if (current === 270 || current === (-90)) {
				check_left(left_, 'l', box, 50);
			} else if (current === (-270) || current === 90) {
				check_left(left_, 'r', box);
			} else {
				check_top(top_, 'b', box);
			}
			break;
		case 'tunlef':
			chang_deg(-90);
			current = (current - 90) % 360;
			break;
		case 'tunrig':
			chang_deg(90);
			current = (current + 90) % 360;
			break;
		case 'tunbac':
			chang_deg(180);
			current = (current + 180) % 360;
			break;
		case 'tralef':
			check_left(left_, 'l', box);
			break;
		case 'tratop':
			check_top(top_, 't', box);
			break;
		case 'trarig':
			check_left(left_, 'r', box);
			break;
		case 'trabot':
			check_top(top_, 'b', box);
			break;
		case 'movlef':
			chang_deg(270 - (current + 360) % 360, 'l', left_);
			current = 270;
			break;
		case 'movtop':
			chang_deg(0 - (current + 360) % 360, 't', top_);
			current = 0;
			break;
		case 'movrig':
			chang_deg(90 - (current + 360) % 360, 'r', left_);
			current = 90;
			break;
		case 'movbot':
			chang_deg(180 - (current + 360) % 360, 'b', top_);
			current = 180;
			break;
		default:
			break;
	}
}
// 不能超出边界,移动动画
function check_top(top_, str, obj) {
	var const_movetimes = 100;
	var top = top_;

	if (str === 't') {
		for (var i = 1; i < const_movetimes + 1; i++) {
			var x = (function(index) {
				return function() {
					obj.style.top = (top - index * 50 / const_movetimes) <= 0 ? 0 : (top - index * 50 / const_movetimes) + 'px';
					if (index === const_movetimes)
						clearTimeout(t);
				}
			})(i);
			var t = setTimeout(x, 1000 / const_movetimes * i);
		}
	}
	if (top < 450 && str === 'b') {
		for (var i = 1; i < const_movetimes + 1; i++) {
			var y = (function(index) {
				return function() {
					obj.style.top = (top + index * 50 / const_movetimes) >= 450 ? 450 : (top + index * 50 / const_movetimes) + 'px';
					if (index === const_movetimes)
						clearTimeout(t);
				}
			})(i)
			var t = setTimeout(y, 1000 / const_movetimes * i);

		}
	}
}

function check_left(left_, str, obj) {
	var const_movetimes = 100;
	var left = left_;

	if (str === 'l') {
		for (var i = 1; i < const_movetimes + 1; i++) {
			var x = (function(index) {
				return function() {
					obj.style.left = (left - index * 50 / const_movetimes) <= 0 ? 0 : (left - index * 50 / const_movetimes) + 'px';
					if (index === const_movetimes)
						clearTimeout(t);
				}
			})(i);
			var t = setTimeout(x, 1000 / const_movetimes * i);
		}

	}
	if (str === 'r') {
		for (var i = 1; i < const_movetimes + 1; i++) {
			var y = (function(index) {
				return function() {
					obj.style.left = (left + index * 50 / const_movetimes) >= 450 ? 450 : (left + index * 50 / const_movetimes) + 'px';
					if (index === const_movetimes) {
						clearTimeout(t);
					}
				}
			})(i)
			var t = setTimeout(y, 1000 / const_movetimes * i);
		}
	}
}
//旋转动画
function chang_deg(deg, str, position) {
	var changdeg = current;

	for (var i = 1; i < 101; i++) {
		var y = (function(index) {
			return function() {
				box.style.transform = 'rotate(' + (changdeg + deg / 100 * index) % 360 + 'deg)';
				if (index === 100) {
					clearTimeout(t);
				}
				if (index === 100) {
					if (str === 'l' || str === 'r') {
						check_left(position, str, box);
					} else {
						check_top(position, str, box);
					}
				}
			}
		})(i)
		var t = setTimeout(y, 6 * i);
	}

}