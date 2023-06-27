import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { AppHeaderTailwind } from './cmps/app-header-tailwind'
import { LoginTailwind } from './pages/login-tailwind'
import { SignUpTailwind } from './pages/sign-up-tailwind'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                <AppHeaderTailwind />
                <AppHeader />
                <main>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route path="user/:id" element={<UserDetails />} />
                        <Route path="/login" element={ <LoginTailwind />} />
                        <Route path="/signup" element={ <  SignUpTailwind />} />

                      


                    </Routes>
                </main>
                {/* <AppFooter /> */}
            </div>
        )
    }
}


