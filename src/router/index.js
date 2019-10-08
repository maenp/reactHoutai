import {
    AddBooks,
    BooksList,
    Home,
    Login,
    UserInfo,
    UserList
} from "@pages"

export const layoutRoute = [
    {
        path: "/home",
        key: "/home",
        component: Home,
        icon: "home",
        name: "首页",
    },
    {
        path: "/books",
        key: "/books",
        icon: "appstore",
        name: "书籍管理",
        children: [
            {
                path: "/books/booksList",
                key: "/books/booksList",
                component: BooksList,
                icon: "bars",
                name: "书籍列表",
            },
            {
                path: "/books/addBooks",
                key: "/books/addBooks",
                component: AddBooks,
                icon: "tag",
                name: "添加书籍",
            }
        ]
    },
    {
        path: "/user",
        key: "/user",
        icon: "user",
        name: "用户管理",
        children: [
            {
                path: "/user/userList",
                key: "/user/userList",
                component: UserList,
                icon: "usergroup-add",
                name: "用户列表",
            },
            {
                path: "/user/userInfo",
                key: "/user/userInfo",
                component: UserInfo,
                icon: "file-search",
                name: "个人信息",
            }
        ]
    }
]

export const noLayoutRoute = [
    {
        path: "/login",
        key: "/login",
        component: Login,
        icon: "",
        name: "登陆",
    }
]


export const baseConfigRoute = noLayoutRoute.concat(layoutRoute)