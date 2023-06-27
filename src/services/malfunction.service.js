
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveMalfunction, getActionAddMalfunction, getActionUpdateMalfunction } from '../store/malfunction.actions.js'
import { store } from '../store/store'

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


function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(malfunctionId) {
    return storageService.get(STORAGE_KEY, malfunctionId)
    // return axios.get(`/api/malfunction/${malfunctionId}`)
}
async function remove(malfunctionId) {
    await storageService.remove(STORAGE_KEY, malfunctionId)
    malfunctionChannel.postMessage(getActionRemoveMalfunction(malfunctionId))
}
async function save(malfunction) {
    var savedMalfunction
    if (malfunction._id) {
        savedMalfunction = await storageService.put(STORAGE_KEY, malfunction)
        malfunctionChannel.postMessage(getActionUpdateMalfunction(savedMalfunction))

    } else {
        // Later, owner is set by the backend
        malfunction.owner = userService.getLoggedinUser()
        savedMalfunction = await storageService.post(STORAGE_KEY, malfunction)
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
        treated:false,
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




