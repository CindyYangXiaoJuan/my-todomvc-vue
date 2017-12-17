# TodoMVC By Vue

## 下载todomvc并且安装依赖包

- 查看package.json安装依赖

## 安装browser-sync 此时不需要安装全局,安装项目即可npm i -D browser-sync  /  npm install --save-dev browser-sync

- 配置scripts
- "scripts": {
  "dev": "broswer-sync start --server --files \"*.html,css/*.css,js/*.js\"",
  "start": "npm run dev"
 }
- 开启服务器
  + npm start
  + npm run dev

## 数据列表展示

- 实例化Vue 确定操作范围 
- 创建数组,展示数据,v-for:item in todos列表展示
- 细节: 没有数据时 将底部隐藏 v-if(todos.length)

## 添加任务

- 注册鼠标按下回车事件(Vue提供),此时不需要双各项数据绑定,使用事件处理函数e即可获取表单输入的内容 追加到数组中
- 此时还要出去文本框时输入首尾为空 和 判断非空
- 添加完成清空文本框

## 标记所有任务完成/未完成

- 样式联动 利用事件处理函数e获取复选框的状态
- 首个选中, 列表全部选中 使用循环Foreach 让列表中的completed值与其相同

## 删除任务

- 利用索引值 使用数组中的方法splice(index, 1)

##双击进入编辑模式

- 类名editing 为编辑模式 且当前编辑的值只有一个 首先确保双击只有一个当前编辑值
- 非你编辑模式下 的 编辑模式之为空
- label注册按下回车事件 
- 使用事件处理函数e获取文本框输入内容 
- 验证首尾不为空和输入是否为空
- 文本框为空 回车后直接删除
- 文本框不为空 回车后title值存入数组
- 编辑模式值为空

##按ESC取消编辑

- 直接去除编辑模式的样式 及让编辑模式下的值为空

##清除所有完成任务

- 首先要判断 只要有一个为完成 则显示clear按钮部分 否则隐藏
- 使用数组中some()方法 v-if="todos.some(item => item.completed)"
- 点击清除全部已完成任务  注册点击事件
- 循环遍历数组 数组中的completed值为true则使用splic方法删除,此时注意数组索引,删去当前行值后,索引会从0开始,所以要将索引自减--,确保所有值都被遍历判断
- 方法二: 使用filter方法过滤出为FALSE的值,重新复制给todos即可

## 显示所有未完成数量

- 方法1: 使用filter方法过滤数组,.length可得到  (逻辑多将难以维护)
- 方法2: 使用Vue中的计算属性 

## 持久化存储数据

- localstorage 本地存储
- 添加,编辑,删除,状态改变都要存入本地
- vue watch 属性监视变化,存入本地

## 切换数据过滤和输出

- Vue提供的计算属性
- window.location.hash 改变来切换永久保存切换状态

## 自动获取焦点和双击编辑获取焦点
- Vue自定义编辑指令