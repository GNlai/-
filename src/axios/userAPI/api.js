// 引入封装好的axios
import { requests } from "@/axios/requer";

//获取验证码接口
export const get_User_verification_code = () => requests("http://43.139.163.16:8060/user/random", "get");

//用户登陆接口
export const get_User_Login = (data) => requests("http://43.139.163.16:8060/user/login", "post", data);

//获取用户数据接口
export const get_Userinfo = () => requests("http://43.139.163.16:8060/usercrud/info", "get");

//获取轮播图图片数据
export const post_SlidArr = (data) => requests("http://43.139.163.16:8060/book/bookData", "post", data);

export const get_Seller = () => requests("http://43.139.163.16:8010/JSON/seller", "get");

export const get_China_Data = () => requests("http://43.139.163.16:8010/JSON/china", "get");

export const get_Rank = () => requests("http://43.139.163.16:8010/JSON/rank", "get");

export const get_trend = () => requests("http://43.139.163.16:8010/JSON/trend", "get");

export const get_Map = () => requests("http://43.139.163.16:8010/JSON/map", "get");



