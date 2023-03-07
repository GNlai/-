// Axios拦截器
// 导入axios
import axios from "axios";
import { Message } from "element-ui";
// 进度条
import NProgress from "nprogress";
//导入css样式
import "nprogress/nprogress.css";

export function requests(url, method = "get", data = {}, config = {}) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: url,
    //设置请求超时时间
    timeout: 3000
  });
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    let params = new URLSearchParams();
    // 进度条开始
    NProgress.start();
    config.method = method;
    config.headers.Accept = "application/x-www-form-urlencoded";
    config.headers.Authorization = localStorage.token;
    // 如果数据为对象
    if (data instanceof Object) {
      // for循环遍历
      for (let key in data) {
        params.append(key, data[key]);
      }
      data = params;
    }
    config.data = data;

    if (method.toLocaleLowerCase() == "file") { //如果是文件类型
      method = "post";
      // 使用FormData序列化，实现文件上传
      let params = new FormData();
      if (data instanceof Object) {
        for (let key in data) {
          params.append(key, data[key]);
        }
        data = params;
      }
    }

    let axiosConfig = {
      method: method.toLocaleLowerCase(),
      url: config.url,
      data: data
    };

    if (config instanceof Object) {
      // 拼接请求配置数据
      for (let key in config) {
        axiosConfig[key] = config[key];
      }
    }
    return config;
  }, err => {
    return err;
  });

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // 进度条结束
    NProgress.done();
    if (res.status === "404") return Message({ type: "error", message: "无效请求，请联系管理员", center: true });
    if (res.status === "400") return Message({ type: "error", message: "语义有误，当前请求无法被服务器理解", center: true });
    if (res.status === "401") return Message({ type: "error", message: "暂无权限访问，请联系管理员", center: true });
    if (res.status === "403") return Message({ type: "error", message: "服务器拒绝执行它", center: true });
    return res.data;
  }, err => {
    return err;
  });
  // 3.发送真正的网络请求
  return instance(config);

}