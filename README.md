# backyard_lite
弔图存档lite，访问主页[（链接）](https://umas2022.github.io)


### 简介
- 沙雕图存档 & 表情包速查
- 此项目仅存放前端页面代码, 静态资源在这里[（链接）](https://github.com/umas2022/backyard_store)


### 修改tag
- 左侧设置打开【编辑tag】, 对于要修改tag的图片，首先点击图片激活编辑模式, 编辑完成后再点击图片锁定编辑, 所有tag都编辑完成后, 点击右上角【保存修改】按钮, 将保存的json文件交给后端处理
- 右侧tag快捷栏的使用: 点击【Add New Tag】按钮, 激活输入框之后再点击右边tag, 可以直接填入输入框
- 因为新增tag的每一个输入框都和右侧tag快捷栏绑定, 所以如果每张图片的输入框都在激活状态的话, 点击右侧tag将会给所有输入框赋值, 所以保证只有一个输入框被激活。(等有时间加个判断) 


### 待办
- P0
  - 观察到很多表情包比如505,508连续出现了两次， 图片查重优先级提到P0
  - 图片浏览页tag没有显示
- P1
  - tag计数,(补全/修改少数tag/主页tag按数量排序)
- P2
  - 返回顶部按钮
  - 图片删除后重新排序
  - 单张图片加载时也需要一个加载动画
  - 夜店风ui(夜间模式)
  - 增加tag时没有判断是否已存在
  - 左边更新记录本来没考虑视频,现在多了一项之后如果三种同时更新,字符串就会换行,要改一下记录方法尽量避免换行
  - 后端连接失败时要有一个重试,或者首页先ping一下
  - 视频页底部多了一个横向滚动条
  - loading页
  - 倒序展示，连续滚动
- P3
  - 右侧预设tag栏宽度手动调整
  - 没必要的文本禁用选中
  - 图片title还是原始的
  - 参数写进cookie
  - tag列表喂给chatgpt把近义词合并一下←搞一个脚本
  - 图片跑一遍压缩脚本,有些图太大了
  - 搜索结果没有做翻页
  - 研究一下git lfs
  - 滚动条太小了根本看不见!
  - 图片应该用固定像素值设定宽度,这样可以用ctrl+鼠标滚轮来调整大小。另外有些图本身尺寸非常小,如果搜索结果只有它一个的话会非常小
  - 显示图片详细信息,如分辨率,大小,视频时长
  - 华为平板上的格式乱套,背景x10直接全部显示出来了
  - 非常细长的手机观感也不好
  - tag修改启用时发现tag变窄了一点,应该是叉号的尺寸没设置好
  - 一个小问题，自从图片从本地改为改云端获取，每次添加新的表情包都要先push原图才能在页面上修改，修改完成之后还需要一次push
  - 单张图片点击放大
- P99
  - 做一个正经后端



### 更新记录
- 2023.06.24(v0.2.2): 单页拆分
- 2023.06.14(v0.2.1): 增加视频区
- 2023.06.13(v0.2.0): 项目拆分,静态资源单独放一个项目,github.io只存放页面代码
- 2023.06.10(v0.1.1): 极简ui,极致流畅
- 2023.05.09(v0.1.0): vue重构
- 2023.04.26(v0.0.0): 增加表情包分区,表情包pack1-10,增加前端的tag显示和修改,本地tag批量修改脚本
- 2023.04.19(v0.0.0): 创建项目(单html),沙雕图pack1-72


### 备忘
- 有新的想法可以先写在开发页里(src/components/DevPage.vue), 同时把初始页改成这个页面(src/store/index.ts修改stage.center_page), 或者在设置里打开开发模式然后点左上角厕纸进去
- 只在HomeView.vue里访问后端一次,其他组件都从这里inject



