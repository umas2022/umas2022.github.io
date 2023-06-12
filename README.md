# backyard_lite
弔图存档lite,[Home](https://umas2022.github.io/backyard_lite/)


### 简介
- 沙雕图存档 & 表情包速查
- 此项目仅存放前端页面代码, 静态资源[在这里](https://github.com/umas2022/backyard_store)


### 待办
- P0
  - 静态资源访问方式改为跨项目
    - bookmark.js要删掉，所有list再HomeView.vue里获取
    - LeftNavi.vue中update_list.json尚未在后端更新
    - CenterSearch.vue中tag改好了，搜索的逻辑有点乱，大半夜的脑子不清醒了，明天再说
    - 最后只差一个CenterShow.vue还没有改
  - 增加视频分区
  - 左侧导航按钮展开时右边内容向右移动，用margin实现
- P1
  - 夜店风ui(夜间模式)
  - 右侧和图片底部的tag也像首页一样用my-tag替代(虽然已经不怎么卡顿了)
  - tag计数,(补全/修改少数tag/主页tag按数量排序)
- P2
  - 返回顶部按钮
  - update.json自动更新
  - 图片删除后重新排序
  - 翻页切换太生硬,加个动画
  - 增加tag时没有判断是否已存在
- P3
  - 保存修改结果按钮的位置
  - 新tag输入框激活后锁定光标
  - 右侧预设tag栏宽度手动调整
  - 没必要的文本禁用选中
  - 括号图片名只显示序号就行了,不要整个显示出来,换行也没做
  - 参数写进cookie
  - tag分栏用python实现会简单很多,前端的bookmark实在是太智熄了
  - tag列表喂给chatgpt把近义词合并一下←搞一个脚本
  - 图片跑一遍压缩脚本,有些图太大了
  - 搜索结果没有做翻页
  - mp4转gif脚本



### 更新记录
- 2023.06.13(v0.2.0): 项目拆分,静态资源单独一个项目
- 2023.06.10(v0.1.1): 极简ui,极致流畅
- 2023.05.09(v0.1.0): vue重构
- 2023.04.26(v0.0.0): 增加表情包分区,表情包pack1-10,增加前端的tag显示和修改,本地tag批量修改脚本
- 2023.04.19(v0.0.0): 创建项目(单html),沙雕图pack1-72