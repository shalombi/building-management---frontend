const initialState = {
    malfunctions: [],
    malfunctiont: [],
    lastRemovedMalfunction: null
}
export function malfunctionReducer(state = initialState, action) {
    var newState = state
    var malfunctions
    var malfunctiont
    switch (action.type) {
        case 'SET_MALFUNCTIONS':
            newState = { ...state, malfunctions: action.malfunctions }
            break
        case 'REMOVE_MALFUNCTION':
            const lastRemovedMalfunction = state.malfunctions.find(malfunction => malfunction._id === action.malfunctionId)
            malfunctions = state.malfunctions.filter(malfunction => malfunction._id !== action.malfunctionId)
            newState = { ...state, malfunctions, lastRemovedMalfunction }
            break
        case 'ADD_MALFUNCTION':
            newState = { ...state, malfunctions: [...state.malfunctions, action.malfunction] }
            break
        case 'UPDATE_MALFUNCTION':
            malfunctions = state.malfunctions.map(malfunction => (malfunction._id === action.malfunction._id) ? action.malfunction : malfunction)
            newState = { ...state, malfunctions }
            break
        case 'ADD_TO_MALFUNCTIONT':
            newState = { ...state, malfunctiont: [...state.malfunctiont, action.malfunction] }
            break
        case 'REMOVE_FROM_MALFUNCTIONT':
            malfunctiont = state.malfunctiont.filter(malfunction => malfunction._id !== action.malfunctionId)
            newState = { ...state, malfunctiont }
            break
        case 'CLEAR_MALFUNCTIONT':
            newState = { ...state, malfunctiont: [] }
            break
        case 'UNDO_REMOVE_MALFUNCTION':
            if (state.lastRemovedMalfunction) {
                newState = { ...state, malfunctions: [...state.malfunctions, state.lastRemovedMalfunction], lastRemovedMalfunction: null }
            }
            break
        default:
    }
    // For debug:
    window.malfunctionState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
