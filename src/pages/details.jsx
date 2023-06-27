import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'
import routes from '../routes'
import { malfunctionService } from '../services/malfunction.service'

export const Details = () => {

    const params = useParams()
    const [malfunction, setMalfunction] = useState('')

    useEffect(async () => {
        console.log(params)
        console.log('params.id:', params.id)

        const mal = await malfunctionService.getById(params.id)
        setMalfunction(mal)

    }, [])


    useEffect(() => {
        console.log(malfunction)
    }, [malfunction])

    return (
        <section dir="rtl" className='details'>
            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">פרטים</h3>
            </div>



            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">שם : {malfunction?.name}</h3>
            </div>

            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">נוצר על ידי : {malfunction?.createdBy}</h3>
            </div>

            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900"> נוצר בתאריך : {malfunction?.created?.date}</h3>
            </div>

            <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900"> נוצר בשעה : {malfunction?.created?.time}</h3>
            </div>

            {/* <div className="mt-4 ml-2 mr-2 border-b border-gray-200 pb-5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">  הערות : {malfunction?.created?.note || ''}</h3>
            </div> */}

        </section>
    )
}



