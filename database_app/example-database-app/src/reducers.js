// Actions
export const add = (key, val) => ({type: 'ADD', key, val})
export const remove = (key) => ({type: 'REMOVE', key})
export const filter = (filter_str) => ({type: 'FILTER', filter_str})

// Initial Store State
const initial_state = {
    data: window.props,
    filter: '',
}

// Reducer
export const database = (state=initial_state, action) => {
    switch(action.type) {
        case 'ADD': {
            fetch('./', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    action: action.type,
                    key: action.key,
                    val: action.val,
                })
            })
            return {...state,data: {...state.data,[action.key]: action.val,}}
        }
        case 'REMOVE': {
            fetch('./', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    action: action.type,
                    key: action.key,
                })
            })
            delete state.data[action.key]
            return {...state, data: {...state.data}}
        }
        case 'FILTER': {
            return {...state, filter: action.filter_str}
        }
        default: {
            return state
        }
    }
}
