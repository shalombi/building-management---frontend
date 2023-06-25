import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadMalfunctions } from '../store/malfunction.actions.js'
import { ListTailwind } from '../cmps/list-tailwind.jsx'


export const MalfunctionApp = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadMalfunctions())
    }, [])
    return (
        <div>
            <main>
                <ListTailwind />
            </main>
        </div>
    )
}

