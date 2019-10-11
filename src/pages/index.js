import Loadable from 'react-loadable'
import Loading from '@common/loading'

export const AddBooks = Loadable({
    loader: () => import("./books/addBooks"),
    loading: Loading
})

export const BooksList = Loadable({
    loader: () => import("./books/booksList"),
    loading: Loading
})


export const Home = Loadable({
    loader: () => import("./home"),
    loading: Loading
})

export const Login = Loadable({
    loader: () => import("./login"),
    loading: Loading
})
export const Register = Loadable({
    loader: () => import("./register"),
    loading: Loading
})


export const UserInfo = Loadable({
    loader: () => import("./user/userInfo"),
    loading: Loading
})

export const UserList = Loadable({
    loader: () => import("./user/userList"),
    loading: Loading
})
