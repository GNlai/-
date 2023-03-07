// 路由规则
import stacked from "@/store";

let isLoging = stacked.state.Store_User.stacked;

export default [
//  主页页面：
  {
    path: "/",
    component: () => import("@/view/home/home_View"),
    meta: {
      isLogin: !isLoging,
      title: "惠漫网"
    },
    name: "home"
  },
  {
    path: "/home",
    redirect: "/",
    meta: {
      isLogin: !isLoging,
      title: "惠漫网"
    },
    component: () => import("@/view/home/home_View")
  },
//  登录注册
  {
    path: "/login",
    name: "login",
    meta: {
      isLogin: !isLoging,
      title: "登陆注册"
    },
    component: () => import("@/view/login/login_View")
  },

//  后台首页
  {
    path: "/backstage",
    name: "backstage",
    meta: {
      isLogin: isLoging,
      title: "后台页面"
    },
    component: () => import("@/view/back/back_Index/backstage_View"),
    redirect: "/backstage/index",
    children: [
      //  首页
      {
        path: "index",
        name: "backindex",
        meta: {
          isLogin: isLoging,
          title: "后台首页"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_Index/index_Top_View")
        }
      },
      // 漫画管理
      {
        path: "manage",
        name: "manage",
        meta: {
          isLogin: isLoging,
          title: "漫画管理"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_manage/manage")
        },
        children: [
          //
          {
            path: "slides",
            name: "slide",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_slides_children/sildes.vue")
            }
          },
          {
            path: "original",
            name: "original",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_original_children/original.vue")
            }
          },
          {
            path: "host",
            name: "host",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_host_children/host.vue")
            }
          },
          {
            path: "nice",
            name: "nice",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_nice_children/nice.vue")
            }
          },
          {
            path: "advertising",
            name: "advertising",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_advertising_children/advertising")
            }
          },
          {
            path: "ranking",
            name: "ranking",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_ranking_children/ranking")
            }
          },
          {
            path: "dayUp",
            name: "dayup",
            meta: {
              isLogin: isLoging
            },
            components: {
              back: () => import("@/view/back/back_Index/config/back_manage/back_dayUp_children/dayUp")
            }
          }

        ]
      },
      // 漫画审核
      {
        path: "audit",
        name: "audit",
        meta: {
          isLogin: isLoging,
          title: "漫画审核"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_audit/audit.vue")
        }
      },
      // 用户管理
      {
        path: "userinfo",
        name: "userinfo",
        meta: {
          isLogin: isLoging,
          title: "用户管理"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_userinfo/userinfo.vue")
        }
      },
      // 用户举报
      {
        path: "informer",
        name: "informer",
        meta: {
          isLogin: isLoging,
          title: "用户举报"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_informer/informer.vue")
        }
      },
      // 用户反馈
      {
        path: "feedback",
        name: "feedback",
        meta: {
          isLogin: isLoging,
          title: "用户反馈"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_feedback/feedback.vue")
        }
      },
      // 发布公告
      {
        path: "notice",
        name: "notice",
        meta: {
          isLogin: isLoging,
          title: "发布公告"
        },
        components: {
          back: () => import("@/view/back/back_Index/config/back_notice/notice.vue")
        }
      }
    ]
  },
  // 搜索
  {
    path: "/search",
    name: "search",
    meta: {
      isLogin: !isLoging,
      title: "搜索"
    },
    component: () => import("@/view/search/search")
  },
  //    漫画详情
  {
    name: "bookDetails",
    path: "/bookDetails",
    meta: {
      isLogin: !isLoging,
      title: "漫画详情"
    },
    component: () => import("@/view/bookDetails/bookDetails")
  }
];