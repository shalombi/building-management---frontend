import { malfunctionService } from "../services/malfunction.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveMalfunction(malfunctionId) {
    return {
        type: 'REMOVE_MALFUNCTION',
        malfunctionId
    }
}
export function getActionAddMalfunction(malfunction) {
    return {
        type: 'ADD_MALFUNCTION',
        malfunction
    }
}
export function getActionUpdateMalfunction(malfunction) {
    return {
        type: 'UPDATE_MALFUNCTION',
        malfunction
    }
}

export function loadMalfunctions() {
    return async (dispatch) => {
        try {
            const malfunctions = await malfunctionService.query()
            console.log('Malfunctions from DB:', malfunctions)
            dispatch({
                type: 'SET_MALFUNCTIONS',
                malfunctions
            })

        } catch (err) {
            showErrorMsg('Cannot load malfunctions')
            console.log('Cannot load malfunctions', err)
        }
    }
}

export function removeMalfunction(malfunctionId) {
    return async (dispatch) => {
        try {
            await malfunctionService.remove(malfunctionId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveMalfunction(malfunctionId))
            showSuccessMsg('Malfunction removed')
        } catch (err) {
            showErrorMsg('Cannot remove malfunction')
            console.log('Cannot remove malfunction', err)
        }
    }
}

export function addMalfunction(malfunction) {
    return (dispatch) => {

        malfunctionService.save(malfunction)
            .then(savedMalfunction => {
                console.log('Added Malfunction', savedMalfunction);
                dispatch(getActionAddMalfunction(savedMalfunction))
                showSuccessMsg('Malfunction added')
            })
            .catch(err => {
                showErrorMsg('Cannot add malfunction')
                console.log('Cannot add malfunction', err)
            })
    }
}

export function updateMalfunction(malfunction) {
    return (dispatch) => {
        malfunctionService.save(malfunction)
            .then(savedMalfunction => {
                console.log('Updated Malfunction:', savedMalfunction);
                dispatch(getActionUpdateMalfunction(savedMalfunction))
                showSuccessMsg('Malfunction updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update malfunction')
                console.log('Cannot save malfunction', err)
            })
    }
}

export function addToMalfunctiont(malfunction) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_MALFUNCTIONT',
            malfunction
        })
    }
}
export function removeFromMalfunctiont(malfunctionId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_MALFUNCTIONT',
            malfunctionId
        })
    }
}
export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.malfunctionModule.malfunctiont.reduce((acc, malfunction) => acc + malfunction.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_MALFUNCTIONT' })
            showSuccessMsg('Charged you: $' + total.toLocaleString())
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('MalfunctionActions: err in checkout', err)
        }
    }
}


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveMalfunctionOptimistic(malfunctionId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_MALFUNCTION',
            malfunctionId
        })
        showSuccessMsg('Malfunction removed')

        malfunctionService.remove(malfunctionId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove malfunction')
                console.log('Cannot load malfunctions', err)
                dispatch({
                    type: 'UNDO_REMOVE_MALFUNCTION',
                })
            })
    }
}