# github.io
个人主页，访问[（链接）](https://umas2022.github.io)




## 简介
- 个人主页，整合个人项目链接



## server

- github page 自动部署
- 镜像由python命令在screen中启动

```bash
# 注意不要在服务器上build，会卡死！
screen -r homepage
python3 -m http.server 25220 --directory /root/project/umas2022.github.io/docs
```


## 添加导航
- assets/index.json添加导航信息
- 调节HomeView.vue中.link-container的高度



## 更新日志
- 2023.09.19: 重做ui，加入波浪按钮和滚动条监听
- 2023.08.24: 创建项目




