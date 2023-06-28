
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveMalfunction, getActionAddMalfunction, getActionUpdateMalfunction } from '../store/malfunction.actions.js'
import { store } from '../store/store'
import { httpService } from './http.service.js'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'malfunction'
const malfunctionChannel = new BroadcastChannel('malfunctionChannel')


    ; (() => {
        malfunctionChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const malfunctionService = {
    query,
    getById,
    save,
    remove,
    getEmptyMalfunction,
}
window.cs = malfunctionService


async function query() {
    // Local
    // return storageService.query(STORAGE_KEY)

    // Remote
    // return axios.get(`/api/malfunction`)
    const malfunction = await httpService.get(`malfunction`, {})
    console.log('malfunction:', malfunction)
    return malfunction

}
async function getById(malfunctionId) {
    // Local
    // return storageService.get(STORAGE_KEY, malfunctionId)

    // Remote
    const malfunction = await httpService.get(`malfunction/${malfunctionId}`)
    return malfunction
}

async function remove(malfunctionId) {
    // Local
    // await storageService.remove(STORAGE_KEY, malfunctionId)

    // Remote
    await httpService.delete(`malfunction/${malfunctionId}`)


    malfunctionChannel.postMessage(getActionRemoveMalfunction(malfunctionId))
}

async function save(malfunction) {
    var savedMalfunction
    if (malfunction._id) {
        // Local
        // savedMalfunction = await storageService.put(STORAGE_KEY, malfunction)

        // Remote
        savedMalfunction = await httpService.put(`malfunction/${malfunction._id}`, malfunction)
        return savedMalfunction

        malfunctionChannel.postMessage(getActionUpdateMalfunction(savedMalfunction))

    } else {
        // Later, owner is set by the backend
        malfunction.owner = userService.getLoggedinUser()

        // Local
        // savedMalfunction = await storageService.post(STORAGE_KEY, malfunction)
        
        // Remote
        return await httpService.post(`malfunction`, malfunction)

        malfunctionChannel.postMessage(getActionAddMalfunction(savedMalfunction))
    }
    return savedMalfunction
}

function getEmptyMalfunction() {
    const currentDate = new Date()

    return {
        name: 'takala-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        created: {
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString()
        },
        treated: false,
        createdBy: ''
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




