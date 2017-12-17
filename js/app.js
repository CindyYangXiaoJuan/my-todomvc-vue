(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
  Vue.directive('focus', {
		inserted (el, binding) {
			el.focus();
		}
	});
	Vue.directive('todo-focus', {
		update (el, binding) {
			// console.log(binding.value);
			if(binding.value) {
					el.focus();
			}
		}
	});
	const app = new Vue({
		el: "#app",
		data: {
			todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
			currentEditing: null,
			filterText: 'all'
		},
		computed: {
      remaningCount () {
				return this.todos.filter(item => !item.completed).length
			},
			toggleAllStat: {
				get () {
					return this.todos.every(item => item.completed)
				}
			},
			filterTodos () {
				switch(this.filterText) {
					case 'active' :
						return this.todos.filter(item => !item.completed);
						break;
					case 'completed':
						return this.todos.filter(item => item.completed);
						break;
					default: 
						return this.todos;
						break;
				}
			}
		},
		watch: {
			todos: {
				handler (val) {
					//只有todos变化时才会调用handler(), 监视到todos变化,本地存储记录todos
					window.localStorage.setItem('todos', JSON.stringify(val));
				},
				deep: true
			}
		},
		methods: {
			handelAddTodosEnter(e) {
				//注册按下的回车事件  获取文本框的内容  数据校验  非空判断  添加到 todos 列表  清空文本框
				const value = e.target.value.trim();
				if (!value.length) {
					return
				}
				const todos = this.todos;
				todos.push({
					id: todos.length ? todos[todos.length - 1].id + 1 : 1,
					title: value,
					completed: false
				});
				//清空输入框
				e.target.value = '';
			},
			handelRemoveClick(index) {
				this.todos.splice(index, 1);
			},
			handelToggleAll(e) {
				// 0. 绑定 checkbox 的 change 事件
				// 1. 获取 checkbox 的选中的状态
				// 2. 直接循环所有的子任务项的选中状态设置为 toggleAll 的状态
				const checked = e.target.checked;
				this.todos.forEach((item) => {
					item.completed = checked;
				});
			},
			handleGetEditingDblclick(item) {
				//确保当前编辑对象有且只有一个
				this.currentEditing = item;
			},
			handelSaveEnter(e, item, index) {
				// 0. 注册绑定事件处理函数
				// 1. 获取编辑文本框的数据
				// 2. 数据校验
				//    如果数据是空的，则直接删除该元素
				//    否则保存编辑
				const value = e.target.value;
				if(!value.length) {
					//为空删除
					this.todos.splice(index, 1);
				}
				item.title = value;
				this.currentEditing = null;
			},
			handelCanaelEsc () {
				//按下ESC键直接去除编辑样式
				this.currentEditing = null;
			},
			handelRemoveAll () {
				//循环遍历,完成删掉
				for(let i = 0; i < this.todos.length; i++) {
					if(this.todos[i].completed) {
						this.todos.splice(i, 1);
						i--;
					}
				}
			}
		}
	});
	handelHashChange();

	window.onhashchange = handelHashChange;
	
	function handelHashChange () {
		app.filterText = window.location.hash.substr(2);
	}
})(window);
