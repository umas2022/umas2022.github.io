import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前显示的图片列表
    show_list: {} as { [key: string]: any },
    // 当前显示的页面,取值 ["show","search","loading","dev"]
    center_page: "search",
    // 右侧tag导航赋值
    tag_navi: "",
    // 参数设置
    setval: {
      // 图片宽度%
      pic_width: 50,
      // 显示tag
      show_tag: true,
      // 编辑tag
      edit_tag: false,
      // 右侧tag栏
      right_navi: false,
      // 开发模式
      isdev: false,
      // isdev: true,
    } as { [key: string]: any },

  },
  getters: {
  },
  mutations: {
    // 更新显示列表
    set_list(state, payload) {
      state.show_list = payload
    },
    // 更新显示页面
    set_page(state, payload) {
      state.center_page = "loading"
      setTimeout(() => {
        state.center_page = payload
      }, 100);
    },
    // 更新设置
    set_set(state, payload: { key: string, value: any }) {
      state.setval[payload.key] = payload.value
    },
    // 更新tag导航值
    set_tag(state, payload) {
      state.tag_navi = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
