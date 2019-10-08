import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import LayoutComponent from '@layout';
import {
    AddBooks,
    BooksList,
    Home,
    Login,
    UserInfo,
    UserList
} from "@pages"

export default (route) => {
    function eachRoutes(route) {
        console.log('有')
            return <Route
                key={route.key}
                path={route.path}
                render={() => {
                    return <Switch>
                        {
                            route.children.map(child => {
                                if (child.children) {
                                    return eachRoutes(route)
                                } else {
                                    return <Route
                                        path={child.path}
                                        key={child.key}
                                        render={props => {
                                            if (route.path === '/login') {
                                                return <child.component {...props} />
                                            } else if (Cookies.get("token")) {
                                                return <LayoutComponent><child.component {...props} /></LayoutComponent>
                                            } else {
                                                return <Redirect to={{ pathname: '/login' }} />
                                            }
                                        }} />
                                }
                            })
                        }
                    </Switch>
                }}
            />
    }
    // return <Fragment>
    //     <Switch>
    //         {
    //             route.map(route => {
    //                 console.log(route.path)
    //                 if (route.path === '/login') {
    //                     console.log(1)
    //                     return <Route path={route.path} key={route.key} component={route.component} />
    //                 } else if (!Cookies.get('token')) {
    //                     console.log(2)
    //                     return <Redirect key={route.key} to='/login' />
    //                 } else if (Cookies.get('token')&&route.path !== '/login') {
    //                     console.log(3)
    //                     return <LayoutComponent key={route.key}>
    //                         <Route path={route.path} render={props => {
    //                             return <route.component {...props} />
    //                         }} />
    //                     </LayoutComponent>
    //                 }
    //             })
    //         }
    //         {/* <Route path={route.path} key={route.key} component={Login} /> */}
    //     </Switch>
    // </Fragment>
    return route.map(route => {
        console.log(route.path)
        if (route.children) {
            return eachRoutes(route)
        } else {
            return <Route path={route.path} key={route.key} render={props => {
                if (route.path === '/login') {
                    return <route.component {...props} />
                } else if (Cookies.get('token')) {
                    return <LayoutComponent key={route.key}><route.component {...props} /></LayoutComponent>
                } else {
                    return <Redirect to={{ pathname: '/login' }} />
                }
            }} />
        }
    })
}