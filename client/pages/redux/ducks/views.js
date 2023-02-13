const SET_VIEW = 'setView'
export const pages = {
    HOME: 'home',
    ABOUT: 'about',
    PORTFOLIO: 'portfolio'
}

export const setView = (view, entry=null) => ({
    type: SET_VIEW,
    view,
    entry
})


const initialState = {
    view: pages.HOME,
    entry: null
}

export default function views(state=initialState, action) {
    switch(action.type) {
        case SET_VIEW:
            return { ...state, view: action.view, entry: action.entry }
        default:
            return state
    }
}