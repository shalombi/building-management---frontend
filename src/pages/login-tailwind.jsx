import { Link } from "react-router-dom";


import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service.js'

import { onLogin } from '../store/user.actions.js'

// export function SignUpTailwind() {

//   const dispatch = useDispatch()

//   const [isSignup, setIsSignup] = useState(false)

//   const [users, setUsers] = useState([])



//   const clearState = () => {
//     setCredentials({ username: '', password: '', fullname: '', imgUrl: '', confirmPassword: '' })
//     setIsSignup(false)
//   }


// const onSetLogin = (ev = null) => {
//   if (ev) ev.preventDefault()
//   if (!credentials.username) return
//   dispatch(onLogin(credentials))
//   clearState()
// }

// username: '', password: '', fullname: '', imgUrl: '',confirmPassword:'' 

export function LoginTailwind() {

    const dispatch = useDispatch()
    const [users, setUsers] = useState([])

    useEffect(async () => {
        const users = await userService.getUsers()
        setUsers(users)
    }, [])

    const [credentials, setCredentials] = useState({ username: 'xxx', password: '' })


    const handleChange = ev => {
        const field = ev.target.name;
        const value = ev.target.value;
        console.log(field, value)
        setCredentials({ ...credentials, [field]: value });
        console.log('credentials', credentials)
    }

    const onSetLogin = (ev = null) => {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        dispatch(onLogin(credentials))
        clearState()
    }

    const clearState = () => {
        setCredentials({ username: '', password: ''})
        // setIsSignup(false)
      }
    // const onLogin = (ev = null) => {
    //     if (ev) ev.preventDefault();
    //     if (!credentials.username) return;
    //     props.onLogin(credentials);
    //     clearState()
    // }

    return (
        <>

            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />

                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                התחבר/י לחשבון
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                לא רשומים{' '} ?
                                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    הירשמו
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form action="#" method="POST" className="space-y-6">
                                    <div dir="rtl">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            שם משתמש
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={credentials.username}
                                                onChange={handleChange}
                                                id="username"
                                                name="username"
                                                type="username"
                                                autoComplete="username"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div dir="rtl">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            סיסמה
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={credentials.password}
                                                onChange={handleChange}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {/* <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        /> */}
                                            {/* <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                          Remember me
                        </label> */}
                                        </div>

                                        <div className="text-sm leading-6">
                                            {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                          Forgot password?
                        </a> */}
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            onClick={onSetLogin}
                                            // type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            התחברו
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
