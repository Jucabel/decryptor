// Initial State
const initialState = {
    qrList: [],
    nTab: 0,
};

// Actions Types
const SAVE_QR_DATA = 'SAVE_QR_DATA';
const SET_TAB = 'SET_TAB';

// Reduce
export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_QR_DATA:
            return {
                ...state,
                qrList: [...state.qrList, action.payload],
            };

        case SET_TAB:
            return {
                ...state,
                nTab: action.payload,
            };

        default:
            return state;
    }
}

// Action Creators
export const addQrInfoToTheList = (qrInfo) => {
    return { type: SAVE_QR_DATA, payload: qrInfo };
};

export const setTab = (index) => {
    return { type: SET_TAB, payload: index };
};