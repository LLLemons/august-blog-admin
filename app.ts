/*
 * @Author: Lemon
 * @Date: 2021-04-27 19:41:58
 * @LastEditors: Lemon
 * @LastEditTime: 2021-04-27 19:42:08
 * @FilePath: /august-blog-admin/app.ts
 */
export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};