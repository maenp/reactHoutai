import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import LayoutComponent from '@layout';
export default (noLRoute) => {
    function eachRoutes(route) {
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
                                        if (!Cookies.get('token')) {
                                            return <Redirect key={child.key} to={{ pathname: '/login' }} />
                                        }else{
                                            return <child.component {...props} />
                                        }
                                    }} />
                            }
                        })
                    }
                </Switch>
            }}
        />
    }
    function If(route) {
        return (html) => {
            if (route.children) {
                return eachRoutes(route)
            } else {
                return html
            }
        }
    }
    return (Lroute) => {
        return <Switch>
            {
             noLRoute.map(route => {
                return <Route path={route.path} key={route.key} component={route.component} />
                })
            }
            return <LayoutComponent>
                {
                    Lroute.map(route => {
                        return If(route)(<Route path={route.path} key={route.key} render={props => {
                            if (!Cookies.get('token')) {
                                return <Redirect key={route.key} to={{ pathname: '/login' }} />
                            }else{
                                return <route.component {...props} />
                            }
                        }} />)
                    })
                }
            </LayoutComponent >
        </Switch>

    }
}