//定义构造函数
function Createtable(row, col) {
	this.row = row;
	this.col = col;

	this.create(); //创建实例就自我执行，输出表格
}

Createtable.prototype = {
	constructor: Createtable,

	//创建表格
	create: function() {

		var table = document.createElement('table');
		var tbody = document.createElement('tbody');

		for (let i = 0; i < this.row; i++) {
			tbody.insertRow(i); //创建行
			for (let j = 0; j < this.col; j++) {
				tbody.rows[i].insertCell(j); //创建列		
			}
		}
		table.appendChild(tbody);
		document.body.appendChild(table); //添加节点
	},

	//添加头标题
	addhead: function(head) {

		if (Array.isArray(head)) {
			var tbody = document.getElementsByTagName('tbody');
			if (head.length === this.col) {
				for (let i = 0; i < this.col; i++) {
					tbody[0].rows[0].cells[i].innerHTML = head[i];
					if (i) { //添加排序按钮
						let up = document.createElement("div");
						let down = document.createElement("div");

						up.className = 'upbutton';
						down.className = 'downbutton';
						tbody[0].rows[0].cells[i].appendChild(up);
						tbody[0].rows[0].cells[i].appendChild(down);
					}
				}
			} else {
				alert('标题列数有误');
			}
		} else {
			alert('请输入数组');
		}
	},

	//添加表格数据信息
	adddate: function(date) {
		if (Array.isArray(date)) {
			var tbody = document.getElementsByTagName('tbody');
			if (date.length === this.row - 1) {
				for (let i = 1; i <= date.length; i++) {
					for (let j = 0; j < this.col; j++) {
						tbody[0].rows[i].cells[j].innerHTML = date[i - 1][j];
					}
				}
			} else {
				alert('数据行数有误');
			}
		} else {
			alert('数据不是数组');
		}
	},

	//排序
	addsort: function(index, flag) {
		var num_arr = [];
		var num_arr_copy = [];
		var tbody = document.getElementsByTagName('tbody')[0];
		var len = tbody.rows.length;
		for (let i = 1; i < len; i++) {
			num_arr.push(tbody.rows[i].cells[index].innerHTML);
		}
		num_arr_copy = num_arr.slice(); //复制数据
		if (!flag) {
			num_arr.sort(function(a, b) {
				return b - a;
			}); //sort改变数组元素顺序
		} else {
			num_arr.sort(function(a, b) {
				return a - b;
			});
		}
		// alert(num_arr);
		// alert(num_arr_copy);
		for (var j = 0; j < num_arr.length; j++) {
			var new_index = num_arr_copy.indexOf(num_arr[j]);
			if (j != new_index) {
				var x = j + 1;
				var temp = tbody.rows[x].innerHTML;
				tbody.rows[x].innerHTML = tbody.rows[new_index + 1].innerHTML;
				tbody.rows[new_index + 1].innerHTML = temp;

				var t = num_arr_copy[j]; //老数组中的值也要替换，它是表格顺序的映射，老数组顺序排好后，表格也就排好了
				num_arr_copy[j] = num_arr_copy[new_index];
				num_arr_copy[new_index] = t;
			}
		}
	}

}

var table = new Createtable(4, 5);
var head = ['姓名', '语文', '数学', '英语', '总分'];
var date = [
	['小明', '90', '90', '70', '250'],
	['小红', '99', '80', '90', '250'],
	['小亮', '60', '100', '50', '210']
];
table.addhead(head);
table.adddate(date);

var upbutton = document.getElementsByClassName('upbutton');
var downbutton = document.getElementsByClassName('downbutton');

(function() {
	for (let i = 1; i <= 4; i++) {
		upbutton[i - 1].addEventListener('click', function() {
			table.addsort(i, 1);
		});
		downbutton[i - 1].addEventListener('click', function() {
			table.addsort(i, 0);
		});

	}
})()