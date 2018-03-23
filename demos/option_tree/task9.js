//定义全局变量
var root_ = document.getElementById('root');
var dfs = document.getElementById('dfs');
var bfs = document.getElementById('bfs');
var search = document.getElementById('search');
var input = document.getElementById('input');
var tree_id = document.getElementById('tree_');
var add = document.getElementById('add');
var del = document.getElementById('delete');
var add_input = document.getElementById('addvalue');
var his; //存放历史节点
var tree = [];
var flag = 1;
var flad_option = 1;
var option_node = [];
//事件监听
dfs.addEventListener('click', dfs_button);
bfs.addEventListener('click', bfs_button);
search.addEventListener('click', search_button);
tree_id.addEventListener('mouseover', option);
del.addEventListener('click', remove);
add.addEventListener('click', addNode);

//初始化
function initial() {
	tree = [];
	if (his) {
		his.style.background = '#fff';
	}
}
//显示效果
function display() {
	for (var j = 0; j < tree.length; j++) {
		var dis = (function(index) {
			return function() {
				if (his) {
					his.style.background = '#fff';
				}
				tree[index].style.background = '#0a0';
				his = tree[index];
			}
		})(j);
		setTimeout(dis, j * 500);
	}
	//ES6新特性，let，一下代码在google可以通过，IE不能
	// for (let j = 0; j < tree.length; j++) {
	// 	var dis = function() {
	// 		if (his) {
	// 			his.style.background = '#fff';
	// 		}
	// 		tree[j].style.background = '#0a0';
	// 		his = tree[j];
	// 	}
	// 	setTimeout(dis, j * 500);
	// }
}

//深度优先搜索
function deepSearch(node) {
	for (var i = 0; i < node.children.length; i++) {
		deepSearch(node.children[i]);
	}
	tree.push(node);
}
//广度优先搜索
function breadthSearch(node) {
	if (flag === 1) {
		tree.push(node);
		flag = 0;
	}
	if (node) {
		for (var i = 0; i < node.children.length; i++) {
			tree.push(node.children[i]);
		}
		for (var i = 0; i < node.children.length; i++) {
			breadthSearch(node.children[i]);
		}
	}
}

function search_button() {
	initial();
	deepSearch(root_);
	if (input.value) {
		for (var j = 0; j < tree.length; j++) {
			if (input.value === tree[j].getAttribute('value')) {
				tree[j].style.background = '#f00';
				his = tree[j];
			}
		}
	} else {
		alert('请输入您要查询的内容！');
	}
}

//鼠标移入出发选择事件
function option() {
	tree = [];
	deepSearch(root_);
	flad_option = 1;
	for (var i = 0; i < tree.length; i++) {
		tree[i].onclick = function(event) {
			if (flad_option === 1) {
				this.style.background = '#0ff';
				// alert(this.style.background)
				flad_option = 0; //一旦最小范围node点击，设置颜色，不在触发他的父亲节点
				//event.stopPropagation();//阻止冒泡
				option_node.push(this);
			}
		}
	}
}
//删除节点
function remove() {
	initial();
	if (option_node.length) {
		for (var i = 0; i < option_node.length; i++) {
			for (var j = 0; j < option_node[i].children.length; j++) {
				option_node[i].removeChild(option_node[i].children[j]);
			}
			option_node[i].parentNode.removeChild(option_node[i]);
		}
	} else {
		alert('请选择节点');
	}
	option_node = [];
}

function addNode() {
	var value = add_input.value;
	initial();
	deepSearch(root_);
	if (value) {
		if (option_node.length) {
			for (var i = 0; i < option_node.length; i++) {

				var node = document.createElement('div');
				node.innerHTML = value;
				option_node[i].appendChild(node);
			}
		} else {
			alert('请选择节点');
		}
	} else {
		alert('没有要加入的节点');
	}
}

function dfs_button() {
	initial();
	deepSearch(root_);
	display();
}

function bfs_button() {
	initial();
	breadthSearch(root_);
	display();
}