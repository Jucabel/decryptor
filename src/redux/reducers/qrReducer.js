// Initial State
const initialState = {
    qrList: [],
};

// Actions Types
const SAVE_QR_DATA = 'SAVE_QR_DATA';

// Reduce
export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_QR_DATA:
            return {
                ...state,
                qrList: [...state.qrList, action.payload],
            };

        default:
            return state;
    }
}

// Action Creators
export const addQrInfoToTheList = (qrInfo) => {
    return { type: SAVE_QR_DATA, payload: qrInfo };
};