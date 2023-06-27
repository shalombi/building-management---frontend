import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { EditInput } from '../cmps/edit-input'
import { SuccessesMsg } from '../cmps/successes-msg'
import routes from '../routes'
import { malfunctionService } from '../services/malfunction.service'
import { updateMalfunction, addMalfunction } from '../store/malfunction.actions.js'
import { CheckCircleIcon } from '@heroicons/react/20/solid'


export const EditMalfunction = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [displayModal, setDisplayModal] = useState(false)

    const [malfunction, setMalfunction] = useState('')

    const { user } = useSelector(state => state.userModule)

    useEffect(async () => {
        console.log(params)
        console.log('params.id:', params.id)

        if (params.id) {
            const mal = await malfunctionService.getById(params.id)
            setMalfunction(mal)
        }

    }, [])


    useEffect(() => {
        console.log(malfunction)
    }, [malfunction])

    const handleChange = (ev) => {
        console.log('handleChange')
        let value = ev.target.value
        let field = ev.target.name

        // select options
        if (value === 'true') value = true
        if (value === 'false') value = false

        console.log('field,value:', field, typeof value)
        setMalfunction({ ...malfunction, [field]: value })
    }

    const onAddMalfunction = () => {
        let newMalfunction = malfunctionService.getEmptyMalfunction()
        
        newMalfunction = { ...newMalfunction, name: malfunction.name, createdBy: user.fullname }
        dispatch(addMalfunction(newMalfunction))
    }

    const onSave = (ev) => {
        ev.preventDefault()

        if (params.id) dispatch(updateMalfunction(malfunction))
        else onAddMalfunction()
        setDisplayModal(true)


        console.log('save')
    }

    const onBack = () => {
        navigate('/malfunction')
    }
    return (
        <section dir="rtl" className='edit-malfunction'>
            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">עריכה</h3>
                {/* <p>בעמוד זה ניתן לערוך את הפרטים וכן את הסטטוס</p> */}
            </div>

            <form onSubmit={onSave} className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <div>
                    <EditInput
                        type="text"
                        name="name"
                        value={malfunction?.name || ''}
                        handleChange={handleChange}
                        title="שם"
                    />
                </div>


                {/* malfunction.treated */}
                <div>

                    <select
                        name="treated"
                        onChange={handleChange}
                        className="mt-4 ml-2  h-10 w-15"
                    >
                        {/* <option value="">{malfunction.treated? 'בווצע' : 'לא בוצע'} </option> */}
                        <option value="">בחר </option>
                        <option value={true}>בוצע</option>
                        <option value={false}>לא בוצע</option>

                    </select>
                </div>


                {/* <h3 className="text-base font-semibold leading-6 text-gray-900">  {malfunction?.name} </h3> */}

                {/* <input
                    type="text"
                    name="name"
                    value={malfunction?.name}
                    onChange={handleChange}
                /> */}


                {/* <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            name="name"
                            value={malfunction?.name}
                            onChange={handleChange}
                            id="name"
                            className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Name"
                        />
                        <div
                            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                            aria-hidden="true"
                        />
                    </div>
                </div> */}

                <button
                    dir="ltr"
                    className="mt-4 ml-2 mr-2 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    שמירה
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
                {/* <button>save</button> */}
            </form>
            {
                displayModal &&
                <SuccessesMsg
                    setDisplayModal={setDisplayModal}
                />
            }



            {/* <button onClick={() => onBack()}>חזרה</button> */}

            <button
                onClick={() => onBack()}
                type="button"
                className="mt-4 ml-2 mr-2 rounded bg-indigo-900 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                חזרה
            </button>

        </section >
    )
}



