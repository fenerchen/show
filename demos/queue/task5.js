window.onload = function() {
	var input = document.getElementById('input');
	var left_in = document.getElementById("left-in");
	var left_out = document.getElementById("left-out");
	var list_num = document.getElementById("list");
	var right_in = document.getElementById("right-in");
	var right_out = document.getElementById("right-out");
	var sort_button = document.getElementById("sort_button");
	var sort = document.getElementById("sort");
	var in_in = document.getElementsByClassName('in');
	var count = 0;
	var number = [];
	var flag_in = '';
	var flag_out = '';

	//添加数字
	right_in.onclick = function() {
		flag_in = 'right';
		//alert(this);
		in_();
	};
	left_in.onclick = function() {
		flag_in = 'left';
		in_();
	};
	//移除数字
	left_out.onclick = function() {
		flag_out = 'left';
		out();
	}
	right_out.onclick = function() {
			flag_out = 'right';
			out();
		}
		//点击数字删除
	list_num.onmouseover = function() {
			for (var i = 0; i < list_num.children.length; i++) {
				(function(n) {
					list_num.children[n].onclick = function() {
						list_num.removeChild(this);
						number.splice(n, 1); //删除下标为n的元素，破坏原数组，返回更改的数组
						///alert(n);
					}
				})(i) //创建闭包，传递index
			}
		}
		//点击排序
	sort_button.onclick = function() {
			sort.innerHTML = '';
			var num = number.slice();
			for (var i = 0; i < num.length; i++) {
				for (var j = 0; j < num.length - 1 - i; j++) {
					if (num[j] > num[j + 1]) {
						var temp = num[j];
						num[j] = num[j + 1];
						num[j + 1] = temp;
					}
				}
				var add_sort = document.createElement('span')
				add_sort.className = 'display';
				add_sort.style.width = 20 + 5 * num[num.length - 1 - i] + 'px';
				//add_sort.style.height =  value + 'px';
				add_sort.innerHTML = num[num.length - 1 - i];
				sort.appendChild(add_sort);
			}
		}
		//移除数字
	var out = function() {
			if (list_num.children.length > 0) {
				if (flag_out === 'left') {
					number.shift();
					list_num.removeChild(list_num.children[0]);
				}
				if (flag_out === 'right') {
					number.pop()
					list_num.removeChild(list_num.lastElementChild);
				}
			} else
				alert('没有数字了');
		}
		//输入
	var in_ = function() {
		var value = input.value;
		var add = document.createElement('span')
		add.className = 'display';
		if (value >= 10 && value <= 100 && count <= 60) {
			add.style.width = 20 + 5 * value + 'px';
			//add.style.height =  value + 'px';
			add.innerHTML = value;
			if (flag_in === 'right') {
				list_num.appendChild(add);
				number.push(value);
			}
			if (flag_in === 'left') {
				list_num.insertBefore(add, list_num.firstElementChild);
				number.unshift(value);
			}
			count++;
		} else {
			alert('请输入不多于60个10-100之间的数字')

		}
		input.value = '';
	}
}