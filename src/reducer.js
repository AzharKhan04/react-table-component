

const initialState = {
    users:[]
}

export const appReducer = (state = initialState,ACTION) => {
    switch (ACTION.type) {
        case "SET_USERS" : return {...state,users:ACTION.payload}
        default: return state
    }
}