import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service.js'

import { onLogin, onSignup } from '../store/user.actions.js'

export function SignUpTailwind() {

  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '', confirmPassword: '' })
  const [isSignup, setIsSignup] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(async () => {
    const users = await userService.getUsers()
    setUsers(users)
  }, [])

  const clearState = () => {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '', confirmPassword: '' })
    setIsSignup(false)
  }


  // const onSetLogin = (ev = null) => {
  //   if (ev) ev.preventDefault()
  //   if (!credentials.username) return
  //   dispatch(onLogin(credentials))
  //   clearState()
  // }

  // username: '', password: '', fullname: '', imgUrl: '',confirmPassword:'' 
  const onSetSignup = (ev = null) => {
    if (ev) ev.preventDefault();
    if (!credentials.username || !credentials.password || !credentials.confirmPassword || !credentials.fullname) return
    dispatch(onSignup(credentials))
    clearState()
  }

  const handleChange = ev => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
    console.log('credentials', credentials)
  }

  return (
    <div dir="rtl" className="space-y-10 divide-y divide-gray-900/10">


      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">מידע פרטי לרישום</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">השתמש/י בכתובת מייל קבועה</p>
        </div>

        <form onSubmit={onSetSignup} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  שם משתמש
                </label>
                <div className="mt-2">
                  <input
                    value={credentials.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                  שם מלא
                </label>
                <div className="mt-2">
                  <input
                    value={credentials.fullname}
                    onChange={handleChange}
                    type="text"
                    name="fullname"
                    id="fullname"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  כתובת אימייל
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>





              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  סיסמה
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={handleChange}

                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  אשר סיסמה
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={credentials.confirmPassword}
                    onChange={handleChange}

                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>



            </div>
          </div>
          <div dir="rtl" className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              הירשם
            </button>
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              ביטול
            </button>
          </div>
        </form>
      </div>


    </div>
  )
}
