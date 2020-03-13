const INITIAL_STATE = {
    idChampioship: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'CHAMPIOSHIP_SELECTED':
            return { ...state, idChampioship: action.payload }
            default:
                return state
    }
}