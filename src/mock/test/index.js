import Mock from "mockjs";

let domain = "/testApi";
Mock.mock(domain + "/test/network", "post", () => {
  console.warn(`mock: ${domain}/test/network`);
  return {
    status: "1",
    data: {
      districtName: "景城嘉苑",
      districtInfo: "景城嘉苑",
      districtAddr: "浙江省诸暨市陶朱街道詹家山北路8号",
    },
    text: "测试TEXT",
  };
});

Mock.mock(domain + "/test/login", "post", () => {
  console.warn("mock: /test/login");
  return {
    status: "1",
    data: {
      userInfo: {
        id: "XXXX",
        username: "测试",
      },
      roles: [],
      menu: [
        {
          router: "/test",
          title: "动态生成",
          icon: "mdi-plus",
          hideInMenu: false,
          children: [
            {
              router: "/test/test",
              title: "动态生成XXX",
              icon: "mdi-file",
              hideInMenu: false,
              component: "Home",
              children: [],
            },
            {
              router: "/test/500",
              title: "动态生成500",
              icon: "mdi-file",
              hideInMenu: false,
              component: "functional/500",
              children: [],
            },
          ],
        },
        {
          router: "/system",
          title: "系统设置",
          icon: "mdi-menu",
          hideInMenu: false,
          children: [
            {
              router: "/system/permission",
              title: "权限管理",
              icon: "mdi-file",
              hideInMenu: false,
              component: "system/permission/PermissionManager",
              children: [],
            },
            {
              router: "/system/role",
              title: "角色管理",
              icon: "mdi-file",
              hideInMenu: false,
              component: "system/role/RoleManager",
              children: [],
            },
            {
              router: "/system/user",
              title: "用户管理",
              icon: "mdi-file",
              hideInMenu: false,
              component: "system/user/UserManager",
              children: [],
            },
          ],
        },
      ],
    },
    text: "登录成功",
    token: "XXXXXXXXXXXXX",
  };
});
