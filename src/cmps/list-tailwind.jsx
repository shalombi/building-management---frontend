
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { malfunctionService } from '../services/malfunction.service.js'

import { addMalfunction, updateMalfunction, removeMalfunction } from '../store/malfunction.actions.js'



const people = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]

export const ListTailwind = () => {

    const dispatch = useDispatch()
    const { malfunctions } = useSelector(state => state.malfunctionModule)

    const onRemoveMalfunction = (malfunctionId) => {
        dispatch(removeMalfunction(malfunctionId))
    }
    const onAddMalfunction = () => {
        const malfunction = malfunctionService.getEmptyMalfunction()
        malfunction.name = prompt('name?')
        console.log(malfunction)
        dispatch(addMalfunction(malfunction))
    }
    const onUpdateMalfunction = (malfunction) => {
        const name = prompt('New name?')
        const malfunctionToSave = { ...malfunction, name }
        dispatch(updateMalfunction(malfunctionToSave))
    }

    return (


        <div dir='rtl' className="px-4 sm:px-6 lg:px-8">

            {/* <button onClick={onAddMalfunction}>Add Malfunction ⛐</button> */}

            <div  className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">מערך הדיור</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        מערכות התקלות - בעמוד זה ניתן להוסיף ,לערוך ולמחוק תקלות
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onAddMalfunction}
                    >
                        הוסף תקלה
                    </button>
                </div>
            </div>
            <div  className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-0">
                                        שם
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        נוצר בתאריך
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        סטטוס
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        נוצר על ידי
                                    </th>
                                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        <span className="">עריכה</span>
                                    </th>
                                    <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                        <span className="">מחיקה</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {malfunctions.map((malfunction) => (
                                    <tr key={malfunction._id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11 rounded-full" src={malfunction.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{malfunction.name}</div>
                                                    {/* <div className="mt-1 text-gray-500">{malfunction.email}</div> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="mt-1 text-gray-900"> תאריך : {malfunction.created?.date}  </div>
                                            <div className="text-gray-900"> שעה : {malfunction.created?.time}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {!malfunction.treated? 'לא טופל': 'טופל'}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">Puki Ja</td>

                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span className="text-gray-900">
                                                <button onClick={() => { onUpdateMalfunction(malfunction) }}>עריכה</button>
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span className="text-gray-900">
                                                <button onClick={() => onRemoveMalfunction(malfunction._id)}>
                                                    x
                                                </button>
                                            </span>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
// key={malfunction._id}